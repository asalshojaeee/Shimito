// components/Brands.tsx
import React, { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'
// import api from '../api.js'
import { Link } from 'react-router'
import axios from 'axios'
// import { supabase } from '../data/supabaseClient'
type Brand = {
  id: number
  name: string
  desc: string
  img: string
}



const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([])

  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     const { data, error } = await supabase
  //       .from('companies')
  //       .select('id , name , desc , img')
  //     if (error) console.log(error)
  //     else {
  //       setBrands(data ?? [])
  //     }
  //   }

  //   fetchBrands()
  // }, [])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/companies/')
        console.log('Data:',response.data)
        setBrands(response.data)
      } catch (error) {
        console.error("Error:", error)
      }
    }
    fetchBrands()
  },[])
  return (
    <section
      dir='rtl'
      id='brands'
      className='mx-auto w-full py-8 md:py-14 text-white'
    >
      <SectionTitle className='mb-10'>برند ها</SectionTitle>

      <div className='relative w-full overflow-x-hidden flex justify-center'>
        <div className='flex flex-row overflow-x-auto overflow-y-hidden gap-1 md:gap-0 scrollbar-none '>
          {brands.map((b, i) => {
            const middleIndex = Math.floor(brands.length / 2)
            const isMiddle = i === middleIndex
            const zIndex = isMiddle ? 20 : 10

            return (
              <Link
                to={`/companies/${b.id}`}
                key={b.id}
                style={{ zIndex }}
                className='flex-shrink-0 w-36 sm:w-44 md:w-64 h-52 md:h-72 flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-4 md:p-6 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]'
              >
                <div className='absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none rounded-2xl' />

                <div className='z-10 flex flex-col items-center text-center gap-2 h-full justify-between'>
                  <div className='flex items-center justify-center h-20 md:h-28 w-full'>
                    <img
                      src={b.img}
                      alt={b.name}
                      className='max-w-[5rem] md:max-w-32 max-h-full object-contain'
                      loading='lazy'
                    />
                  </div>

                  <h3 className='text-sm md:text-xl font-extrabold tracking-wide'>
                    {b.name}
                  </h3>

                  <p className='text-xs md:text-sm text-white/80 max-w-[18ch] md:max-w-[28ch]'>
                    {b.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Brands
