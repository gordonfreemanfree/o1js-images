import { AccountUpdate, Mina, PrivateKey, PublicKey, Field } from 'o1js';

import { Invert } from '../contracts/invertSmartContract5x5.js';

// import imageData from '../../../assets/pixelData10x10.json';
import { NewImageSize5x5 } from '../classes/imageClass5x5.js';

let imageData = [
  56, 15, 173, 255, 236, 107, 127, 255, 169, 243, 137, 255, 227, 218, 149, 255,
  211, 97, 132, 255, 207, 153, 50, 255, 8, 201, 86, 255, 32, 142, 97, 255, 28,
  122, 36, 255, 58, 56, 148, 255, 153, 203, 119, 255, 232, 117, 187, 255, 245,
  30, 183, 255, 239, 117, 220, 255, 215, 229, 6, 255, 247, 63, 92, 255, 95, 63,
  74, 255, 204, 219, 20, 255, 210, 7, 201, 255, 127, 236, 3, 255, 11, 201, 95,
  255, 247, 81, 59, 255, 188, 165, 97, 255, 246, 148, 72, 255, 161, 237, 28,
  255,
];

let proofsEnabled = true;
const DATA = imageData;

let deployerAccount: PublicKey,
  deployerKey: PrivateKey,
  senderAccount: PublicKey,
  senderKey: PrivateKey,
  zkAppAddress: PublicKey,
  zkAppPrivateKey: PrivateKey,
  zkApp: Invert; // smart contract instance

if (proofsEnabled) await Invert.compile();

const Local = Mina.LocalBlockchain({ proofsEnabled });
Mina.setActiveInstance(Local);
({ privateKey: deployerKey, publicKey: deployerAccount } =
  Local.testAccounts[0]);
({ privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1]);
zkAppPrivateKey = PrivateKey.random();
zkAppAddress = zkAppPrivateKey.toPublicKey();
zkApp = new Invert(zkAppAddress);
console.log('beforeEach successful');

async function localDeploy() {
  const txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    zkApp.deploy();
  });
  await txn.prove();
  // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  await txn.sign([deployerKey, zkAppPrivateKey]).send();
}

await localDeploy();
let x = zkApp.x.get();
console.log('localdeploy x is: ', x);
// expect(x).toEqual(new Field(10));
// const y = zkApp.y.get();
// expect(y).toEqual(new UInt32(20));
// const z = zkApp.z.get();
// expect(z).toEqual(new UInt32(30));
// const a = zkApp.a.get();
// expect(a).toEqual(new UInt32(40));
// const b = zkApp.b.get();
// expect(b).toEqual(new UInt32(50));

const image = NewImageSize5x5.from(DATA);
// update transaction
const txn = await Mina.transaction(senderAccount, () => {
  zkApp.invert(image);
});
await txn.prove();
await txn.sign([senderKey]).send();

x = zkApp.x.get();
console.log('x is: ', x);
