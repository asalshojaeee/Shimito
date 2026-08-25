import type React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const Layout: React.FC = () => {
  return (
    <main className='min-h-screen h-full text-white bg-gradient-to-br from-[#000105] via-[#50006B] to-[#A855F7]'>
      <div className='relative flex flex-col items-center'>
        <Navbar />
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
