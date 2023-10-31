import { AccountUpdate, Mina, PrivateKey, PublicKey, Field } from 'o1js';

import { Invert } from '../contracts/invertSmartContract10x10.js';

// import imageData from '../../../assets/pixelData10x10.json';
import { NewImageSize10x10 } from '../classes/imageClass10x10.js';

let imageData = [
  241, 247, 128, 255, 132, 122, 120, 255, 243, 110, 246, 255, 52, 48, 207, 255,
  14, 11, 247, 255, 187, 54, 90, 255, 127, 49, 75, 255, 66, 64, 241, 255, 46,
  40, 129, 255, 84, 83, 157, 255, 146, 82, 204, 255, 110, 253, 155, 255, 152,
  83, 195, 255, 143, 238, 174, 255, 45, 25, 0, 255, 62, 225, 239, 255, 84, 201,
  226, 255, 144, 139, 41, 255, 35, 225, 124, 255, 252, 92, 205, 255, 116, 217,
  96, 255, 124, 180, 188, 255, 139, 101, 43, 255, 166, 234, 249, 255, 178, 163,
  78, 255, 88, 66, 231, 255, 1, 248, 235, 255, 66, 245, 38, 255, 194, 93, 41,
  255, 40, 9, 180, 255, 249, 208, 120, 255, 190, 3, 225, 255, 201, 87, 101, 255,
  68, 237, 88, 255, 40, 146, 74, 255, 96, 139, 41, 255, 215, 206, 32, 255, 246,
  232, 255, 255, 20, 105, 94, 255, 148, 169, 209, 255, 93, 252, 0, 255, 172,
  162, 223, 255, 164, 189, 38, 255, 130, 206, 200, 255, 120, 71, 66, 255, 30,
  147, 188, 255, 4, 215, 74, 255, 74, 53, 129, 255, 64, 41, 173, 255, 207, 64,
  132, 255, 147, 43, 126, 255, 117, 227, 152, 255, 78, 15, 46, 255, 253, 247,
  126, 255, 55, 64, 5, 255, 214, 234, 32, 255, 16, 99, 166, 255, 204, 10, 14,
  255, 71, 135, 56, 255, 89, 235, 65, 255, 193, 173, 94, 255, 117, 164, 217,
  255, 153, 22, 1, 255, 221, 190, 212, 255, 70, 89, 244, 255, 195, 90, 18, 255,
  158, 213, 115, 255, 168, 253, 29, 255, 251, 140, 181, 255, 180, 140, 97, 255,
  25, 219, 118, 255, 11, 21, 38, 255, 30, 254, 63, 255, 250, 196, 167, 255, 225,
  72, 222, 255, 109, 250, 180, 255, 125, 24, 110, 255, 132, 128, 183, 255, 169,
  178, 254, 255, 103, 93, 152, 255, 236, 230, 25, 255, 45, 39, 121, 255, 21,
  245, 32, 255, 52, 65, 173, 255, 239, 15, 180, 255, 79, 133, 189, 255, 238,
  207, 106, 255, 53, 59, 218, 255, 180, 219, 30, 255, 226, 103, 12, 255, 185,
  88, 121, 255, 2, 79, 94, 255, 62, 156, 248, 255, 58, 192, 236, 255, 170, 166,
  15, 255, 113, 172, 90, 255, 175, 6, 13, 255, 207, 110, 171, 255, 254, 220, 53,
  255, 78, 143, 149, 255,
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

const image = NewImageSize10x10.from(DATA);
// update transaction
const txn = await Mina.transaction(senderAccount, () => {
  zkApp.invert(image);
});
await txn.prove();
await txn.sign([senderKey]).send();

x = zkApp.x.get();
console.log('x is: ', x.toString());
