import { supabase } from '../data/supabaseClient'
import Input from './Input'
import { BsClipboardFill, BsImageFill } from 'react-icons/bs'
import Select from 'react-select'
interface Props {
  name: string
  setPersonName: (val: string) => void
  personEmail: string
  setPersonEmail: (val: string) => void
  personDesc: string
  education: string
  aboutPerson: string
  setAboutPerson: (val: string) => void
  personNationalId: string
  selectedCommittee: string
  setSelectedCommittee: (val: string) => void
  setPersonNationalId: (val: string) => void
  phoneNumber: string
  setPhoneNumber: (val: string) => void
  setPersonLogo: (val: string) => void
  setPersonResume: (val: string) => void
  setEducation: (val: string) => void
  setPersonDesc: (val: string) => void
  personSkillDesc: string
  setPersonSkillDesc: (val: string) => void
  resumeFileName: string
  logoFileName: string
  loadingResume: boolean
  loadingLogo: boolean
  setResumeFileName: (val: string) => void
  setLogoFileName: (val: string) => void
  setLoadingResume: (val: boolean) => void
  setLoadingLogo: (val: boolean) => void
}
export default function PersonForm({
  name,
  setPersonName,
  personEmail,
  setPersonEmail,
  education,
  setEducation,
  personDesc,
  setPersonDesc,
  aboutPerson,
  setAboutPerson,
  personNationalId,
  setPersonNationalId,
  phoneNumber,
  setPhoneNumber,
  setPersonLogo,
  setPersonResume,
  selectedCommittee,
  setSelectedCommittee,
  personSkillDesc,
  setPersonSkillDesc,
  setLoadingResume,
  setLoadingLogo,
  setResumeFileName,
  setLogoFileName,
  loadingResume,
  resumeFileName,
  logoFileName,
  loadingLogo,
}: Props) {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    folder: 'images' | 'resumes'
  ) => {
    if (!event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0]
    const fileName = `${Date.now()}_${file.name}`
    const filePath = `${folder}/${fileName}`

    if (folder === 'resumes') setLoadingResume(true)
    else setLoadingLogo(true)

    try {
      const { error: uploadError } = await supabase.storage
        .from('people')
        .upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('people')
        .getPublicUrl(filePath)
      if (!urlData?.publicUrl) throw new Error('Public URL undefined')

      const publicUrl = urlData.publicUrl

      if (folder === 'resumes') {
        setPersonResume(publicUrl)
        setResumeFileName(file.name)
      } else {
        setPersonLogo(publicUrl)
        setLogoFileName(file.name)
      }
    } catch (err: any) {
      console.error('Upload failed:', err.message)
    } finally {
      if (folder === 'resumes') setLoadingResume(false)
      else setLoadingLogo(false)
    }
  }

  const committees = [
    'کمیته هوش مصنوعی',
    'کمیته نرم افزار',
    'کمیته ورزش',
    'کمیته ساختمان',
    'کمیته الکترونیک',
    'کمیته مکانیک',
    'کمیته مارکتینگ',
    'کمیته کوچینگ',
    'کمیته سرمایه گذاری',
  ]

  const options = committees.map((c) => ({ value: c, label: c }))

  return (
    <>
      <Input
        id='name'
        placeholder='نام و نام خانوادگی'
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPersonName(e.target.value)
        }
      />
      <Input
        id='email'
        placeholder='ایمیل'
        value={personEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPersonEmail(e.target.value)
        }
      />
      <Input
        id='nationalId'
        placeholder='کدملی'
        value={personNationalId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPersonNationalId(e.target.value)
        }
      />

      <Input
        id='phoneNumber'
        placeholder='شماره تماس'
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value)
        }
      />
      <Input
        id='address'
        placeholder='تحصیلات'
        value={education}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEducation(e.target.value)
        }
      />
      <Input
        id='job'
        placeholder='حوزه تخصص'
        value={personDesc}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPersonDesc(e.target.value)
        }
      />

      <textarea
        className='bg-transparent w-full text-white border-b-2 placeholder:text-gray-200 border-b-gray-400 outline-none'
        rows={3}
        placeholder='درباره خودتان'
        value={aboutPerson}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setAboutPerson(e.target.value)
        }
        required
      />

      <Select
        options={options}
        value={
          selectedCommittee
            ? { value: selectedCommittee, label: selectedCommittee }
            : null
        }
        onChange={(option) => setSelectedCommittee(option?.value || '')}
        placeholder='انتخاب کمیته جهت پیشنهاد'
        className='w-full'
        classNamePrefix='custom'
        menuPortalTarget={document.body}
        menuPosition='fixed'
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: state.isFocused
              ? '2px solid #3B82F6'
              : '2px solid #9CA3AF',
            borderRadius: 0,
            minHeight: '2.5rem',
            boxShadow: 'none',
            padding: '1.1rem 0',
            color: '#F9FAFB',
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 99999,
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#e9e9e9',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#F9FAFB',
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: '0.5rem',
            overflow: 'hidden',
            zIndex: 9999, // همیشه روی بقیه عناصر باشد
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#345C5D' : 'white',
            color: state.isFocused ? 'white' : '#374151',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
          }),
        }}
      />
      <textarea
        className='bg-transparent w-full text-white border-b-2 placeholder:text-gray-200 border-b-gray-400 outline-none'
        rows={3}
        placeholder='درباره ی مهارت های فرد'
        value={personSkillDesc}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setPersonSkillDesc(e.target.value)
        }
        required
      />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <input
            type='file'
            accept='.txt,.pdf'
            style={{ display: 'none' }}
            id='resume-upload'
            onChange={(e) => handleFileUpload(e, 'resumes')}
          />
          <label
            htmlFor='resume-upload'
            className='flex items-center px-3 sm:px-4 gap-2 bg-gray-100 h-10 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-[#244E5C] cursor-pointer justify-center md:justify-start'
          >
            <BsClipboardFill className='w-5 h-7' />
            {loadingResume ? (
              <span className='animate-spin border-2 border-t-transparent border-[#244E5C] rounded-full w-5 h-5' />
            ) : (
              resumeFileName
            )}
          </label>
          <span className=' text-white text-xs md:text-sm whitespace-nowrap'>
            رزومه فرد را با پسوند pdf آپلود کنید
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <input
            type='file'
            accept='.jpg,.jpeg,.png'
            style={{ display: 'none' }}
            id='logo-upload'
            onChange={(e) => handleFileUpload(e, 'images')}
          />
          <label
            htmlFor='logo-upload'
            className='flex items-center px-3 sm:px-4 gap-2 bg-gray-100 h-10 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-[#244E5C] cursor-pointer justify-center md:justify-start'
          >
            <BsImageFill className='w-5 h-7' />
            {loadingLogo ? (
              <span className='animate-spin border-2 border-t-transparent border-[#244E5C] rounded-full w-5 h-5' />
            ) : (
              logoFileName
            )}
          </label>
          <span className=' text-white text-xs md:text-sm whitespace-nowrap'>
            عکس فرد را با پسوند jpg آپلود کنید
          </span>
        </div>
      </div>
    </>
  )
}
