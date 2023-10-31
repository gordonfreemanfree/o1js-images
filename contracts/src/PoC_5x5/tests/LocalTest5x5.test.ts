import {
  AccountUpdate,
  Mina,
  PrivateKey,
  PublicKey,
  UInt32,
  Field,
} from 'o1js';

import { Invert } from '../contracts/invertSmartContract5x5.js';
import imageData from '../../../assets/pixelData10x10.json';
import { NewImageSize5x5 } from '../classes/imageClass5x5.js';

let proofsEnabled = true;
const DATA = imageData.pixelData;

describe('Invert', () => {
  let deployerAccount: PublicKey,
    deployerKey: PrivateKey,
    senderAccount: PublicKey,
    senderKey: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: Invert; // smart contract instance

  beforeAll(async () => {
    if (proofsEnabled) await Invert.compile();
  });

  beforeEach(() => {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    ({ privateKey: deployerKey, publicKey: deployerAccount } =
      Local.testAccounts[0]);
    ({ privateKey: senderKey, publicKey: senderAccount } =
      Local.testAccounts[1]);
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new Invert(zkAppAddress);
    console.log('beforeEach successful');
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([deployerKey, zkAppPrivateKey]).send();
  }

  it('generates and deploys the `Invert` smart contract', async () => {
    await localDeploy();
    const x = zkApp.x.get();
    expect(x).toEqual(new Field(10));
    // const y = zkApp.y.get();
    // expect(y).toEqual(new UInt32(20));
    // const z = zkApp.z.get();
    // expect(z).toEqual(new UInt32(30));
    // const a = zkApp.a.get();
    // expect(a).toEqual(new UInt32(40));
    // const b = zkApp.b.get();
    // expect(b).toEqual(new UInt32(50));
  });

  it('correctly inverts the image', async () => {
    await localDeploy();
    const image = NewImageSize5x5.from(DATA);
    // update transaction
    const txn = await Mina.transaction(senderAccount, () => {
      zkApp.invert(image);
    });
    await txn.prove();
    await txn.sign([senderKey]).send();

    const x = zkApp.x.get();
    expect(x).toEqual(new Field(0));
    const y = zkApp.y.get();
    expect(y).toEqual(new Field(255));
    const z = zkApp.z.get();
    expect(z).toEqual(new Field(255));
    const a = zkApp.a.get();
    expect(a).toEqual(new Field(255));
  });
});
