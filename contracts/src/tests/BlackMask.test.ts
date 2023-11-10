import {
  Mina,
  PublicKey,
  PrivateKey,
  AccountUpdate,
  fetchAccount,
  Field,
  Poseidon,
  verify,
  Permissions,
  Proof,
} from 'o1js';
import fs from 'fs/promises';
import {
  loopUntilAccountExists,
  getFriendlyDateTime,
} from '../utils/testHelper.js';
import { RecursionProofSystem } from '../recursion/recursion.js';
import { BlackMask } from '../BlackMask.js';
import { saveVerificationKey } from '../utils/generateVerificationKey.js';
import {
  PixelArrayClass1000,
  MaskClass,
} from '../classes/PixelArrayClass1000.js';
import { callRecursionBlack } from '../recursion/callRecursion.js';
import { imageData } from '../../data/pixelData100x100.js';
import createHashChain from '../utils/createHashChain.js';
import { BlackProof } from '../BlackMask.js';
console.log('process.env.TEST_ON_BERKELEY', process.env.TEST_ON_BERKELEY);
const isBerkeley = process.env.TEST_ON_BERKELEY == 'true' ? true : false;

console.log('isBerkeley:', isBerkeley);
let proofsEnabled = true;

describe('proxy-recursion-test', () => {
  async function runTests(deployToBerkeley: boolean = isBerkeley) {
    let Blockchain;
    let deployerAccount: PublicKey,
      deployerKey: PrivateKey,
      blackMaskAddress: PublicKey,
      blackMaskPrivateKey: PrivateKey,
      blackMaskZkApp: BlackMask,
      //   smartSnarkyNetPrivateKey: PrivateKey,
      //   smartSnarkyNetAddress: PublicKey,
      //   smartSnarkyNetZkApp: SmartSnarkyNet,
      receiverKey: PrivateKey,
      receiverAddress: PublicKey;
    // let addZkAppVerificationKey: string | undefined;
    let recursionProofSystemVerificationKey: string;

    let blackMaskVerificationKey: { data: string; hash: Field } | undefined;
    // let smartSnarkyZkAppVerificationKey:
    //   | { data: string; hash: Field }
    //   | undefined;
    beforeAll(async () => {
      //   await isReady;

      // choosing which Blockchain to use
      console.log('choosing blockchain');
      Blockchain = deployToBerkeley
        ? // ? Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql')
          Mina.Network('https://api.minascan.io/node/berkeley/v1/graphql')
        : Mina.LocalBlockchain({ proofsEnabled });

      Mina.setActiveInstance(Blockchain);

      try {
        console.log('compiling SmartContracts...');

        ({ verificationKey: recursionProofSystemVerificationKey } =
          await RecursionProofSystem.compile());
        console.log('compiling RecursionProofSystem...');
        ({ verificationKey: blackMaskVerificationKey } =
          await BlackMask.compile());

        console.log('compiling BlackMaskZkApp...');
      } catch (e) {
        console.log('error compiling one of the zkapps', e);
      }

      // choosing deployer account
      if (deployToBerkeley) {
        type Config = {
          deployAliases: Record<string, { url: string; keyPath: string }>;
        };
        let configJson: Config = JSON.parse(
          await fs.readFile('config.json', 'utf8')
        );
        // berkeley key hardcoded here
        let config = configJson.deployAliases['test1'];
        let key: { privateKey: string } = JSON.parse(
          await fs.readFile(config.keyPath, 'utf8')
        );
        deployerKey = PrivateKey.fromBase58(key.privateKey);
        deployerAccount = deployerKey.toPublicKey();

        blackMaskPrivateKey = PrivateKey.random();
        blackMaskAddress = blackMaskPrivateKey.toPublicKey();

        // smartSnarkyNetPrivateKey = PrivateKey.random();
        // smartSnarkyNetAddress = smartSnarkyNetPrivateKey.toPublicKey();

        receiverKey = PrivateKey.random();
        receiverAddress = receiverKey.toPublicKey();

        blackMaskZkApp = new BlackMask(blackMaskAddress);
        // smartSnarkyNetZkApp = new SmartSnarkyNet(smartSnarkyNetAddress);
      } else {
        const Local = Mina.LocalBlockchain({ proofsEnabled });
        Mina.setActiveInstance(Local);
        ({ privateKey: deployerKey, publicKey: deployerAccount } =
          Local.testAccounts[0]);

        blackMaskPrivateKey = PrivateKey.random();
        blackMaskAddress = blackMaskPrivateKey.toPublicKey();

        // smartSnarkyNetPrivateKey = PrivateKey.random();
        // smartSnarkyNetAddress = smartSnarkyNetPrivateKey.toPublicKey();

        receiverKey = PrivateKey.random();
        receiverAddress = receiverKey.toPublicKey();

        blackMaskZkApp = new BlackMask(blackMaskAddress);
      }
    }, 1000000);

    afterAll(() => {
      // setInterval( 0);
    });

    async function localDeploy() {
      console.log('localDeploy...');

      let txn;

      if (
        blackMaskVerificationKey !== undefined
        // smartSnarkyZkAppVerificationKey !== undefined
      ) {
        txn = await Mina.transaction(deployerAccount, () => {
          //   AccountUpdate.fundNewAccount(deployerAccount);
          AccountUpdate.fundNewAccount(deployerAccount);

          blackMaskZkApp.deploy({
            verificationKey: blackMaskVerificationKey,
            zkappKey: blackMaskPrivateKey,
          });
          //   proxyZkApp.deploy({
          //     verificationKey: proxyZkAppVerificationKey,
          //     zkappKey: proxyZkAppPrivateKey,
          //   });
        });
      } else {
        console.log('zkAppVerificationKey is not defined');
      }
      if (txn === undefined) {
        console.log('txn is not defined');
      } else {
        await txn.prove();
        await (
          await txn.sign([deployerKey, blackMaskPrivateKey]).send()
        ).wait();
        console.log('deployed proxyZkApp local', blackMaskAddress.toBase58());
        // console.log(
        //   'deployed recursionZkApp local',
        //   smartSnarkyNetAddress.toBase58()
        // );
      }
    }

    async function berkeleyDeploy() {
      console.log('calling faucet...');
      //   try {
      //     await Mina.faucet(deployerAccount);
      //   } catch (e) {
      //     console.log('error calling faucet', e);
      //   }
      console.log('waiting for account to exist...');
      try {
        await loopUntilAccountExists({
          account: deployerAccount,
          eachTimeNotExist: () =>
            console.log(
              'waiting for deployerAccount account to be funded...',
              getFriendlyDateTime()
            ),
          isZkAppAccount: false,
        });
      } catch (e) {
        console.log('error waiting for deployerAccount to exist', e);
      }

      console.log('calling faucet...done');

      console.log('deploy on Berkeley...');

      let txn;

      if (blackMaskVerificationKey !== undefined) {
        txn = await Mina.transaction(
          { sender: deployerAccount, fee: 0.2e9 },
          () => {
            AccountUpdate.fundNewAccount(deployerAccount, 2);

            blackMaskZkApp.deploy({
              verificationKey: blackMaskVerificationKey,
              zkappKey: blackMaskPrivateKey,
            });
            // proxyZkApp.deploy({
            //   verificationKey: proxyZkAppVerificationKey,
            //   zkappKey: proxyZkAppPrivateKey,
            // });
          }
        );
      } else {
        console.log('zkAppVerificationKey is not defined');
      }
      if (txn === undefined) {
        console.log('txn is not defined');
      } else {
        await txn.prove();
        txn.sign([deployerKey, blackMaskPrivateKey]);
        let response = await txn.send();
        console.log('response from BlackMask deploy is', response);
      }
    }

    it(`1. deploy zkApps and check verificationKeys and hashes stored - deployToBerkeley?: ${deployToBerkeley}`, async () => {
      await saveVerificationKey(
        blackMaskVerificationKey?.hash,
        blackMaskVerificationKey?.data,
        'blackMask',
        blackMaskAddress,
        blackMaskPrivateKey
      );
      //   await saveVerificationKey(
      //     proxyZkAppVerificationKey?.hash,
      //     proxyZkAppVerificationKey?.data,
      //     'recursionProxy',
      //     proxyZkAppAddress,
      //     proxyZkAppPrivateKey
      //   );
      console.log('deploying zkApps...');
      deployToBerkeley ? await berkeleyDeploy() : await localDeploy();

      if (isBerkeley) {
        // wait for the account to exist
        await loopUntilAccountExists({
          account: blackMaskAddress,
          eachTimeNotExist: () =>
            console.log(
              'waiting for blackMask account to be deployed...',
              getFriendlyDateTime()
            ),
          isZkAppAccount: true,
        });

        // await loopUntilAccountExists({
        //   account: proxyZkAppAddress,
        //   eachTimeNotExist: () =>
        //     console.log(
        //       'waiting for proxyZkApp account to be deployed...',
        //       getFriendlyDateTime()
        //     ),
        //   isZkAppAccount: true,
        // });
      }

      if (isBerkeley) {
        await fetchAccount({
          publicKey: blackMaskAddress,
        });
        // await fetchAccount({
        //   publicKey: proxyZkAppAddress,
        // });
      }
      let actualBlackMaskVerificationKeyHash =
        Mina.getAccount(blackMaskAddress).zkapp?.verificationKey?.hash;
      //   let actualProxyVerificationKeyHash = Mina.getAccount(proxyZkAppAddress)
      //     .zkapp?.verificationKey?.hash;

      expect(actualBlackMaskVerificationKeyHash).toEqual(
        blackMaskVerificationKey?.hash
      );
      //   expect(actualSmartSnarkyVerificationKeyHash).toEqual(
      //     smartSnarkyZkAppVerificationKey?.hash
      //   );
    }, 100000000);

    it(`2. generate recursion proof - deployToBerkeley?: ${deployToBerkeley}`, async () => {
      console.log('generate recursion proof...');
      const PIXELSIZE = 100;
      const MASKSIZE = PIXELSIZE / 4;

      // generate array of 250 random 0 or 1
      let mask = [];
      for (let i = 0; i < MASKSIZE; i++) {
        mask.push(Math.round(Math.random()) % 2);
      }
      // Dummy Mask
      let maskBool = MaskClass.from(mask);

      // Dummy Dataset
      let pixelProof1 = PixelArrayClass1000.from(
        imageData.pixelData.slice(0, 100)
      );
      let pixelProof2 = PixelArrayClass1000.from(
        imageData.pixelData.slice(100, 200)
      );
      let pixelProof3 = PixelArrayClass1000.from(
        imageData.pixelData.slice(200, 300)
      );
      let dummyArray = [pixelProof1, pixelProof2, pixelProof3];
      // Now create the hash chain from your dummy array
      let expectedHashChain = createHashChain(dummyArray);
      // let testHash1 = Poseidon.hash(pixelProof1.pixelArray);
      // let testHash2 = Poseidon.hash([
      //   testHash1,
      //   Poseidon.hash(pixelProof2.pixelArray),
      // ]);
      // let testHash3 = Poseidon.hash([
      //   testHash2,
      //   Poseidon.hash(pixelProof3.pixelArray),
      // ]);
      // let expectedHashChain = testHash3;

      console.log('HashChain is', expectedHashChain.toString());

      // calling recursion
      console.log('calling recursion...');
      let proof1: BlackProof | undefined; // Initialize proof1 as undefined
      let proof2: BlackProof | undefined; // proof2 may not be assigned if dummyArray is empty
      for (let i = 0; i < dummyArray.length; i++) {
        console.time(`Running RecursionProofSystem blackPixel ${i + 1}`);
        if (i === 0) {
          const firstHash: Field = Poseidon.hash(dummyArray[i].pixelArray);
          proof1 = await RecursionProofSystem.blackPixel_first(
            firstHash,
            maskBool,
            dummyArray[i]
          );
          console.log('proof1.publicInput', proof1?.publicInput.toString());
        } else {
          if (!proof1) {
            throw new Error('proof1 is not initialized.');
          }
          console.log('i is', i);
          const secondHash = Poseidon.hash([
            proof1.publicInput,
            Poseidon.hash(dummyArray[i].pixelArray),
          ]);
          console.log('secondHash', secondHash.toString());
          proof2 = await RecursionProofSystem.blackPixel_second(
            secondHash,
            maskBool,
            dummyArray[i],
            proof1
          );
          console.log('proof2.publicInput', proof2.publicInput.toString());
          proof1 = proof2;
        }
        console.timeEnd(`Running RecursionProofSystem blackPixel ${i + 1}`);
      }

      console.log('finished');
      if (!proof2) {
        throw new Error('proof2 is undefined');
      }
      // commit to hashChain
      const txn1 = await Mina.transaction(
        { sender: deployerAccount, fee: 0.1e9, memo: '2. recursion proof' },
        () => {
          blackMaskZkApp.setHash(Field(expectedHashChain));
        }
      );
      await txn1.prove();
      txn1.sign([deployerKey, blackMaskPrivateKey]);
      await (await txn1.send()).wait();
      console.log('hash updated');
      const txn = await Mina.transaction(
        { sender: deployerAccount, fee: 0.1e9, memo: '2. recursion proof' },
        () => {
          blackMaskZkApp.blackMask(proof2!);
        }
      );
      await txn.prove();
      txn.sign([deployerKey, blackMaskPrivateKey]);
      await (await txn.send()).wait();

      let newHash = blackMaskZkApp.hash.get();
      expect(newHash).toEqual(expectedHashChain);
      //   expect(Poseidon.hash(snarkyLayer2s.toFields())).toEqual(
      //     currentLayer2Hash
      //   );
      //   expect(currentClassification).toEqual(Field(2));
    }, 10000000);

    //     it(`3. try to update hashes with signature while "editstate" is proofOrSignature()"- deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       console.log(
    //         '3. try to update hashes with signature while editstate is proofOrSignature()'
    //       );
    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //       }

    //       // change permissions for setVerificationKey to impossible
    //       let txn_permission = await Mina.transaction(
    //         {
    //           sender: deployerAccount,
    //           fee: 0.2e9,
    //           memo: '3. update hashes with signature',
    //         },
    //         () => {
    //           smartSnarkyNetZkApp.setLayerHashes(Field(1), Field(2));
    //         }
    //       );
    //       await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       await (await txn_permission.send()).wait({ maxAttempts: 100 });

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //       }
    //       Mina.getAccount(smartSnarkyNetAddress);

    //       let currentLayer1Hash = smartSnarkyNetZkApp.layer1Hash.get();
    //       let currentLayer2Hash = smartSnarkyNetZkApp.layer2Hash.get();

    //       expect(currentLayer1Hash).toEqual(Field(1));
    //       expect(currentLayer2Hash).toEqual(Field(2));
    //     }, 10000000);

    //     it(`4. set hashes back to true hashes with signature while "editstate" is proofOrSignature()"- deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       console.log(
    //         '4. set hashes back to true hashes with signature while "editstate" is proofOrSignature()'
    //       );
    //       let snarkyLayer1s = new SnarkyLayer1(
    //         preprocessWeights(weights_l1_8x8),
    //         'relu'
    //       );

    //       let snarkyLayer2s = new SnarkyLayer2(
    //         preprocessWeights(weights_l2_8x8),
    //         'softmax'
    //       );

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }

    //       // change permissions for setVerificationKey to impossible
    //       let txn_permission = await Mina.transaction(
    //         {
    //           sender: deployerAccount,
    //           fee: 0.2e9,
    //           memo: '4. correct hashes again',
    //         },
    //         () => {
    //           smartSnarkyNetZkApp.setLayerHashes(
    //             Poseidon.hash(snarkyLayer1s.toFields()),
    //             Poseidon.hash(snarkyLayer2s.toFields())
    //           );
    //         }
    //       );
    //       await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       await (await txn_permission.send()).wait({ maxAttempts: 100 });

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }
    //       Mina.getAccount(smartSnarkyNetAddress);

    //       const currentLayer1Hash = smartSnarkyNetZkApp.layer1Hash.get();
    //       const currentLayer2Hash = smartSnarkyNetZkApp.layer2Hash.get();

    //       expect(currentLayer1Hash).toEqual(
    //         Poseidon.hash(snarkyLayer1s.toFields())
    //       );
    //       expect(currentLayer2Hash).toEqual(
    //         Poseidon.hash(snarkyLayer2s.toFields())
    //       );
    //     }, 10000000);

    //     it(`5. set Permission "editState" to proof()"  - deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       if (isBerkeley) {
    //         try {
    //           await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //           await fetchAccount({ publicKey: deployerAccount });
    //         } catch (e) {
    //           console.log('fetch in 5. errors', e);
    //         }
    //       }
    //       Mina.getAccount(smartSnarkyNetAddress);

    //       // change permissions for setVerificationKey to impossible
    //       let txn_permission = await Mina.transaction(
    //         {
    //           sender: deployerAccount,
    //           fee: 0.2e9,
    //           memo: '5. set editState to proof',
    //         },
    //         () => {
    //           let permissionsUpdate = AccountUpdate.createSigned(
    //             smartSnarkyNetAddress
    //           );
    //           permissionsUpdate.account.permissions.set({
    //             ...Permissions.default(),
    //             editState: Permissions.proof(),
    //             access: Permissions.proofOrSignature(),
    //             setZkappUri: Permissions.proof(),
    //             setVerificationKey: Permissions.proof(),
    //             setTokenSymbol: Permissions.impossible(),
    //           });
    //         }
    //       );
    //       await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       await (await txn_permission.send()).wait();

    //       let currentAccount;
    //       let currentPermissionEdit;
    //       if (isBerkeley) {
    //         currentAccount = await fetchAccount({
    //           publicKey: smartSnarkyNetAddress,
    //         });
    //         await fetchAccount({ publicKey: deployerAccount });
    //         currentPermissionEdit = currentAccount?.account?.permissions.editState;
    //       } else {
    //         currentAccount = Mina.getAccount(smartSnarkyNetAddress);
    //         currentPermissionEdit = currentAccount?.permissions.editState;
    //       }

    //       expect(currentPermissionEdit).toEqual(Permissions.proof());
    //     }, 10000000);

    //     it(`6. try to update hashes with signature while "editstate is proof() but the method requires a signature"- deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }
    //       let txn_permission = await Mina.transaction(
    //         { sender: deployerAccount, fee: 0.1e9 },
    //         () => {
    //           smartSnarkyNetZkApp.setLayerHashes(Field(1), Field(2));
    //         }
    //       );
    //       await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       // console.log('txn_permission hashes edit', txn_permission.toPretty());
    //       expect(async () => {
    //         await (await txn_permission.send()).wait({ maxAttempts: 1000 });
    //       }).rejects.toThrow();
    //     }, 10000000);

    //     it(`7. set permission "access" to signature() - deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }
    //       Mina.getAccount(smartSnarkyNetAddress);
    //       // change permissions for access to signature
    //       let txn_permission = await Mina.transaction(
    //         {
    //           sender: deployerAccount,
    //           fee: 0.2e9,
    //           memo: '7. set access to signature',
    //         },
    //         () => {
    //           let permissionsUpdate = AccountUpdate.createSigned(
    //             smartSnarkyNetAddress
    //           );
    //           permissionsUpdate.account.permissions.set({
    //             ...Permissions.default(),
    //             editState: Permissions.proof(),
    //             access: Permissions.signature(),
    //             setZkappUri: Permissions.proof(),
    //             setVerificationKey: Permissions.proof(),
    //             setTokenSymbol: Permissions.impossible(),
    //           });
    //         }
    //       );
    //       await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       await (await txn_permission.send()).wait({ maxAttempts: 100 });

    //       let currentAccount;
    //       let currentPermissionAccess;
    //       if (isBerkeley) {
    //         currentAccount = (
    //           await fetchAccount({
    //             publicKey: smartSnarkyNetAddress,
    //           })
    //         ).account;
    //         currentPermissionAccess = currentAccount?.permissions.access;
    //       } else {
    //         currentAccount = Mina.getAccount(smartSnarkyNetAddress);
    //         currentPermissionAccess = currentAccount?.permissions.access;
    //       }

    //       expect(currentPermissionAccess?.signatureNecessary).toEqual(
    //         Permissions.signature().signatureNecessary
    //       );
    //     }, 10000000);

    //     it(`8. proving that input image was indeed a picture of a 7 BUT access is set to signature() - deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       console.log('proving that input image was indeed a picture of a 7...');

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }
    //       let snarkyLayer1s = new SnarkyLayer1(
    //         preprocessWeights(weights_l1_8x8),
    //         'relu'
    //       );

    //       let snarkyLayer2s = new SnarkyLayer2(
    //         preprocessWeights(weights_l2_8x8),
    //         'softmax'
    //       );

    //       let inputImage = new InputImage({
    //         value: preprocessImage(image_0_label_7_8x8),
    //       });

    //       let model = new SnarkyNet([snarkyLayer1s, snarkyLayer2s]);

    //       let predictionAndSteps = model.predict(inputImage);

    //       const architecture = new Architecture({
    //         layer1: snarkyLayer1s,
    //         layer2: snarkyLayer2s,
    //         precomputedOutputLayer1: predictionAndSteps.intermediateResults[0],
    //         precomputedOutputLayer2: predictionAndSteps.intermediateResults[1],
    //       });

    //       const proofLayer1 = await NeuralNet.layer1(architecture, inputImage);
    //       // console.log('proofLayer1', proofLayer1);

    //       const proofLayer2 = await NeuralNet.layer2(architecture, proofLayer1);
    //       // console.log('proofLayer2', proofLayer2);

    //       const isValidLocal = await verify(proofLayer2, neuralNetVerificationKey);
    //       console.log('isValidLocal', isValidLocal);

    //       const txn = await Mina.transaction(
    //         { sender: deployerAccount, fee: 0.3e9, memo: '8. set classification' },
    //         () => {
    //           proxyZkApp.callPredict(proofLayer2, smartSnarkyNetAddress);
    //         }
    //       );
    //       await txn.prove();
    //       txn.sign([deployerKey]);
    //       expect(async () => {
    //         await (await txn.send()).wait();
    //       }).rejects.toThrow();

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         await fetchAccount({ publicKey: deployerAccount });
    //       }
    //       let currentClassification = smartSnarkyNetZkApp.classification.get();

    //       expect(currentClassification).toEqual(Field(2));
    //       // }).rejects.toThrow();
    //     }, 10000000);

    //     it(`9. changing Permission to impossible to fix architecture - deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       console.log(
    //         'changing smartSnarkyNet Permission to impossible to fix architecture...'
    //       );
    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //       }

    //       // change permissions for setVerificationKey to impossible
    //       let txn_permission = await Mina.transaction(
    //         { sender: deployerAccount, fee: 0.4e9 },
    //         () => {
    //           let permissionsUpdate = AccountUpdate.createSigned(
    //             smartSnarkyNetAddress
    //           );
    //           permissionsUpdate.account.permissions.set({
    //             ...Permissions.default(),
    //             editState: Permissions.proof(),
    //             access: Permissions.proof(),
    //             setZkappUri: Permissions.impossible(),
    //             setVerificationKey: Permissions.impossible(),
    //             setTokenSymbol: Permissions.impossible(),
    //             setPermissions: Permissions.impossible(),
    //           });
    //         }
    //       );

    //       // await txn_permission.prove();
    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       await (await txn_permission.send()).wait();

    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //       }

    //       let currentPermissionSetVerificationKey = Mina.getAccount(
    //         smartSnarkyNetAddress
    //       ).permissions.setVerificationKey;
    //       let currentPermissionAccess = Mina.getAccount(smartSnarkyNetAddress)
    //         .permissions.access;
    //       let currentPermissionEdit = Mina.getAccount(smartSnarkyNetAddress)
    //         .permissions.editState;
    //       let currentPermissionSetZkappUri = Mina.getAccount(smartSnarkyNetAddress)
    //         .permissions.setZkappUri;
    //       let currentPermissionSetTokenSymbol = Mina.getAccount(
    //         smartSnarkyNetAddress
    //       ).permissions.setTokenSymbol;
    //       let currentPermissionSetPermissions = Mina.getAccount(
    //         smartSnarkyNetAddress
    //       ).permissions.setPermissions;

    //       expect(currentPermissionAccess).toEqual(Permissions.proof());
    //       expect(currentPermissionEdit).toEqual(Permissions.proof());
    //       expect(currentPermissionSetZkappUri).toEqual(Permissions.impossible());
    //       expect(currentPermissionSetTokenSymbol).toEqual(Permissions.impossible());
    //       expect(currentPermissionSetPermissions).toEqual(Permissions.impossible());
    //       expect(currentPermissionSetVerificationKey).toEqual(
    //         Permissions.impossible()
    //       );
    //     }, 10000000);

    //     it(`10. changing Permission "access" to signature, BUT permission "setPermission" is impossible - deployToBerkeley?: ${deployToBerkeley}`, async () => {
    //       if (isBerkeley) {
    //         await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //       }

    //       // change permissions for setVerificationKey to impossible
    //       let txn_permission = await Mina.transaction(
    //         { sender: deployerAccount, fee: 0.5e9 },
    //         () => {
    //           let permissionsUpdate = AccountUpdate.createSigned(
    //             smartSnarkyNetAddress
    //           );
    //           permissionsUpdate.account.permissions.set({
    //             ...Permissions.default(),
    //             editState: Permissions.proof(),
    //             access: Permissions.signature(),
    //             setZkappUri: Permissions.impossible(),
    //             setVerificationKey: Permissions.impossible(),
    //             setTokenSymbol: Permissions.impossible(),
    //             setPermissions: Permissions.impossible(),
    //           });
    //         }
    //       );

    //       txn_permission.sign([deployerKey, smartSnarkyNetPrivateKey]);
    //       expect(async () => {
    //         await (await txn_permission.send()).wait();

    //         if (isBerkeley) {
    //           await fetchAccount({ publicKey: smartSnarkyNetAddress });
    //         }

    //         let currentPermissionAccess = Mina.getAccount(smartSnarkyNetAddress)
    //           .permissions.access;

    //         expect(currentPermissionAccess).toEqual(Permissions.signature());
    //       }).rejects.toThrow();
    //     }, 10000000);
  }
  runTests();
});
