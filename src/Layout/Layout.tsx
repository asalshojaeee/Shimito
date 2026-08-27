import type React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Layout: React.FC = () => {
  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-[#000105] via-[#50006B] to-[#A855F7]">
      <div className="flex min-h-screen flex-col items-center">

        <Navbar />

        <main className="w-full flex-1">
          <Outlet />
        </main>

        <Footer />

      </div>
    </main>
  )
}

export default Layout