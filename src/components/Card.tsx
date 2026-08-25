import { useNavigate } from 'react-router'

interface TeamCardProps {
  id: string | number
  name: string
  img: string
  tags: string[]
  desciption?: string
  link: string
}



const HaloAvatar: React.FC<{
  src?: string
  alt: string
  size?: number
  radius?: number
}> = ({
  src,
  alt,
  size = 56,
  radius = 12, // گوشه‌های کم‌گرد؛ اگر مربع‌تر خواستی 8 یا 6 بذار
}) => {
  return (
    <div className='relative shrink-0' style={{ width: size, height: size }}>
      {/* هاله پشت آواتار */}
      <div
        className='absolute inset-0 -z-10'
        style={{
          borderRadius: radius,
        }}
      />
      {src ? (
        <img
          src={src}
          alt={alt}
          className='h-full w-full object-cover  '
          style={{ borderRadius: radius }}
          loading='lazy'
        />
      ) : (
        <div
          className='h-full w-full bg-white/20 ring-4 ring-white/10'
          style={{ borderRadius: radius }}
        />
      )}
    </div>
  )
}

const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(/\s+/)
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(' ') + '...'
}

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='rounded-full bg-white/10 px-3 py-1 text-xs text-white/90'>
    {children}
  </span>
)

export const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={`flex flex-col ${className || ''}`}>{children}</div>
)

export default function Card({
  id,
  name,
  img,
  tags,
  desciption,
  link,
}: TeamCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className='w-full flex justify-between items-center cursor-pointer'
      onClick={() => navigate(link)}
    >
      <div className='w-full md:w-1/2 flex justify-center items-center gap-6'>
        <HaloAvatar src={img} alt={name} size={74} radius={14} />

        <div className='flex flex-col justify-center items-center w-full'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-base md:text-xl font-extrabold'>{name}</h3>
          </div>

          <div className='mt-0 md:mt-3 flex flex-wrap gap-2'>
            {tags && tags.length > 0 && (
              <div className='flex gap-2 mt-2'>
                {tags.map((t, i) => (
                  <Chip key={i}>{t}</Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='md:w-2/3'>
        {desciption && (
          <p className='hidden md:block text-center line-clamp-2 text-xs text-white/80'>
            {truncateText(desciption, 20)}
          </p>
        )}
      </div>

      <div className='md:w-1/3 flex justify-end items-center'>
        <button
          onClick={(e) => {
            e.stopPropagation() // جلوگیری از فعال شدن لینک کارت
            navigate(`/our-team/${id}`)
          }}
          className='md:bg-white py-2 px-4 md:py-3 md:px-5 rounded-2xl text-white md:text-[#016168]'
        >
          <svg
            width='13'
            height='22'
            viewBox='0 0 13 22'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M11.8839 0.366117C12.372 0.854272 12.372 1.64573 11.8839 2.13388L3.01777 11L11.8839 19.8661C12.372 20.3543 12.372 21.1457 11.8839 21.6339C11.3957 22.122 10.6043 22.122 10.1161 21.6339L0.366117 11.8839C-0.122039 11.3957 -0.122039 10.6043 0.366117 10.1161L10.1161 0.366117C10.6043 -0.122039 11.3957 -0.122039 11.8839 0.366117Z' />
          </svg>
        </button>
      </div>
    </div>
  )
}

