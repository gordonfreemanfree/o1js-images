import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContext from '../components/appContext'
import { useState } from 'react'
import './reactCOIServiceWorker'
import { Field, PublicKey } from 'o1js'
import ZkappWorkerClient from '@/pages/zkappWorkerClient'
import { SetupStateType } from '@/components/types'
import Home from './index'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import './reactCOIServiceWorker'
// Custom hook for toast notifications
// function useToast() {
//   const notify = (message, type = 'info') => {
//     const options = {
//       position: 'top-right',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     }

//     switch (type) {
//       case 'success':
//         toast.success(message, options)
//         break
//       case 'warning':
//         toast.warn(message, options)
//         break
//       case 'error':
//         toast.error(message, options)
//         break
//       default:
//         toast.info(message, options)
//     }
//   }

//   return notify
// }

export default function App({ Component, pageProps }: AppProps) {
  let [state, setState] = useState<SetupStateType>({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  })
  // const notify = useToast()

  // -------------------------------------------------------
  // Do Setup
  // useEffect(() => {
  //   async function setup() {
  //     // if (!state.hasBeenSetup) {
  //     const zkappWorkerClient = new ZkappWorkerClient()
  //     console.log('Loading o1js...')

  //     // const zkappWorkerClient = new ZkappWorkerClient()

  //     // console.log('Loading o1js...')
  //     // // const toastLoading = toast.loading('Loading SnarkyJS...')
  //     // // toast('Loading SnarkyJS...', 'info')

  //     // await zkappWorkerClient.setActiveInstanceToBerkeley()
  //     // console.log('set active instance to Berkeley')
  //     try {
  //       await zkappWorkerClient.setActiveInstanceToBerkeley()
  //       console.log('set active instance to Berkeley')
  //     } catch (error) {
  //       console.error('Error setting active instance:', error)
  //     }
  //     const mina = (window as any).mina

  //     if (mina == null) {
  //       setState({ ...state, hasWallet: false })
  //       return
  //     }

  //     const publicKeyBase58: string = (await mina.requestAccounts())[0]
  //     const publicKey = PublicKey.fromBase58(publicKeyBase58)

  //     console.log('using key', publicKey.toBase58())

  //     console.log('checking if account exists...')
  //     const res = await zkappWorkerClient.fetchAccount({
  //       publicKey: publicKey!,
  //     })
  //     const accountExists = res.error == null

  //     await zkappWorkerClient.loadContract()
  //     // await zkappWorkerClient.loadLayer1()
  //     // await zkappWorkerClient.loadLayer2()
  //     // await zkappWorkerClient.loadInputImage()

  //     console.log('compiling zkApp')
  //     const toastCompiling = toast.loading('Compiling zkApp...')
  //     await zkappWorkerClient.compileContract()
  //     toast.update(toastCompiling, {
  //       render: 'zkApp compiled',
  //       type: 'success',
  //       isLoading: false,
  //       autoClose: 2000,
  //     })
  //     console.log('zkApp compiled')

  //     // const toastZkapppublickey = toast.loading('Using zkApp public key B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP')
  //     const toastZkapppublickey = toast.loading(
  //       <a
  //         href="https://berkeley.minaexplorer.com/wallet/B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP"
  //         target="_blank"
  //       >
  //         See zkApp Account
  //       </a>,
  //     )
  //     const zkappPublicKey = PublicKey.fromBase58(
  //       'B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP',
  //     )
  //     // await zkappWorkerClient.initZkappInstance(zkappPublicKey)
  //     toast.update(toastZkapppublickey, {
  //       render: (
  //         <a
  //           href="https://berkeley.minaexplorer.com/wallet/B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP"
  //           target="_blank"
  //         >
  //           See zkApp Account
  //         </a>
  //       ),
  //       type: 'success',
  //       isLoading: false,
  //       autoClose: 2000,
  //     })

  //     // setWeightsLayer1(weights_l1_8x8)
  //     // setWeightsLayer2(weights_l2_8x8)

  //     console.log('getting zkApp state...')
  //     await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
  //     const currentNum = await zkappWorkerClient.getNum()
  //     console.log('current state:', currentNum.toString())

  //     setState((prevState) => ({
  //       ...state,
  //       zkappWorkerClient,
  //       hasWallet: true,
  //       hasBeenSetup: true,
  //       publicKey,
  //       zkappPublicKey,
  //       accountExists,
  //       currentNum,
  //     }))
  //   }
  //   // }
  //   setup()
  // }, [])

  useEffect(() => {
    const setup = async () => {
      const zkappWorkerClient = new ZkappWorkerClient()
      console.log('Loading o1js...')

      try {
        await zkappWorkerClient.setActiveInstanceToBerkeley()
        console.log('set active instance to Berkeley')
      } catch (error) {
        console.error('Error setting active instance:', error)
        return
      }

      // const mina = window.mina // Make sure 'mina' is properly declared globally or imported
      const mina = (window as any).mina
      if (!mina) {
        setState((prevState) => ({ ...prevState, hasWallet: false }))
        return
      }

      try {
        const publicKeyBase58 = (await mina.requestAccounts())[0]
        const publicKey = PublicKey.fromBase58(publicKeyBase58)
        console.log('using key', publicKey.toBase58())

        console.log('checking if account exists...')
        const accountResponse = await zkappWorkerClient.fetchAccount({
          publicKey,
        })
        const accountExists = !accountResponse.error

        console.log('compiling zkApp')
        const toastCompiling = toast.loading('Compiling zkApp...')
        await zkappWorkerClient.compileContract()
        toast.update(toastCompiling, {
          render: 'zkApp compiled',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })

        const zkappPublicKey = PublicKey.fromBase58(
          'B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP',
        )
        // await zkappWorkerClient.initZkappInstance(zkappPublicKey) // Assuming this line should be uncommented

        console.log('getting zkApp state...')
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum()
        console.log('current state:', currentNum.toString())

        setState((prevState) => ({
          ...prevState,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
          currentNum,
        }))
      } catch (error) {
        console.error('An error occurred during setup:', error)
        // Handle error appropriately, perhaps set an error state property
      }
    }

    setup()
  }, []) // The empty array ensures this effect runs only once after the initial render

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

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

  let mainContent
  if (state.hasBeenSetup && state.accountExists) {
    mainContent = <div>Main Content</div>
  }

  return (
    <>
      <ToastContainer />
      {/* <AppContext.Provider value={{ imageContext, setImageContext }}>
        // <Component {...pageProps} state={state} setState={setState} />
        //{' '}
      </AppContext.Provider> */}
      <Home />
      {accountDoesNotExist}
      {mainContent}
    </>
  )
}
