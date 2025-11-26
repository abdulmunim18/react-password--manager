import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white '>
      <div className="my-container flex justify-between h-12 items-center py-5">
        <div className="logo font-bold p-2 text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>Mang / &gt;</span>
          
          </div>
       
        <button className='text-white bg-green-500 rounded-full my-8 flex justify-center items-center p-2 hover:bg-green-600 ring-1 ring-white'> 
          <img className='invert w-8 p-1 px-2' src="/icons/github.svg" alt="" />
          <span className='font-bold px-2'>Github</span>
        </button>
        </div>

    </nav>
  )
}

export default Navbar