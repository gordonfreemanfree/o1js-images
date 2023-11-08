import Head from 'next/head'
import DoSetup from '@/components/DoSetup'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import { useState, SetStateAction, Dispatch, useEffect } from 'react'
import ZkappWorkerClient from '@/pages/zkappWorkerClient'
import { Field, PublicKey } from 'o1js'
import { SetupStateType } from '@/components/types'

interface HomeProps {
  state: SetupStateType
  setState: Dispatch<SetStateAction<SetupStateType>>
}

const Home: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      bal fdasln fkldnaökfn ökldsanfkl ndsöaknf
      {/* <DoSetup state={state} setState={setState} /> */}
      {/* <Link
        href={'/draw'}
        className="flex-none text-right m-2   hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
      >
        Draw
      </Link> */}
      {/* <ImageCard /> */}
      {/* <DrawWithBackgroundImage /> */}
      {/* <ToastContainer /> */}
    </>
  )
}
export default Home
