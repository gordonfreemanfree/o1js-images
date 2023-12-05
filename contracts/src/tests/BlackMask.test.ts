import {
  Mina,
  PublicKey,
  PrivateKey,
  AccountUpdate,
  fetchAccount,
  Field,
  Poseidon,
} from 'o1js';
import fs from 'fs/promises';
import {
  loopUntilAccountExists,
  getFriendlyDateTime,
} from '../utils/testHelper.js';
import { RecursionProofSystem } from '../recursion.js';
import { BlackMask } from '../BlackMask.js';
import { saveVerificationKey } from '../utils/generateVerificationKey.js';
import {
  PixelArrayClass1000,
  MaskClass,
} from '../classes/PixelArrayClass1000.js';

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
      receiverKey: PrivateKey,
      receiverAddress: PublicKey;

    let recursionProofSystemVerificationKey: string;

    let blackMaskVerificationKey: { data: string; hash: Field } | undefined;

    beforeAll(async () => {
      // choosing which Blockchain to use
      console.log('choosing blockchain');
      Blockchain = deployToBerkeley
        ? Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql')
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

        receiverKey = PrivateKey.random();
        receiverAddress = receiverKey.toPublicKey();

        blackMaskZkApp = new BlackMask(blackMaskAddress);
      } else {
        const Local = Mina.LocalBlockchain({ proofsEnabled });
        Mina.setActiveInstance(Local);
        ({ privateKey: deployerKey, publicKey: deployerAccount } =
          Local.testAccounts[0]);

        blackMaskPrivateKey = PrivateKey.random();
        blackMaskAddress = blackMaskPrivateKey.toPublicKey();

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

      if (blackMaskVerificationKey !== undefined) {
        txn = await Mina.transaction(deployerAccount, () => {
          AccountUpdate.fundNewAccount(deployerAccount);

          blackMaskZkApp.deploy({
            verificationKey: blackMaskVerificationKey,
            zkappKey: blackMaskPrivateKey,
          });
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
      }
    }

    async function berkeleyDeploy() {
      console.log('calling faucet...');
      try {
        await Mina.faucet(deployerAccount);
      } catch (e) {
        console.log('error calling faucet', e);
      }
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
          { sender: deployerAccount, fee: 0.4e9 },
          () => {
            AccountUpdate.fundNewAccount(deployerAccount);

            blackMaskZkApp.deploy({
              verificationKey: blackMaskVerificationKey,
              zkappKey: blackMaskPrivateKey,
            });
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
      }

      if (isBerkeley) {
        await fetchAccount({
          publicKey: blackMaskAddress,
        });
      }
      let actualBlackMaskVerificationKeyHash =
        Mina.getAccount(blackMaskAddress).zkapp?.verificationKey?.hash;

      expect(actualBlackMaskVerificationKeyHash).toEqual(
        blackMaskVerificationKey?.hash
      );
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

      console.log('HashChain is', expectedHashChain.toString());

      // calling recursion
      console.log('calling recursion...');
      let proof1: BlackProof | undefined;
      let proof2: BlackProof | undefined;
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
    }, 10000000);
  }
  runTests();
});
