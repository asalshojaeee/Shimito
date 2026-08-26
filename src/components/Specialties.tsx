// components/Specialties.tsx
import React from 'react'
import SectionTitle2 from './SectionTitle'

type Spec = { title: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }

// const IconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/90'>
//     {children}
//   </div>
// )

/* simple inline SVGs to avoid extra deps */
const IconMech = () => (
  <img src="Vector (1).png" alt="" />
)
const IconElec = () => (
  <img src='dumbbell-small-svgrepo-com 1 (1).png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)
const IconManage = () => (
  <img src='laptop-minimalistic-svgrepo-com 1.png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)
const IconGym = () => (
  <img src='delivery-svgrepo-com 1 (1).png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)
const IconSoftware = () => (
  <img src='delivery-svgrepo-com 1 (1).png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)
const IconAI = () => (
  <img src='Vector (2).png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)
const IconInvestment = () => (
  <img src='Vector.png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)


const IconCube = () => (
  <img src="Frame 71.png" alt="" />
)
const Halal = () => (
  <img src='medal-ribbon-star-svgrepo-com 1.png' className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' />
)


const Asid = () => (
  <img src="hand-money-svgrepo-com 1.png" alt="" />
)
const specialties: Spec[] = [
  { title: 'مواد معدنی', Icon: IconGym },

  { title: 'تجهیزات آزمایشگاهی و ایمنی ', Icon: IconSoftware },
  { title: 'اکسید ها', Icon: IconCube },


    { title: 'کربنات ها', Icon: IconMech },

  { title: 'هیدروکسید ها', Icon: IconElec },

  { title: 'رزین ها', Icon: IconManage },

    { title: 'مواد آلی', Icon: IconInvestment },



  { title: ' سولفات ها', Icon: IconAI },

  { title: 'اسید ها', Icon: Asid },

  { title: 'حلال ها', Icon: Halal },
]

const Specialties: React.FC = () => {
  return (
    <section
      dir='rtl'
      id='specialties'
      className='mx-auto w-full pt-6  md:pt-10 md:pb-10 text-white'
    >
      <SectionTitle2 className='mb-8'>تخصص ها</SectionTitle2>

      {/* exactly 8 cards */}
      <div className='grid grid-cols-3 gap-4 md:grid-cols-6'>
        {specialties.map(({ title, Icon }) => (
          <div
            key={title}
            className='h-auto rounded-xl md:rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-center backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]
            flex flex-col justify-center items-center gap-4'
          >
            <Icon />
            {title != '' && (
              <div className='font-bold text-white/90 text-sm md:text-xl'>
                {title}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Specialties
