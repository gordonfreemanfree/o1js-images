import { Mina, PublicKey, fetchAccount } from 'o1js'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>

// ---------------------------------------------------------------------------------------

import type { Add } from '../../../contracts/src/Add'
import { BlackMask } from '../../../contracts/src/BlackMask'
import type { RecursionProofSystem } from '../../../contracts/src/recursion'
import type { AddRecursion } from '../../../contracts/src/recursion/recursionTest'

const state = {
  Add: null as null | typeof Add,
  zkapp: null as null | Add,
  transaction: null as null | Transaction,
}
const recursionState = {
  RecursionProofSystem: null as null | typeof RecursionProofSystem,
  recursionZkApp: null as null | typeof RecursionProofSystem,
}

const blackMaskState = {
  BlackMask: null as null | typeof BlackMask,
  blackMaskZkapp: null as null | BlackMask,
  blackMaskTransaction: null as null | Transaction,
}

const addState = {
  AddRecursion: null as null | typeof AddRecursion,
  addZkapp: null as null | typeof AddRecursion,
}
// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      'https://proxy.berkeley.minaexplorer.com/graphql',
    )
    console.log('Berkeley Instance Created')
    Mina.setActiveInstance(Berkeley)
  },

  loadContract: async (args: {}) => {
    const { Add } = await import('../../../contracts/build/src/Add.js')
    state.Add = Add
    const { AddRecursion } = await import(
      '../../../contracts/build/src/recursion/recursionTest.js'
    )
    addState.AddRecursion = AddRecursion
    console.log('AddRecursion loaded')
  },
  loadRecursion: async (args: {}) => {
    const { RecursionProofSystem } = await import(
      '../../../contracts/build/src/recursion/recursion.js'
    )
    recursionState.RecursionProofSystem = RecursionProofSystem
    console.log('RecursionProofSystem loaded')
  },
  loadAddRecursion: async (args: {}) => {
    const { AddRecursion } = await import(
      '../../../contracts/build/src/recursion/recursionTest.js'
    )
    addState.AddRecursion = AddRecursion
    console.log('AddRecursion loaded')
  },

  loadBlackmask: async (args: {}) => {
    const { BlackMask } = await import(
      '../../../contracts/build/src/BlackMask.js'
    )
    blackMaskState.BlackMask = BlackMask
    console.log('BlackMask loaded')
  },
  compileContract: async (args: {}) => {
    // console.log('try compiling recursionstate')
    // await recursionState.RecursionProofSystem!.compile()
    //   console.log('RecursionProofSystem compiled')
    // try {
    //   await recursionState.RecursionProofSystem!.compile()
    //   console.log('RecursionProofSystem compiled')
    // } catch (error) {
    //   console.error('Error compiling RecursionProofSystem:', error)
    // }
    await addState.AddRecursion!.compile()
    console.log('AddRecursion compiled')
    // await state.Add!.compile()
    // await blackMaskState.BlackMask!.compile()
    // console.log('BlackMask compiled')
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58)
    return await fetchAccount({ publicKey })
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58)
    state.zkapp = new state.Add!(publicKey)
  },
  initBlackMask: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58)
    blackMaskState.blackMaskZkapp = new blackMaskState.BlackMask!(publicKey)
  },
  getNum: async (args: {}) => {
    const currentNum = await state.zkapp!.num.get()
    return JSON.stringify(currentNum.toJSON())
  },
  createUpdateTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.update()
    })
    state.transaction = transaction
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove()
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON()
  },
}

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions

export type ZkappWorkerRequest = {
  id: number
  fn: WorkerFunctions
  args: any
}

export type ZkappWorkerReponse = {
  id: number
  data: any
}

if (typeof window !== 'undefined') {
  addEventListener(
    'message',
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args)

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      }
      postMessage(message)
    },
  )
}

console.log('Web Worker Successfully Initialized.')
