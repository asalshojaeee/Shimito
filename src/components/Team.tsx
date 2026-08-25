// components/Team.tsx
import { useEffect, useState } from 'react'
import SectionTitle from './SectionTitle'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { IoArrowBackOutline } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../data/supabaseClient'

interface Member {
  id: number
  name: string
  img: string
  skillDescs: string[]

  desc: string
}

const AvatarCircle = ({ name, src }: { name: string; src?: string }) => (
  <div className='relative mx-auto h-24 w-24'>
    <div className='absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,198,55,0.9),rgba(255,198,55,0.55)_35%,transparent_70%)] blur-[1px]' />
    {src && (
      <img
        src={src}
        alt={name}
        className='h-24 w-24 rounded-full object-cover ring-4 ring-white/10 mx-auto'
        loading='lazy'
      />
    )}
  </div>
)

const VISIBLE_CARDS = 8

const Team = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [members, setMembers] = useState<Member[]>([])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('people')
        .select('id, name, img, aboutPerson, skillDescs, desc')
      if (error) console.log(error)
      else setMembers(data ?? [])
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % members.length)
  }

  const visibleMembers = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const index = (startIndex + i) % members.length
    return members[index]
  })

  const isMobile = !isDesktop
  const mobileMembers = isMobile
    ? members.slice(startIndex, startIndex + VISIBLE_CARDS)
    : visibleMembers

  return (
    <section
      dir='rtl'
      id='team'
      className='relative w-full pt-8 md:py-12 text-white mx-auto overflow-hidden'
    >
      <SectionTitle className='mb-8'>اعضاء ما</SectionTitle>

      <motion.div className='flex flex-nowrap gap-5 md:gap-5 overflow-x-auto md:overflow-x-visible scrollbar-none px-4 md:px-0'>
        <AnimatePresence>
          {mobileMembers
            .filter(Boolean) // remove undefined
            .map((m, i) => (
              <motion.a
                href={`/our-team/${m.id}`}
                key={m.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isDesktop && i >= VISIBLE_CARDS - 3 ? 0.4 : 1,
                  y: 0,
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className='relative cursor-pointer flex-shrink-0 w-44 md:w-56 h-46 md:h-64 flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md shadow-[0_5px_20px_-10px_rgba(0,0,0,0.4)]'
              >
                <AvatarCircle name={m.name} src={m.img} />
                <h3 className='mt-4 text-lg font-extrabold'>{m.name}</h3>
                <p className='mt-1 text-sm text-white/80'>{m.desc}</p>
              </motion.a>
            ))}
        </AnimatePresence>
      </motion.div>

      <div className='mt-6 md:hidden w-full px-4'>
        <button
          onClick={handleNext}
          className='w-full px-5 py-3 text-white  rounded-3xl border border-white/20 bg-white/20 shadow-inner hover:bg-white/20 transition'
        >
          اعضای بیشتر <IoArrowBackOutline className='inline-block ml-2' />
        </button>
      </div>

      <button
        onClick={handleNext}
        className='hidden md:block md:absolute md:left-[10.5rem] md:bottom-[9rem] text-[2rem] font-extrabold text-white/90 drop-shadow-[0_0_17px_white] hover:text-white hover:drop-shadow-[0_0_16px_white] transition-all duration-300'
      >
        <span className='flex items-center gap-3'>
          اعضای بیشتر <BsFillArrowLeftCircleFill />
        </span>
      </button>
    </section>
  )
}

export default Team
