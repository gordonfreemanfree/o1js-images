// -------------------------------------------------------
import { Field, PublicKey } from 'o1js'
import { useEffect, useState, FC } from 'react'

import ZkappWorkerClient from './zkappWorkerClient'
import { SetupStateType } from '@/components/types'
import { toast, ToastContainer } from 'react-toastify'

const ZKAPPADDRESS = 'B62qn7dM9VsBCPYgmzubwNiiY2iCN9cu2t8Dufpk6eeLDEkGZsiK51B'

interface DoSetupProps {
  state: SetupStateType
  setState: React.Dispatch<React.SetStateAction<SetupStateType>>
}

const DoSetup: FC<DoSetupProps> = ({ state, setState }) => {
  const notify = (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  // Do Setup
  useEffect(() => {
    ;(async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient()

        console.log('Loading o1js...')
        // const toastLoading = toast.loading('Loading o1js...')

        // await zkappWorkerClient.loadSnarkyJS()
        // toast.update(toastLoading, {
        //   render: 'SnarkyJS loaded',
        //   type: 'success',
        //   isLoading: false,
        //   autoClose: 2000,
        // })
        // console.log('done')

        await zkappWorkerClient.setActiveInstanceToBerkeley()
        console.log('set active instance to Berkeley')
        const mina = (window as any).mina

        if (mina == null) {
          setState({ ...state, hasWallet: false })
          console.log('no wallet')
          return
        }

        const publicKeyBase58: string = (await mina.requestAccounts())[0]
        const publicKey = PublicKey.fromBase58(publicKeyBase58)

        console.log('using key', publicKey.toBase58())

        console.log('checking if account exists...')
        const res = await zkappWorkerClient.fetchAccount({
          publicKey: publicKey!,
        })
        const accountExists = res.error == null

        await zkappWorkerClient.loadContract()
        // await zkappWorkerClient.loadLayer1()
        // await zkappWorkerClient.loadLayer2()
        // await zkappWorkerClient.loadInputImage()

        console.log('compiling zkApp')
        const toastCompiling = toast.loading('Compiling zkApp...')
        await zkappWorkerClient.compileContract()
        toast.update(toastCompiling, {
          render: 'zkApp compiled',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })
        console.log('zkApp compiled')

        // const toastZkapppublickey = toast.loading('Using zkApp public key B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP')
        const toastZkapppublickey = toast.loading(
          <a
            href="https://berkeley.minaexplorer.com/wallet/${B62qn7dM9VsBCPYgmzubwNiiY2iCN9cu2t8Dufpk6eeLDEkGZsiK51B}"
            target="_blank"
          >
            See zkApp Account
          </a>,
        )
        const zkappPublicKey = PublicKey.fromBase58(ZKAPPADDRESS)
        // await zkappWorkerClient.initZkappInstance(zkappPublicKey)
        toast.update(toastZkapppublickey, {
          render: (
            <a
              href="https://berkeley.minaexplorer.com/wallet/B62qn7dM9VsBCPYgmzubwNiiY2iCN9cu2t8Dufpk6eeLDEkGZsiK51B"
              target="_blank"
            >
              See zkApp Account
            </a>
          ),
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })

        // console.log('initializing layer 1...')
        // await zkappWorkerClient.initLayer1({
        //   weights_l1_8x8: weights_l1_8x8,
        //   activation: 'relu',
        // })
        // console.log('initializing layer 2...')
        // await zkappWorkerClient.initLayer2({
        //   weights_l2_8x8: weights_l2_8x8,
        //   activation: 'softmax',
        // })

        console.log('getting zkApp state...')
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum()
        console.log('current state:', currentNum.toString())

        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
          currentNum,
        })
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...')
          const res = await state.zkappWorkerClient!.fetchAccount({
            publicKey: state.publicKey!,
          })
          const accountExists = res.error == null
          if (accountExists) {
            break
          }
          await new Promise((resolve) => setTimeout(resolve, 5000))
        }
        setState({ ...state, accountExists: true })
      }
    })()
  }, [state.hasBeenSetup])

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...')
    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.zkappPublicKey!,
    })
    const currentNum = await state.zkappWorkerClient!.getNum()
    console.log('current state:', currentNum.toString())

    setState({ ...state, currentNum })
  }

  // -------------------------------------------------------
  // Create UI elements

  let hasWallet
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/'
    const auroLinkElem = (
      <a href={auroLink} target="_blank" rel="noreferrer">
        {' '}
        [Link]{' '}
      </a>
    )
    hasWallet = (
      <div>
        {' '}
        Could not find a wallet. Install Auro wallet here: {auroLinkElem}
      </div>
    )
  }

  let setupText = state.hasBeenSetup
    ? 'SnarkyJS Ready'
    : 'Setting up SnarkyJS...'
  let setup = (
    <div>
      {' '}
      {setupText} {hasWallet}
    </div>
  )

  let accountDoesNotExist
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink =
      'https://faucet.minaprotocol.com/?address=' + state.publicKey!.toBase58()
    accountDoesNotExist = (
      <div>
        Account does not exist. Please visit the faucet to fund this account
        <a href={faucetLink} target="_blank" rel="noreferrer">
          {' '}
          [Link]{' '}
        </a>
      </div>
    )
  }

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      Hello There
    </div>
  )
}

export default DoSetup
