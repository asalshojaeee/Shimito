import React, { useState, type JSX } from 'react'
import { supabase } from '../data/supabaseClient'
import CompanyForm from '../components/CompanyForm'
import PersonForm from '../components/PersonForm'

const RegisterCompany = (): JSX.Element => {
  const [isCompany, setIsCompany] = useState(true)
  const [name, setName] = useState('')
  const [foundationYear, setFoundationYear] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [address, setAddress] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [resume, setResume] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [desc, setDesc] = useState('')
  const [resumeFileName, setResumeFileName] = useState('آپلود رزومه شرکت')
  const [logoFileName, setLogoFileName] = useState('آپلود لوگو شرکت')
  const [loadingLogo, setLoadingLogo] = useState(false)
  const [loadingResume, setLoadingResume] = useState(false)
  const [aboutCo, setAboutCo] = useState('')
  const [personName, setPersonName] = useState('')
  const [personEmail, setPersonEmail] = useState('')
  const [personNationalId, setPersonNationalId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [aboutPerson, setAboutPerson] = useState('')
  const [personResume, setPersonResume] = useState<string>('')
  const [personLogo, setPersonLogo] = useState<string>('')
  const [education, setEducation] = useState('')
  const [personDesc, setPersonDesc] = useState('')
  const [selectedCommittee, setSelectedCommittee] = useState('')
  const [personSkillDesc, setPersonSkillDesc] = useState('')
  const [personResumeFileName, setPersonResumeFileName] =
    useState('آپلود رزومه فرد')
  const [personLogoFileName, setPersonLogoFileName] = useState('آپلود عکس فرد')
  const [loadingPersonLogo, setLoadingPersonLogo] = useState(false)
  const [loadingPersonResume, setLoadingPersonResume] = useState(false)
  const handleSwitch = () => setIsCompany(!isCompany)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    folder: 'logos' | 'resumes'
  ) => {
    if (!event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0]
    const fileName = `${Date.now()}_${file.name}`
    const filePath = `${folder}/${fileName}`

    if (folder === 'resumes') setLoadingResume(true)
    else setLoadingLogo(true)

    try {
      const { error: uploadError } = await supabase.storage
        .from('files')
        .upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('files')
        .getPublicUrl(filePath)

      if (!urlData?.publicUrl) throw new Error('Public URL undefined')

      const publicUrl = urlData.publicUrl

      if (folder === 'resumes') {
        setResume(publicUrl)
        setResumeFileName(file.name)
      } else {
        setLogo(publicUrl)
        setLogoFileName(file.name)
      }
    } catch (err: any) {
      console.error('Upload failed:', err.message)
    } finally {
      if (folder === 'resumes') setLoadingResume(false)
      else setLoadingLogo(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('لطفا ابتدا وارد حساب کاربری شوید')
      return
    }
    try {
      if (isCompany) {
        // ثبت نام شرکت
        const { data, error } = await supabase.from('companies').insert([
          {
            user_id: user.id,
            name,
            foundationYear,
            contactNumber,
            registrationNumber,
            address,
            nationalId,
            img: logo,
            resume,
            desc,
            services: [],
            aboutCo,
          },
        ])

        if (error) throw error
        console.log('Inserted person:', data)

        // ریست فرم شرکت
        setName('')
        setFoundationYear('')
        setContactNumber('')
        setRegistrationNumber('')
        setAddress('')
        setNationalId('')
        setLogo('')
        setResume('')
        setDesc('')
        setResumeFileName('آپلود رزومه شرکت')
        setLogoFileName('آپلود لوگو شرکت')

        alert('شرکت با موفقیت ثبت شد!')
      } else {
        // ثبت نام فرد
        const { data, error } = await supabase.from('people').insert([
          {
            user_id: user.id,
            name: personName,
            email: personEmail,
            nationalId: personNationalId,
            phoneNumber,
            education,
            desc: personDesc,
            aboutPerson,
            img: personLogo,
            resume: personResume,
            committee_interested: selectedCommittee,
            skillDescs: personSkillDesc,
          },
        ])

        if (error) throw error

        console.log('Inserted person:', data)

        // ریست فرم فرد
        setPersonName('')
        setPersonEmail('')
        setPersonNationalId('')
        setEducation('')
        setPhoneNumber('')
        setPersonDesc('')
        setAboutPerson('')
        alert('فرد با موفقیت ثبت شد!')
      }

      window.location.href = '/'
    } catch (err: any) {
      console.error('Register failed:', err.message)
      alert('خطا در ثبت نام: ' + err.message)
    }
  }

  return (
    <div className='bg-white w-full min-h-screen flex items-center justify-center'>
      <main className='h-screen max-w-full w-[1920px]  relative bg-[#19353c] shadow-[0px_0px_120px_#00000033] flex items-center justify-center'>
        <section className='relative w-full mx-auto'>
          {/* Desktop Container */}
          <form
            onSubmit={(e) => handleRegister(e)}
            className='hidden  lg:flex bg-[#ffffff1a] rounded-[50px] grid-cols-1 lg:grid-cols-[1fr_auto]'
          >
            <div className='bg-white w-full min-h-screen flex items-center justify-center'>
              <main className='h-screen w-full relative bg-[#19353c] shadow-[0px_0px_120px_#00000033] flex items-center justify-center'>
                <img
                  className='absolute top-0 left-0 w-full h-full object-cover'
                  alt='Daniel leone'
                  src='https://c.animaapp.com/mix2ox95W4Hhy8/img/daniel-leone-v7datklzzaw-unsplash-1.png'
                />

                <section className='relative w-full max-w-[90vw] md:max-w-[70vw] mx-auto'>
                  <div className='hidden bg-[#ffffff1a] rounded-[50px] lg:grid grid-cols-1 lg:grid-cols-[1fr_auto] '>
                    {/* Left Content */}
                    <div
                      className='bg-[#cfcfcf1a] order-2 backdrop-blur-md md:order-1 rounded-[50px] p-10 relative space-y-8 '
                      dir='rtl'
                    >
                      <div className='grid grid-cols-2 gap-x-8 gap-y-5 '>
                        {isCompany ? (
                          <CompanyForm
                            name={name}
                            setName={setName}
                            desc={desc}
                            setDesc={setDesc}
                            aboutCo={aboutCo}
                            setAboutCo={setAboutCo}
                            foundationYear={foundationYear}
                            setFoundationYear={setFoundationYear}
                            contactNumber={contactNumber}
                            setContactNumber={setContactNumber}
                            registrationNumber={registrationNumber}
                            setRegistrationNumber={setRegistrationNumber}
                            address={address}
                            setAddress={setAddress}
                            nationalId={nationalId}
                            setNationalId={setNationalId}
                            handleFileUpload={handleFileUpload}
                            loadingResume={loadingResume}
                            loadingLogo={loadingLogo}
                            resumeFileName={resumeFileName}
                            logoFileName={logoFileName}
                          />
                        ) : (
                          <PersonForm
                            name={personName}
                            selectedCommittee={selectedCommittee}
                            setSelectedCommittee={setSelectedCommittee}
                            setPersonName={setPersonName}
                            personEmail={personEmail}
                            setPersonEmail={setPersonEmail}
                            setPersonLogo={setPersonLogo}
                            setPersonResume={setPersonResume}
                            personNationalId={personNationalId}
                            setPersonNationalId={setPersonNationalId}
                            education={education}
                            setEducation={setEducation}
                            setPersonDesc={setPersonDesc}
                            personDesc={personDesc}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            aboutPerson={aboutPerson}
                            setAboutPerson={setAboutPerson}
                            personSkillDesc={personSkillDesc}
                            setPersonSkillDesc={setPersonSkillDesc}
                            resumeFileName={personResumeFileName}
                            logoFileName={personLogoFileName}
                            loadingResume={loadingPersonResume}
                            loadingLogo={loadingPersonLogo}
                            setResumeFileName={setPersonResumeFileName}
                            setLogoFileName={setPersonLogoFileName}
                            setLoadingResume={setLoadingPersonResume}
                            setLoadingLogo={setLoadingPersonLogo}
                          />
                        )}
                      </div>
                      <div
                        className={`${
                          isCompany ? 'pt-10' : ''
                        } flex flex-col items-center pt-10 gap-4`}
                      >
                        <div className='flex gap-2 items-center text-white text-xs'>
                          <label className='flex items-center gap-2 cursor-pointer'>
                            <input type='checkbox' className='sr-only peer' />
                            <div className='w-4 h-4 border border-white rounded-sm flex items-center justify-center peer-checked:bg-[#49d7ff] peer-checked:border-[#49d7ff]'>
                              <svg
                                className='w-3 h-3 text-white hidden peer-checked:block'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='3'
                                viewBox='0 0 24 24'
                              >
                                <path d='M5 13l4 4L19 7' />
                              </svg>
                            </div>
                            قوانین و مقررات را خوانده ام و با آن موافقت میکنم
                          </label>

                          <label className='text-[#4AD7FF]  text-sm underline cursor-pointer underline-offset-2'>
                            قوانین و مقررات
                          </label>
                        </div>

                        <button
                          className='bg-white font-semibold w-80 h-12 text-[#173A46] rounded-[20px]'
                          type='submit'
                        >
                          {isCompany ? 'ثبت نام شرکت' : 'ثبت نام فرد'}
                        </button>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className='flex rounded-[50px] backdrop-blur-xl order-1 md:order-2 p-7 flex-col  items-center md:items-end gap-8 lg:w-[200px] justify-between '>
                      <div className='flex flex-col gap-16 items-center'>
                        <div className='space-y-3'>
                          <img
                            src='/register-company-logo.png'
                            className=' w-[100px] h-[70px]'
                            alt=''
                          />
                          <h2 className='font-semibold text-white text-3xl'>
                            {isCompany ? 'Co Name' : 'P Name'}
                          </h2>
                        </div>
                        <div className='space-y-3'>
                          <h3 className='text-white text-center text-2xl font-semibold'>
                            {isCompany ? 'ثبت نام شرکت' : 'ثبت نام افراد'}
                          </h3>
                          <p className='text-[11px] text text-center text-white leading-5'>
                            لطفا اطلاعات را دقیق در فرم مقابل وارد کنید و
                            اطلاعات تمام بخش ها را کامل کنید
                          </p>
                        </div>
                      </div>
                      <a
                        onClick={handleSwitch}
                        className='text-[#4AD7FF] text-sm cursor-pointer mx-auto mb-12 underline underline-offset-2'
                      >
                        {isCompany ? 'ثبت نام افراد' : 'ثبت نام شرکت'}
                      </a>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </form>

          {/* Mobile Container */}
          <div className='lg:hidden relative min-h-screen w-full overflow-hidden'>
            {/* Background Image */}
            <img
              src='https://c.animaapp.com/mix2ox95W4Hhy8/img/daniel-leone-v7datklzzaw-unsplash-1.png'
              alt='Daniel leone'
              className='absolute inset-0 w-full h-full object-cover'
            />

            {/* Overlay (optional for darkening bg) */}
            <div className='absolute inset-0 bg-black/30'></div>

            {/* Form Container */}
            <form
              onSubmit={(e) => handleRegister(e)}
              className='relative z-10 h-full flex flex-col justify-center p-4'
              dir='rtl'
            >
              <div className='bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4'>
                {isCompany ? (
                  <CompanyForm
                    name={name}
                    setName={setName}
                    desc={desc}
                    setDesc={setDesc}
                    aboutCo={aboutCo}
                    setAboutCo={setAboutCo}
                    foundationYear={foundationYear}
                    setFoundationYear={setFoundationYear}
                    contactNumber={contactNumber}
                    setContactNumber={setContactNumber}
                    registrationNumber={registrationNumber}
                    setRegistrationNumber={setRegistrationNumber}
                    address={address}
                    setAddress={setAddress}
                    nationalId={nationalId}
                    setNationalId={setNationalId}
                    handleFileUpload={handleFileUpload}
                    loadingResume={loadingResume}
                    loadingLogo={loadingLogo}
                    resumeFileName={resumeFileName}
                    logoFileName={logoFileName}
                  />
                ) : (
                  <PersonForm
                    name={personName}
                    selectedCommittee={selectedCommittee}
                    setSelectedCommittee={setSelectedCommittee}
                    setPersonName={setPersonName}
                    personEmail={personEmail}
                    setPersonEmail={setPersonEmail}
                    setPersonLogo={setPersonLogo}
                    setPersonResume={setPersonResume}
                    personNationalId={personNationalId}
                    setPersonNationalId={setPersonNationalId}
                    education={education}
                    setEducation={setEducation}
                    setPersonDesc={setPersonDesc}
                    personDesc={personDesc}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    aboutPerson={aboutPerson}
                    setAboutPerson={setAboutPerson}
                    personSkillDesc={personSkillDesc}
                    setPersonSkillDesc={setPersonSkillDesc}
                    resumeFileName={personResumeFileName}
                    logoFileName={personLogoFileName}
                    loadingResume={loadingPersonResume}
                    loadingLogo={loadingPersonLogo}
                    setResumeFileName={setPersonResumeFileName}
                    setLogoFileName={setPersonLogoFileName}
                    setLoadingResume={setLoadingPersonResume}
                    setLoadingLogo={setLoadingPersonLogo}
                  />
                )}

                <div className='flex flex-col items-center gap-4 pt-6'>
                  <button
                    className='bg-white font-semibold w-full h-12 text-[#173A46] rounded-xl'
                    type='submit'
                  >
                    {isCompany ? 'ثبت نام شرکت' : 'ثبت نام فرد'}
                  </button>

                  <span
                    onClick={handleSwitch}
                    className='text-[#4AD7FF] text-sm cursor-pointer underline underline-offset-2'
                  >
                    {isCompany ? 'ثبت نام افراد' : 'ثبت نام شرکت'}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RegisterCompany
