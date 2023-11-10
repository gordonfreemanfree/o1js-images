import { PublicKey, Field } from 'o1js'
import ZkappWorkerClient from './zkappWorkerClient'

export type SetupStateType = {
  zkappWorkerClient: ZkappWorkerClient | null
  hasWallet: boolean | null
  hasBeenSetup: boolean
  accountExists: boolean
  currentNum: Field | null
  publicKey: PublicKey | null
  zkappPublicKey: PublicKey | null
  creatingTransaction: boolean
}
