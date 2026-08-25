import { BsClipboardFill, BsImageFill } from 'react-icons/bs'
import Input from './Input'

interface Props {
  name: string
  foundationYear: string
  contactNumber: string
  registrationNumber: string
  address: string
  nationalId: string
  aboutCo: string
  desc: string
  setAboutCo: (val: string) => void
  setDesc: (val: string) => void
  setName: (val: string) => void
  setFoundationYear: (val: string) => void
  setContactNumber: (val: string) => void
  setRegistrationNumber: (val: string) => void
  setAddress: (val: string) => void
  setNationalId: (val: string) => void
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: 'logos' | 'resumes'
  ) => void
  loadingResume: boolean
  loadingLogo: boolean
  resumeFileName: string
  logoFileName: string
}

export default function CompanyForm({
  name,
  setName,
  desc,
  setDesc,
  aboutCo,
  setAboutCo,
  foundationYear,
  setFoundationYear,
  contactNumber,
  setContactNumber,
  registrationNumber,
  setRegistrationNumber,
  address,
  setAddress,
  nationalId,
  setNationalId,
  handleFileUpload,
  loadingResume,
  loadingLogo,
  resumeFileName,
  logoFileName,
}: Props) {
  return (
    <>
      <Input
        id='company-name'
        placeholder='نام شرکت'
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        
      />
      <Input
        id='company-specialty'
        placeholder='حوزه تخصصی فعالیت'
        value={desc}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDesc(e.target.value)
        }
      />

      <Input
        id='foundation-year'
        placeholder='سال تاسیس'
        value={foundationYear}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFoundationYear(e.target.value)
        }
      />
      <Input
        id='contact-number'
        placeholder='شماره تماس نماینده / مدیرعامل'
        value={contactNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContactNumber(e.target.value)
        }
      />

      <Input
        id='registration-number'
        placeholder='شماره ثبت'
        value={registrationNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRegistrationNumber(e.target.value)
        }
      />
      <Input
        id='address'
        placeholder='آدرس'
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
      />

      <Input
        id='national-id'
        placeholder='شناسه ملی'
        value={nationalId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNationalId(e.target.value)
        }
      />

      <textarea
        name=''
        id=''
        value={aboutCo}
        placeholder='درباره شرکت'
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setAboutCo(e.target.value)
        }
        rows={3}
        className='bg-transparent w-full border-b-2 text-white placeholder:text-gray-200 border-b-gray-400 outline-none'
        required
      ></textarea>
      <div className='flex items-center gap-2 mt-5'>
        <input
          type='file'
          accept='.txt,.pdf'
          style={{ display: 'none' }}
          id='resume-upload'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFileUpload(e, 'resumes')
          }
        />
        <label
          htmlFor='resume-upload'
          className='flex items-center px-2 gap-2 text-sm md:text-base bg-gray-100 h-10 rounded-xl  cursor-pointer font-semibold text-[#244E5C]'
        >
          <BsClipboardFill className='w-5 h-7' />
          {loadingResume ? (
            <span className='animate-spin border-2 border-t-transparent border-[#244E5C] rounded-full w-4 h-4' />
          ) : (
            resumeFileName
          )}
        </label>

        <span className='  text-white text-xs md:text-sm whitespace-nowrap'>
          رزومه شرکت را با پسوند pdf آپلود کنید
        </span>
      </div>
      <div className='flex items-center gap-2 mt-5'>
        <input
          type='file'
          accept='.jpg,.jpeg,.png'
          style={{ display: 'none' }}
          id='logo-upload'
          onChange={(e) => handleFileUpload(e, 'logos')}
        />
        <label
          htmlFor='logo-upload'
          className='flex items-center px-2 gap-2 text-sm md:text-base  bg-gray-100 h-10 rounded-xl cursor-pointer font-semibold text-[#244E5C]'
        >
          <BsImageFill className='w-5 h-7' />
          {loadingLogo ? (
            <span className='animate-spin border-2 border-t-transparent border-[#244E5C] rounded-full w-4 h-4' />
          ) : (
            logoFileName
          )}
        </label>

        <span className=' text-white text-xs md:text-sm whitespace-nowrap'>
          لوگو شرکت را با پسوند jpg آپلود کنید
        </span>
      </div>
    </>
  )
}
