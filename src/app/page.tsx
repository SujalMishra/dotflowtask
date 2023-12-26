
import Navbar from './components/Navbar.js'
import SearchBar from './components/Searchbar.js'
import Footer from './components/Footer.js'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
  }, [])
  return (
    <>
     <Navbar />
     <SearchBar/>
     <Footer/>
    </>
  )
}
