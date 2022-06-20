import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextProvider } from '../contexts/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
  
  // return <Component {...pageProps} />
}

export default MyApp
