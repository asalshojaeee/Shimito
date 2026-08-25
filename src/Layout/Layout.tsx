import type React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const Layout: React.FC = () => {
  return (
    <main className='min-h-screen h-full text-white bg-gradient-to-b from-[#020201] to-[#00646B]'>
      <div className='relative flex flex-col items-center'>
        <Navbar />
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
