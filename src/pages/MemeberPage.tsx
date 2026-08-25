import { useEffect, useState, type JSX } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../data/supabaseClient'
import Loader from '../components/Loader'

interface Member {
  id: string
  name: string
  img: string
  aboutPerson: string
  email: string
  education: string
  experience: string
  desc: string
  skillDescs: string
  certificates: { url: string; path: string }[]
  portfolios?: { url: string; path: string }[]
  video: string
}

const MemberPage = (): JSX.Element => {
  const { id } = useParams()
  const [member, setMember] = useState<Member | null>(null)
  const [memberProjects, setMemberProjects] = useState<any[]>([])
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemberAndProjects = async () => {
      // 1️⃣ گرفتن پروفایل فرد
      const { data: member } = await supabase
        .from('people')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (!member) return
      setMember(member)

      // 2️⃣ گرفتن پروژه‌های همون فرد (برای همه قابل مشاهده)
      const { data: projects, error } = await supabase
        .from('projects')
        .select(
          `
          id,
          title,
          owner_id,
          project_media(file_url, caption)
        `
        )
        .eq('owner_type', 'person')
        .eq('owner_id', member.id) // ✅ فقط person.id

      console.log(member.id)
      console.log(projects)

      if (!error) setMemberProjects(projects || [])
    }

    fetchMemberAndProjects()
  }, [id])

  if (!member) {
    return <Loader />
  }

  const profileDetails = [
    { label: 'تخصص:', value: member.desc },
    { label: 'سابقه کاری:', value: member.experience },
    { label: 'تحصیلات:', value: member.education },
    { label: 'ایمیل:', value: member.email },
  ]

  if (!member?.aboutPerson) {
    return (
      <p className='text-white text-center mt-44'>...درحال تکمیل اطلاعات</p>
    )
  }

  return (
    <section className='relative mt-24 md:mt-44 w-full max-w-[90vw] md:max-w-[70vw] mx-auto'>
      {/* --- MOBILE VERSION --- */}
      <div className='flex flex-col py-2 items-center gap-8 lg:hidden'>
        {/* 1) عکس + اسم + ایمیل */}
        <div className='flex flex-col items-center gap-4'>
          <div className='w-[160px] h-[160px] rounded-3xl overflow-hidden'>
            <img
              src={member.img}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>

          <h1 className='text-white font-bold text-2xl'>{member.name}</h1>
          <p className='text-white font-sans text-base break-all'>
            {member.email}
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

        {/* 3) باکس درباره من */}
        <h2 className='text-right font-semibold text-white text-2xl [direction:rtl]'>
          درباره من
        </h2>
        <div className='w-full bg-[#ffffff1a] backdrop-blur-md rounded-3xl p-6 space-y-4'>
          <p className='text-right text-white leading-7 [direction:rtl]'>
            {member.aboutPerson}
          </p>
        </div>

        <h2 className='text-center font-bold text-white text-2xl [direction:rtl]'>
          مهارت ها
        </h2>
        <div className='w-full bg-[#ffffff1a] backdrop-blur-md rounded-3xl p-6 space-y-4'>
          <p className='text-right text-white leading-7 [direction:rtl]'>
            {member.skillDescs}
          </p>
        </div>

        {member.video && (
          <div className='w-full flex h-44 md:h-58 justify-center mt-2'>
            <video
              className='w-full max-w-lg h-auto rounded-lg'
              controls
              src={member.video}
            />
          </div>
        )}

        {member.certificates?.length > 0 && (
          <div className='space-y-6'>
            <h2 className='text-center font-bold text-white text-2xl [direction:rtl]'>
              گواهینامه‌ها
            </h2>

            <div className='grid grid-cols-2 gap-8'>
              {member.certificates.map((cert, index) => (
                <div
                  key={index}
                  className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                >
                  {/* تصویر */}
                  <img
                    src={cert.url}
                    alt={`certificate-${index}`}
                    onClick={() => setActiveImage(cert.url)}
                    className='w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-300'
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

        {member.portfolios && member.portfolios.length > 0 && (
          <div className='space-y-6 w-full'>
            <h2 className=' text-center font-bold text-white text-2xl [direction:rtl]'>
              نمونه کار ها
            </h2>

            <div
              className='grid gap-4'
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              }}
            >
              {member.portfolios.map(
                (cert: { url: string; path: string }, index: number) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(cert.url)}
                    className='group relative aspect-square rounded-3xl overflow-hidden 
                       bg-white/10 backdrop-blur-md
                       border border-white/20 shadow-lg
                       cursor-pointer'
                  >
                    {/* تصویر */}
                    <img
                      src={cert.url}
                      alt={`portfolio-${index}`}
                      className='absolute inset-0 w-full h-full object-cover
                         group-hover:scale-105 transition-transform duration-300'
                    />

                    {/* Overlay */}
                    <div
                      className='absolute inset-0 bg-black/40 opacity-0
                         group-hover:opacity-100 transition-opacity duration-300'
                    />

                    {/* Label */}
                    <div
                      className='absolute bottom-2 right-2 left-2 text-white
                         opacity-0 group-hover:opacity-100 transition-all duration-300'
                    >
                      <p className='text-xs font-semibold text-center'>
                        نمونه کار {index + 1}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {memberProjects.length > 0 && (
          <div className='space-y-6 my-2 w-full'>
            <h2 className='s text-center font-bold text-white text-2xl [direction:rtl]'>
              پروژه‌های من
            </h2>

            <div
              className='flex flex-col gap-1 overflow-x-auto overflow-y-hidden'
              dir='rtl'
            >
              {memberProjects.map((project, index) => (
                <div
                  key={index}
                  className='bg-white/10 rounded-3xl p-2 backdrop-blur-md border border-white/20 shadow-lg h-28 w-full flex flex-col justify-between'
                >
                  <h3 className='text-white text-sm font-semibold truncate'>
                    {project.title}
                  </h3>

                  <div className='flex gap-2 my-1 overflow-x-auto overflow-y-hidden items-center h-full'>
                    {project.project_media?.map((file: any, idx: number) => (
                      <div
                        key={idx}
                        className='flex flex-col items-center justify-center min-w-[80px]'
                      >
                        <img
                          src={file.file_url}
                          alt={`project-${idx}`}
                          className='w-14 h-14 object-cover rounded'
                        />
                        <p className='text-[10px] mt-1 text-white text-center truncate'>
                          {file.caption.length > 12
                            ? file.caption.slice(0, 12) + '...'
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

      {/* --- DESKTOP VERSION --- */}
      <div className='hidden bg-[#ffffff1a] rounded-[80px] lg:grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10'>
        {/* Left Content */}
        <div className='bg-[#ffffff1a] order-2 md:order-1 rounded-[80px] p-8 relative space-y-8'>
          <div className='space-y-6'>
            <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
              درباره من
            </h2>
            <p className='text-right leading-9 text-white text-base md:text-2xl'>
              {member.aboutPerson}
            </p>
          </div>

          <div className='h-[1px] w-full bg-white rounded' />

          <div className='space-y-6'>
            {(member.skillDescs?.length ?? 0) > 0 ? (
              <>
                <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                  مهارت ها
                </h2>
                <p
                  className='text-right  leading-9 text-white text-base md:text-2xl'
                  dir='rtl'
                >
                  {member.skillDescs}
                </p>
              </>
            ) : null}
          </div>
          <div className='h-[1px] w-full bg-white rounded' />

          {member.video && (
            <div className='w-full flex h-44 md:h-58 justify-center mt-2'>
              <video
                className='w-full max-w-lg h-auto rounded-lg'
                controls
                src={member.video}
              />
            </div>
          )}

          {member.certificates?.length > 0 && (
            <div className='space-y-6'>
              <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                گواهینامه‌ها
              </h2>

              <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
                {member.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className='group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md
          border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300'
                  >
                    {/* تصویر */}
                    <img
                      src={cert.url}
                      alt={`certificate-${index}`}
                      onClick={() => setActiveImage(cert.url)}
                      className='w-28 h-28 object-cover group-hover:scale-105 transition-transform duration-300'
                    />

                    {/* Overlay */}
                    <div
                      className='absolute inset-0 bg-black/40 opacity-0
                         group-hover:opacity-100 transition-opacity duration-300
                         pointer-events-none'
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

          {member.portfolios && member.portfolios.length > 0 && (
            <div className='space-y-6 w-full'>
              <h2 className='self-start text-right font-bold text-white text-2xl [direction:rtl]'>
                نمونه کار ها
              </h2>

              <div
                className='grid gap-4'
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                }}
              >
                {member.portfolios.map(
                  (cert: { url: string; path: string }, index: number) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(cert.url)}
                      className='group relative aspect-square rounded-3xl overflow-hidden 
                       bg-white/10 backdrop-blur-md
                       border border-white/20 shadow-lg
                       cursor-pointer'
                    >
                      {/* تصویر */}
                      <img
                        src={cert.url}
                        alt={`portfolio-${index}`}
                        className='absolute inset-0 w-full h-full object-cover
                         group-hover:scale-105 transition-transform duration-300'
                      />

                      {/* Overlay */}
                      <div
                        className='absolute inset-0 bg-black/40 opacity-0
                         group-hover:opacity-100 transition-opacity duration-300'
                      />

                      {/* Label */}
                      <div
                        className='absolute bottom-2 right-2 left-2 text-white
                         opacity-0 group-hover:opacity-100 transition-all duration-300'
                      >
                        <p className='text-xs font-semibold text-center'>
                          نمونه کار {index + 1}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {memberProjects.length > 0 && (
            <div className='space-y-6'>
              <h2 className='text-right font-bold text-white text-2xl [direction:rtl]'>
                پروژه‌های من
              </h2>

              <div
                className='flex flex-col gap-4 overflow-x-auto overflow-y-hidden'
                dir='rtl'
              >
                {memberProjects.map((project, index) => (
                  <div
                    key={index}
                    className='bg-white/10 rounded-3xl p-4 backdrop-blur-md border border-white/20 shadow-lg '
                  >
                    <h3 className='text-white font-semibold mb-2'>
                      {project.title}
                    </h3>
                    <div className='flex gap-4 overflow-x-auto overflow-y-hidden'>
                      {project.project_media?.map((file: any, idx: number) => (
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
                      ))}
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
                src={member.img}
                alt='Profile'
                className='w-full h-full object-cover object-center'
                loading='lazy'
              />
            </div>
          </div>

          <h1 className='text-center font-bold text-white text-[32px] whitespace-nowrap [direction:rtl]'>
            {member.name}
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

      {activeImage && (
        <div
          className='fixed inset-0 z-[9999] bg-black/80
               flex items-center justify-center'
          onClick={() => setActiveImage(null)}
        >
          {/* دکمه بستن */}
          <button
            className='absolute top-6 right-6 text-white text-3xl font-bold'
            onClick={() => setActiveImage(null)}
          >
            ×
          </button>

          {/* تصویر */}
          <img
            src={activeImage}
            alt='preview'
            onClick={(e) => e.stopPropagation()}
            className='max-w-[90vw] max-h-[90vh] rounded-xl
                 object-contain shadow-2xl'
          />
        </div>
      )}
    </section>
  )
}

export default MemberPage
