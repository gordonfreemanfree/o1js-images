import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
  SelfProof,
  ZkProgram,
  Struct,
  Bool,
  Circuit,
  Poseidon,
  MerkleMap,
  MerkleTree,
  MerkleWitness,
  MerkleMapWitness,
  verify,
} from 'o1js';

export const AddRecursion = ZkProgram({
  name: 'AddRecursion',
  publicInput: Field,

  methods: {
    init: {
      privateInputs: [],

      method(state: Field) {
        state.assertEquals(Field(0));
      },
    },

    addNumber: {
      privateInputs: [SelfProof, Field],

      method(
        newState: Field,
        earlierProof: SelfProof<Field, void>,
        numberToAdd: Field
      ) {
        earlierProof.verify();
        newState.assertEquals(earlierProof.publicInput.add(numberToAdd));
      },
    },

    add: {
      privateInputs: [SelfProof, SelfProof],

      method(
        newState: Field,
        earlierProof1: SelfProof<Field, void>,
        earlierProof2: SelfProof<Field, void>
      ) {
        earlierProof1.verify();
        earlierProof2.verify();
        newState.assertEquals(
          earlierProof1.publicInput.add(earlierProof2.publicInput)
        );
      },
    },
  },
});
