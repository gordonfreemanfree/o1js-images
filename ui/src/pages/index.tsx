import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import GradientBG from '../components/GradientBG.js'
import styles from '../styles/Home.module.css'
import heroMinaLogo from '../../public/assets/hero-mina-logo.svg'
import arrowRightSmall from '../../public/assets/arrow-right-small.svg'
import ImageCard from '../components/ImageCard.js'

import Link from 'next/link'

export default function Home() {
  useEffect(() => {
    ;(async () => {
      const { Mina, PublicKey } = await import('o1js')
      // const { Add } = await import('../../../contracts/build/src/')

      // Update this to use the address (public key) for your zkApp account.
      // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
      // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
      const zkAppAddress = ''
      // This should be removed once the zkAppAddress is updated.
      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA',
        )
      }
      //const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Link
        href={'/draw'}
        className="flex-none text-right m-2   hover:text-black rounded-sm  active:bg-white active:shadow-lg transition duration-250 ease-in-out"
      >
        Draw
      </Link>
      {/* <ImageCard /> */}
      {/* <DrawWithBackgroundImage /> */}
    </>
  )
}
