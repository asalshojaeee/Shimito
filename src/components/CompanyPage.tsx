import { useEffect, useState, type JSX } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../data/supabaseClient'
import Loader from './Loader'

type Company = {
  id: string
  name: string
  aboutCo: string
  services: string[] | null
  img?: string
  address: string
  contactNumber: string
  foundationYear: string
  desc: string
  certificates: { url: string; path: string }[] // یا string[] اگر فقط string داری
  portfolios?: { url: string; path: string }[]
  video: string
}

const CompanyPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [companyProjects, setCompanyProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchCompany = async () => {
      setLoading(true)
      const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.log(error)
        return
      }

      setCompany({
        ...company,
        services: Array.isArray(company.services) ? company.services : [],
      })

      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(
          `
        id,
        title,
        project_media(file_url, file_path, caption, order)
      `
        )
        .eq('owner_type', 'company')
        .eq('owner_id', company.id) // ✅ فقط person.id

      if (projectsError) console.log(projectsError)
      else setCompanyProjects(projects || [])

      setLoading(false)
    }

    fetchCompany()
  }, [id])

  const profileDetails = [
    { label: 'حوزه تخصص:', value: company?.desc },
    { label: 'سال تاسیس:', value: company?.foundationYear },
    { label: 'شماره تماس:', value: company?.contactNumber },
    { label: 'آدرس:', value: company?.address },
  ]

  if (loading) return <Loader />

  if (!company?.aboutCo) {
    return (
      <p className='text-white text-center mt-44'>...درحال تکمیل اطلاعات</p>
    )
  }

  return (
    <section className='relative mt-44 w-full max-w-[90vw] md:max-w-[70vw] mx-auto'>
      <div className='flex flex-col py-2 items-center gap-8 lg:hidden '>
        {/* 1) عکس + اسم + ایمیل */}
        <div className='flex flex-col items-center gap-4'>
          <div className='w-[160px] h-[160px] rounded-3xl overflow-hidden'>
            <img
              src={company.img}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>

          <h1 className='text-white font-bold text-2xl'>{company.name}</h1>
          <p className='text-white font-sans text-base break-all'>
            {/* {company.email} */}
          </p>
        </div>

        {/* 2) باکس اطلاعات */}
        <div
          className='w-full bg-[#ffffff1a] backdrop-blur-md rounded-3xl p-6 space-y-4'
          dir='rtl'
        >
          {profileDetails.map((detail, index) => (
            <div
              key={index}
              className='flex justify-between items-center text-white border-b-[1px] border-white/30 pb-4'
            >
              <span className='text-sm font-medium '>{detail.label}</span>
              <span
                className={`text-xs font-medium ${
                  detail.label === 'ایمیل' ? 'font-sans' : '[direction:rtl]'
                }`}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        <h2 className='text-right font-semibold text-white text-2xl [direction:rtl]'>
          درباره شرکت
        </h2>
        <div className='w-full bg-[#ffffff1a] backdrop-blur-md rounded-3xl p-6 space-y-4'>
          <p className='text-right text-white leading-7 [direction:rtl]'>
            {company.aboutCo}
          </p>
        </div>

        {company.video && (
          <div className='w-full flex h-44 md:h-58 justify-center mt-2'>
            <video
              className='w-full max-w-lg h-auto rounded-lg'
              controls
              src={company.video}
            />
          </div>
        )}

        {company.certificates?.length > 0 && (
          <div className='space-y-6'>
            <h2 className='text-center font-bold text-white text-xl [direction:rtl]'>
              گواهینامه‌ها
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
              {company.certificates.map((cert, index) => (
                <div
                  key={index}
                  className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                >
                  {/* تصویر */}
                  <img
                    src={cert.url}
                    alt={`certificate-${index}`}
                    className='w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300'
                  />

                  {/* Overlay */}
                  <div
                    className='absolute inset-0 bg-black/40 opacity-0
            group-hover:opacity-100 transition-opacity duration-300'
                  />

                  {/* Label */}
                  <div
                    className='absolute bottom-4 right-4 left-4 text-white
            opacity-0 group-hover:opacity-100 transition-all duration-300'
                  >
                    <p className='text-sm font-semibold'>
                      گواهینامه {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {company.portfolios && company.portfolios.length > 0 && (
          <div className='space-y-6'>
            <h2 className='text-center font-bold text-white text-xl [direction:rtl]'>
              نمونه کار ها
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
              {(company.portfolios || []).map(
                (cert: { url: string; path: string }, index: number) => (
                  <div
                    key={index}
                    className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                  >
                    {/* تصویر */}
                    <img
                      src={cert.url}
                      alt={`certificate-${index}`}
                      className='w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300'
                    />

                    {/* Overlay */}
                    <div
                      className='absolute inset-0 bg-black/40 opacity-0
            group-hover:opacity-100 transition-opacity duration-300'
                    />

                    {/* Label */}
                    <div
                      className='absolute bottom-4 right-4 left-4 text-white
            opacity-0 group-hover:opacity-100 transition-all duration-300'
                    >
                      <p className='text-sm font-semibold'>
                        نمونه کار {index + 1}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {companyProjects.length > 0 && (
          <div className='space-y-6 my-2 w-full'>
            <h2 className='text-center font-bold text-white text-2xl [direction:rtl]'>
              پروژه‌های من
            </h2>

            <div
              className='flex flex-col overflow-x-auto overflow-y-hidden'
              dir='rtl'
            >
              {companyProjects.map((project, index) => (
                <div
                  key={index}
                  className='bg-white/10 rounded-3xl p-2 backdrop-blur-md border border-white/20 shadow-lg w-full'
                >
                  <h3 className='text-white text-lg font-semibold mb-2'>
                    {project.title}
                  </h3>
                  <div className='flex gap-2 overflow-x-auto overflow-y-hidden'>
                    {project.project_media?.map((file: any, idx: number) => (
                      <div
                        key={idx}
                        className='flex flex-col items-center min-w-[120px]'
                      >
                        <img
                          src={file.file_url}
                          alt={`project-${idx}`}
                          className='w-20 h-20 object-cover rounded'
                        />
                        <p className='text-xs mt-1 text-white text-center'>
                          {file.caption.length > 20
                            ? file.caption.slice(0, 20) + '...'
                            : file.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='bg-[#ffffff1a] hidden md:block rounded-[80px] backdrop-blur-[2px] backdrop-brightness-[110%] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] border-0 overflow-visible'>
        <div className='p-0 relative min-h-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto]'>
            {/* Left Content */}
            <div className='bg-[#ffffff1a] order-2 md:order-1 rounded-[80px] p-8  relative space-y-8'>
              <div className='space-y-6'>
                <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                  درباره شرکت
                </h2>
                <p className='text-right leading-9 text-white text-base md:text-2xl'>
                  {company.aboutCo}
                </p>
              </div>

              <div className='h-[1px] w-full bg-white rounded' />

              <div className='space-y-6'>
                {/* <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                  خدمات
                </h2> */}
                {(company.services?.length ?? 0) > 0 ? (
                  <>
                    <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                      خدمات
                    </h2>
                    <ul className='list-disc pr-5 text-white' dir='rtl'>
                      {company.services!.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              {company.video && (
                <div className='w-full flex h-44 md:h-58 justify-center mt-2'>
                  <video
                    className='w-full max-w-lg h-auto rounded-lg'
                    controls
                    src={company.video}
                  />
                </div>
              )}

              {company.certificates?.length > 0 && (
                <div className='space-y-6'>
                  <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                    گواهینامه‌ها
                  </h2>

                  <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
                    {company.certificates.map((cert, index) => (
                      <div
                        key={index}
                        className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                      >
                        {/* تصویر */}
                        <img
                          src={cert.url}
                          alt={`certificate-${index}`}
                          className='w-28 h-28 object-cover group-hover:scale-105 transition-transform duration-300'
                        />

                        {/* Overlay */}
                        <div
                          className='absolute inset-0 bg-black/40 opacity-0
            group-hover:opacity-100 transition-opacity duration-300'
                        />

                        {/* Label */}
                        <div
                          className='absolute bottom-4 right-4 left-4 text-white
            opacity-0 group-hover:opacity-100 transition-all duration-300'
                        >
                          <p className='text-sm font-semibold'>
                            گواهینامه {index + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {company.portfolios && company.portfolios?.length > 0 && (
                <div className='space-y-6'>
                  <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                    نمونه کار ها
                  </h2>

                  <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
                    {company.portfolios.map((cert, index) => (
                      <div
                        key={index}
                        className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                      >
                        {/* تصویر */}
                        <img
                          src={cert.url}
                          alt={`certificate-${index}`}
                          className='w-28 h-28 object-cover group-hover:scale-105 transition-transform duration-300'
                        />

                        {/* Overlay */}
                        <div
                          className='absolute inset-0 bg-black/40 opacity-0
            group-hover:opacity-100 transition-opacity duration-300'
                        />

                        {/* Label */}
                        <div
                          className='absolute bottom-4 right-4 left-4 text-white
            opacity-0 group-hover:opacity-100 transition-all duration-300'
                        >
                          <p className='text-sm font-semibold'>
                            نمونه کار {index + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {companyProjects.length > 0 && (
                <div className='space-y-6'>
                  <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                    پروژه‌های من
                  </h2>

                  <div
                    className='flex flex-col gap-4 overflow-x-auto overflow-y-hidden'
                    dir='rtl'
                  >
                    {companyProjects.map((project, index) => (
                      <div
                        key={index}
                        className='bg-white/10 rounded-3xl p-4 backdrop-blur-md border border-white/20 shadow-lg '
                      >
                        <h3 className='text-white font-semibold mb-2'>
                          {project.title}
                        </h3>
                        <div className='flex gap-4 overflow-x-auto overflow-y-hidden'>
                          {project.project_media?.map(
                            (file: any, idx: number) => (
                              <div
                                key={idx}
                                className='flex flex-col items-center min-w-[120px]'
                              >
                                <img
                                  src={file.file_url}
                                  alt={`project-${idx}`}
                                  className='w-24 h-24 object-cover rounded'
                                />
                                <p className='text-xs mt-1 text-white text-center'>
                                  {file.caption.length > 20
                                    ? file.caption.slice(0, 20) + '...'
                                    : file.caption}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className='flex order-1 md:order-2 flex-col p-8 items-center md:items-end gap-8 lg:min-w-[348px]'>
              <div className='w-[220px] h-[220px] bg-[#ffffff1a] rounded-[48px] border-[0.5px] border-solid border-[#5f7778] shadow-[0px_0px_100px_#ffffff40,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] backdrop-blur-[2px] backdrop-brightness-[110%] overflow-hidden flex items-center justify-center p-6'>
                <div className='w-[180px] h-[180px] bg-[#d9d9d9] rounded-[28px] overflow-hidden relative flex items-center justify-center'>
                  <img
                    src={company.img}
                    alt='Profile'
                    className='w-full h-full object-cover object-center'
                    loading='lazy'
                  />
                </div>
              </div>

              <h1 className='text-center font-bold text-white text-[22px] md:text-[32px] whitespace-nowrap [direction:rtl]'>
                {company.name}
              </h1>
              <div className='flex flex-col w-full max-w-[284px] gap-4 text-xs md:text-base'>
                {profileDetails.map((detail, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center w-full'
                    dir='rtl'
                  >
                    <div className='font-medium text-white text-sm md:text-base'>
                      {detail.label}
                    </div>

                    <div
                      className={`font-medium text-white text-base  ${
                        detail.label === 'ایمیل' ? 'font-sans' : ''
                      }`}
                    >
                      {detail.value && detail.value.trim() !== ''
                        ? detail.value
                        : '...'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyPage
