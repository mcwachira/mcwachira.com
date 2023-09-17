import Footer from '@/components/Footer'
import Navbar from '@/components/Header/Navbar'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  
    <ThemeProvider attribute="class">
      <Navbar/>
  <Component {...pageProps} />
  <Footer/>
  
  </ThemeProvider>
  )
}


// import Footer from '@/components/Footer/Footer'
// import NavbarTwo from '@/components/Header/NavbarTwo'
// import '../styles/globals.css'
// import { ThemeProvider } from 'next-themes'
// import Navbar from '@/components/Header/Navbar'

// export default function App({ Component, pageProps }) {
//   return( 

//     <>
//         <ThemeProvider attribute="class">
//         <NavbarTwo/>
//         <Component {...pageProps} />
//     <Footer/>
//     </ThemeProvider>

// </>
//     )
   
// }