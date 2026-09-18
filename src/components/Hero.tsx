import React from 'react'
// import SliderinHero from './SliderinHero'

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

      <span className='text-white text-[20px] md:text-[32px] font-thin'>
        {label}
      </span>

    </div>
  )
}

const Hero: React.FC = () => {
  return (
<section className='relative min-h-[100vh] w-full overflow-hidden text-white flex justify-center py-24'>

      <div className='absolute inset-0'>
        <img
          src='/image 3.png'
          alt=''
          className='h-full w-full object-cover'
          fetchPriority='high'
          loading='eager'
        />

        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80' />

        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]' />
      </div>


<div className='relative hidden md:grid w-full max-w-[85vw] grid-cols-2 gap-5 lg:gap-24 my-16'>          <div className='col-start-2 row-start-1 flex items-center justify-center w-full'>

          <div className='w-full max-w-xl rounded-[50px] bg-[#EF2CC51A] p-5 md:p-10 backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center md:items-end gap-6 md:gap-8'>

            <h1 className='w-full text-3xl flex flex-col items-center leading-tight tracking-tight gap-2'>

              <span className='font-normal text-center'>
                آشنایی با تیم
              </span>

              <span className='font-normal text-center -translate-x-20'>
                <span className='font-extrabold'>متخصص</span>
                <span className='font-normal'> ما</span>
              </span>

            </h1>

            <p className='text-xs md:text-sm w-full text-center md:text-right text-white/85'>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
              و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
              و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
              تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
              کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال
              و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
            </p>

            <div className='mt-4 md:mt-6 w-full flex justify-center md:justify-end'>

              <a
                href='#more'
                className='w-full md:w-auto inline-flex items-center justify-center rounded-xl border border-[#A855F766] bg-[#A855F71A] px-5 py-2.5 text-sm md:text-base text-white shadow-inner transition focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                موارد بیشتر
              </a>

            </div>

          </div>

        </div>

        <div className='col-start-1 row-start-1 flex flex-col items-center justify-center w-full'>

          <div className='flex flex-col justify-center items-center gap-4 mt-8'>

            <div className='flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/90'>

              <Stat
                number='+200'
                label='پروژه'
              />

              <Stat
                number='+45'
                label='متخصص'
              />

              <Stat
                number='+11'
                label='سال'
              />

            </div>

            <p className='max-w-[64ch] text-sm text-center text-white/80'>
              سطر آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
            </p>

          </div>

        </div>

      </div>



      <div className='relative flex md:hidden flex-col w-full max-w-[95vw] gap-8 mt-16 px-4'>





        <div className='flex items-center justify-center w-full'>

          <div className='w-full rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center gap-6'>

            <h1 className='w-full flex flex-col items-end text-xl leading-tight tracking-tight gap-2'>

              <span>
                آشنایی با تیم
              </span>

              <span className='w-full text-3xl text-end font-black'>
                متخصص ما
              </span>

            </h1>


            <p className='text-xs w-full text-right text-white/85'>
              هیئت تحول صنعتی با تکیه بر دانش، تخصص و شبکه بزرگی از صنعتگران،
              فعالین اقتصادی و نوآوری با رویکرد هم افزایی و همکاری بین اعضا در
              مشهد مشغول به کار شده است. این گروه که از همکاری جمعی از
              کارآفرینان استان خراسان رضوی تشکیل شده است، با هدف ارتقا سطح
              اقتصاد، تجارت و نوآوری استان ایجاد شده است. در این هیئت تجاری،
              توانمندی ها، تخصص ها و ظرفیت های مختلفی در حوزه های فناوری، هوش
              مصنوعی، مدیریت، ساختمان، الکترونیک، کارآفرینی و غیره وجود دارد که
              میتواند در جهت رشد اقتصادی استان نقش چشم گیری را ایفا کند
            </p>



            <div className='flex flex-wrap justify-center gap-x-8 gap-y-6 text-white/90'>

              <Stat
                number='+200'
                label='پروژه'
              />

              <Stat
                number='+45'
                label='متخصص'
              />

              <Stat
                number='+11'
                label='سال'
              />

            </div>



            <div className='w-full'>

              <a
                href='#more'
                className='w-full inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white shadow-inner transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30'
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