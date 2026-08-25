import React from 'react'
import SliderinHero from './SliderinHero'

type StatProps = {
  number: string | number
  label: string
}

const Stat: React.FC<StatProps> = ({ number, label }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <span className='text-4xl font-extrabold tracking-tight sm:text-6xl'>
        {number}
      </span>
      <span className='text-white text-[20px] md:text-[32px] font-bold'>{label}</span>
    </div>
  )
}

const Hero: React.FC = () => {
  return (
    <section className='relative min-h-[100vh] w-full overflow-hidden bg-neutral-950 text-white flex justify-center items-center'>
      <div className='absolute inset-0'>
        <img
          src='/hero-background-image.webp'
          alt='پس‌زمینه قهرمان'
          className='h-full w-full object-cover'
          fetchPriority='high'
          loading='eager'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80' />
        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]' />
      </div>

      <div className='relative hidden md:flex grid w-full max-w-[95vw] md:max-w-[85vw] grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-16 md:mt-0'>

        {/* Right */}
        <div className='order-2 md:order-2 w-full px-4 md:px-0'>
          <SliderinHero/>
         <div className='flex flex-col justify-center items-center gap-4 mt-8 rounded-2xl'>
        <div className='flex flex-wrap gap-x-8 gap-y-4 text-white/90'>
          <Stat number='+200' label='پروژه' />
          <Stat number='+45' label='متخصص' />
          <Stat number='+11' label='سال' />
        </div>
        <p className='max-w-[64ch] text-sm text-center text-white/80'>
         سطر آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز
و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </p>
      </div>
        </div>

        {/* Left */}
        <div className='order-1 md:order-1 flex items-center justify-center md:justify-end w-full px-4 md:px-0'>
          <div className='w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6 md:p-10 backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center md:items-end gap-6 md:gap-8'>
            <h1 className='w-full flex flex-col justify-start items-center md:items-end text-2xl sm:text-3xl md:text-5xl leading-tight tracking-tight gap-2 md:gap-3'>
              <span>آشنایی با تیم</span>
              <span className='w-full text-3xl md:text-6xl text-center font-black'>
                متخصص ما
              </span>
            </h1>

            <p className='text-xs md:text-sm w-full text-center md:text-right text-white/85'>
              هیئت تحول صنعتی با تکیه بر دانش، تخصص و شبکه بزرگی از صنعتگران،
              فعالین اقتصادی و نوآوری با رویکرد هم افزایی و همکاری بین اعضا در
              مشهد مشغول به کار شده است. این گروه که از همکاری جمعی از
              کارآفرینان استان خراسان رضوی تشکیل شده است، با هدف ارتقا سطح
              اقتصاد، تجارت و نوآوری استان ایجاد شده است. در این هیئت تجاری،
              توانمندی ها ، تخصص ها و ظرفیت های مختلفی در حوزه های فناوری، هوش
              مصنوعی، مدیریت، ساختمان، الکترونیک، کارآفرینی و غیره وجود دارد که
              میتواند در جهت رشد اقتصادی استان نقش چشم گیری را ایفا کند
            </p>

            <div className='mt-4 md:mt-6 w-full flex flex-col items-center md:items-end'>
              <a
                href='#more'
                className='w-full md:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm md:text-base text-white shadow-inner transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                موارد بیشتر
              </a>
            </div>
          </div>
        </div>

      </div>

       <div className='relative flex md:hidden grid w-full max-w-[95vw] md:max-w-[85vw] grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-16 md:mt-0'>

        {/* Right */}
        <div className='order-2 md:order-2 flex flex-col gap-4 justify-center items-center md:items-start w-full px-4 md:px-0'>
          <SliderinHero/>
          
        </div>

        {/* Left */}
        <div className='order-1 md:order-1 flex items-center justify-center md:justify-end w-full px-4 md:px-0'>
          <div className='w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6  backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center md:items-end gap-6 md:gap-8'>
            <h1 className='w-full flex flex-col justify-start items-end text-xl leading-tight tracking-tight gap-2 md:gap-3'>
              <span>آشنایی با تیم</span>
              <span className='w-full text-3xl text-end font-black'>
                متخصص ما
              </span>
            </h1>

            <p className='text-xs md:text-sm w-full text-right text-white/85'>
              هیئت تحول صنعتی با تکیه بر دانش، تخصص و شبکه بزرگی از صنعتگران،
              فعالین اقتصادی و نوآوری با رویکرد هم افزایی و همکاری بین اعضا در
              مشهد مشغول به کار شده است. این گروه که از همکاری جمعی از
              کارآفرینان استان خراسان رضوی تشکیل شده است، با هدف ارتقا سطح
              اقتصاد، تجارت و نوآوری استان ایجاد شده است. در این هیئت تجاری،
              توانمندی ها ، تخصص ها و ظرفیت های مختلفی در حوزه های فناوری، هوش
              مصنوعی، مدیریت، ساختمان، الکترونیک، کارآفرینی و غیره وجود دارد که
              میتواند در جهت رشد اقتصادی استان نقش چشم گیری را ایفا کند
            </p>

            <div className='flex flex-col justify-center items-center gap-4'>
              <div className='flex flex-wrap  gap-x-8 gap-y-6 text-white/90'>
                <Stat number='+200' label='پروژه' />
                <Stat number='+45' label='متخصص' />
                <Stat number='+11' label='سال' />
              </div>
             </div>
            <div className='mt-4 md:mt-6 w-full flex flex-col items-center md:items-end'>
              <a
                href='#more'
                className='w-full  inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm md:text-base text-white shadow-inner transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                موارد بیشتر
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className='pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent md:inset-x-10' />
    </section>
  )
}

export default Hero
