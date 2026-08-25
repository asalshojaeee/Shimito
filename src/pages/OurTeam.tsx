// src/pages/OurTeam.tsx
import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'
import { supabase } from '../data/supabaseClient'
import Loader from '../components/Loader'
type Member = {
  id: number
  name: string
  img?: string
  aboutPerson?: string
  skillDescs?: string[]
  desc?: string
}

type Company = {
  id: number
  name: string
  img?: string
  desc?: string
  specialty?: string
  foundationYear?: string
  contactNumber?: string
  registrationNumber?: string
  address?: string
  nationalId?: string
  resume?: string
  services?: string[]
}

type Tab = 'people' | 'companies'

const OurTeam: React.FC = () => {
  const [tab, setTab] = useState<Tab>('people')
  const [members, setMembers] = useState<Member[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: peopleData, error: peopleError } = await supabase
        .from('people')
        .select('id, name, img, aboutPerson, skillDescs, desc')

      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select('*')

      if (peopleError) console.log(peopleError)
      else setMembers(peopleData ?? [])

      if (companiesError) console.log(companiesError)
      else setCompanies(companiesData ?? [])

      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const base = tab === 'people' ? members : []
    if (!needle) return base
    return base.filter((m) =>
      m.name.toLowerCase().includes(needle)
    )
  }, [q, tab, members])

  if(loading) return <Loader/>

  return (
    <>
      <section
        dir='rtl'
        className='relative mt-36 mx-auto w-full max-w-[90vw] md:max-w-[70vw] py-12 text-white'
      >
        {/* Selector card */}
        <div className='mx-auto mb-8 rounded-[28px] md:border border-white/10 md:bg-white/5 md:backdrop-blur-xl md:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]'>
          <div className='flex flex-col-reverse md:flex-row justify-start items-center gap-6'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setTab('people')}
                className={`flex flex-col min-w-[160px] items-center justify-center gap-5 rounded-[24px] border px-6 py-4 text-lg font-bold transition
                ${
                  tab === 'people'
                    ? 'border-white/30 bg-white/15'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className=''>
                  <svg
                    className='w-14 h-14 md:w-20 md:h-20'
                    viewBox='0 0 81 83'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M29.6965 34.692C39.0685 34.692 46.666 26.9259 46.666 17.346C46.666 7.76606 39.0685 0 29.6965 0C20.3246 0 12.7271 7.76606 12.7271 17.346C12.7271 26.9259 20.3246 34.692 29.6965 34.692Z'
                      fill='white'
                    />
                    <path
                      d='M29.6965 82.3978C46.0974 82.3978 59.393 74.6317 59.393 65.0518C59.393 55.4719 46.0974 47.7058 29.6965 47.7058C13.2956 47.7058 0 55.4719 0 65.0518C0 74.6317 13.2956 82.3978 29.6965 82.3978Z'
                      fill='white'
                    />
                    <path
                      d='M80.5991 65.0496C80.5991 72.2344 71.9637 78.0587 61.4202 78.0587C64.5265 74.5882 66.6625 70.2318 66.6625 65.0553C66.6625 59.8732 64.5214 55.5128 61.4092 52.0402C71.9527 52.0402 80.5991 57.8645 80.5991 65.0496Z'
                      fill='white'
                    />
                    <path
                      d='M67.872 17.3491C67.872 24.5341 62.174 30.3586 55.1449 30.3586C53.6121 30.3586 52.143 30.0816 50.782 29.574C52.7891 25.9657 53.9354 21.7918 53.9354 17.3443C53.9354 12.9 52.7908 8.72904 50.7863 5.12251C52.146 4.61596 53.6138 4.3396 55.1449 4.3396C62.174 4.3396 67.872 10.1642 67.872 17.3491Z'
                      fill='white'
                    />
                  </svg>
                </span>
                <span className='text-2xl md:text-3xl'>افراد</span>
              </button>

              <button
                onClick={() => setTab('companies')}
                className={`flex flex-col min-w-[160px] items-center justify-center gap-5 rounded-[24px] border px-6 py-4 text-lg font-bold transition
                ${
                  tab === 'companies'
                    ? 'border-white/30 bg-white/15'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className=''>
                  {/* home/office icon */}
                  <svg
                    className='w-14 h-14 md:w-20 md:h-20'
                    viewBox='0 0 80 80'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M2.0768 23.291C2.38419e-07 27.0851 0 31.662 0 40.8156V46.9C0 62.5032 4.76837e-07 70.3052 4.68628 75.1524C9.3726 80 16.915 80 32 80H48C63.0848 80 70.6276 80 75.3136 75.1524C80 70.3052 80 62.5032 80 46.9V40.8156C80 31.662 80 27.0851 77.9232 23.291C75.8464 19.4968 72.0524 17.142 64.464 12.4325L56.464 7.46748C48.4424 2.48916 44.4316 0 40 0C35.5684 0 31.5576 2.48916 23.5361 7.46748L15.5361 12.4325C7.9478 17.142 4.1536 19.4968 2.0768 23.291ZM37 64C37 65.6568 38.3432 67 40 67C41.6568 67 43 65.6568 43 64V52C43 50.3432 41.6568 49 40 49C38.3432 49 37 50.3432 37 52V64Z'
                      fill='white'
                    />
                  </svg>
                </span>
                <span className='text-2xl md:text-3xl'>شرکت‌ها</span>
              </button>
            </div>
            <p className='text-base w-72 md:w-full md:text-right  text-center md:text-2xl font-bold leading-relaxed text-white/95'>
              برای دیدن افراد یا شرکت‌ها گزینه مورد نظر خود را انتخاب کنید.
            </p>
          </div>
        </div>

        <div className='w-full flex justify-start items-start mb-4'>
          {/* search & filter */}
          <div className='flex flex-col-reverse md:flex-row-reverse items-center gap-3 md:justify-end w-full'>
            <button className='rounded-[14px] self-start border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-md hover:bg-white/15'>
              فیلتر ها
            </button>
            <div className='relative w-full md:w-auto'>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='...جستجو کنید'
                className='w-full md:w-[270px] rounded-[14px] border border-white/15 bg-white/10 px-10 py-2 text-sm outline-none placeholder:text-white/60 backdrop-blur-md focus:border-white/30'
              />
              <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-80'>
                <svg viewBox='0 0 24 24' className='h-5 w-5'>
                  <path
                    d='m21 21-4.5-4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    fill='none'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className='space-y-5'>
          {tab === 'companies' &&
            companies.map((company:Company, index:number) => {
              return (
                <div
                  key={company.id}
                  className='relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]'
                >
                  <Card
                    id={company.id}
                    key={index}
                    name={company.name}
                    img={company.img || ''}
                    desciption={company.desc}
                    tags={[]}
                    link={`/companies/${company.id}`}
                  />
                </div>
              )
            })}

          {tab === 'people' &&
            filtered.map((m) => {
              const tags = (m.desc || '')
                .split(/[،,]/)
                .map((t) => t.trim())
                .filter(Boolean)
              return (
                <div
                  key={m.id}
                  className='relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]'
                >
                  <Card
                    id={m.id}
                    name={m.name || ''}
                    img={m.img || ''}
                    tags={tags || []}
                    link={`/our-team/${m.id}`}
                    desciption=' آن‌چه لازم است، و برای شرایط فعلی فناوری مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.'
                  />
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}

export default OurTeam
