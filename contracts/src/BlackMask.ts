// TODO: include the mask hashChain

import {
  SmartContract,
  state,
  method,
  State,
  Field,
  Proof,
  Provable,
  ZkProgram,
  Experimental,
} from 'o1js';
import { RecursionProofSystem } from './recursion.js';

export { BlackMask, BlackProof };

class BlackProof extends ZkProgram.Proof(RecursionProofSystem) {}

class BlackMask extends SmartContract {
  @state(Field) hash = State<Field>(); // Pixel hashChain
  // @state(Field) y = State<Field>(); // Mask hashChain

  init() {
    super.init();
    this.hash.set(new Field(10)); // initial state
    // this.y.set(new Field(20)); // initial state
  }

  @method setHash(hash: Field) {
    const oldHash = this.hash.get();
    this.hash.assertEquals(oldHash);
    this.hash.set(hash);
  }

  @method blackMask(proof: BlackProof) {
    const hash = this.hash.get();
    this.hash.assertEquals(hash);
    hash.assertEquals(proof.publicInput);
    proof.verify();
    Provable.log('proof successfully verified');
  }
}
