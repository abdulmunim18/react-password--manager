import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/main'
function App() {
  return (
    <>

    <Navbar/>
    <div className=' bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
    <Main/>
    </div>
    <Footer/>
    </>
  )
}

export default App
