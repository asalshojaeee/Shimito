



import { BsImageFill } from 'react-icons/bs'
import { FiTrash2 } from 'react-icons/fi'

type FileItem = {
  url: string
  path: string
}

export default function UploadSection({
  title,
  hint,
  inputId,
  files = [],
  onUpload,
  onRemove,
}: {
  title: string
  hint: string
  inputId: string
  files?: FileItem[]
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (path: string) => void
}) {
 
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <input
          type='file'
          accept='image/jpeg,image/jpg'
          hidden
          id={inputId}
          onChange={onUpload}
        />

        <label
          htmlFor={inputId}
          className='flex text-xs md:text-sm items-center px-2 gap-2 bg-gray-100 h-10 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-[#244E5C] cursor-pointer'
        >
          <BsImageFill className='w-5 h-7' />
          {title}
        </label>

        <span className='text-white text-xs md:text-sm whitespace-nowrap'>
          {hint}
        </span>
      </div>

      <div className='grid grid-cols-5 mt-2'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className='relative w-12 h-12 md:w-14 md:h-14 border border-white/20 rounded-lg overflow-hidden group'
          >
            {files[idx] && (
              <>
                <img
                  src={files[idx].url}
                  alt={`${inputId}-${idx}`}
                  className='w-full h-full object-cover transition-all duration-200 group-hover:scale-105'
                />

                <div className='absolute inset-0 bg-white/10 rounded-lg backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition' />

                <button
                  onClick={() => onRemove(files[idx].path)}
                  className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition rounded-lg'
                >
                  <FiTrash2 className='w-5 h-5 text-red-400 hover:text-red-500' />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
