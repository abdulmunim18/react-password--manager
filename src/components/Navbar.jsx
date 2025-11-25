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
        <ul>
            <li className='flex gap-10 p-2'>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/login">Login</a>
            </li>
        </ul>
        </div>

    </nav>
  )
}

export default Navbar