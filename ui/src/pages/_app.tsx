import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContext from '../components/appContext'
import { useState } from 'react'
import './reactCOIServiceWorker'

export default function App({ Component, pageProps }: AppProps) {
  const [imageContext, setImageContext] = useState(null)

  return (
    <AppContext.Provider value={{ imageContext, setImageContext }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
