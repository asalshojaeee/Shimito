import { type JSX } from 'react'
import { useNavigate } from 'react-router'

const committeeCardsRow1 = [
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/frame-73.svg',
    title: 'کمیته\nهوش مصنوعی',
    slug: 'ai',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/laptop-minimalistic-svgrepo-com-1.svg',
    title: 'کمیته نرم افزار',
    slug: 'software',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/dumbbell-small-svgrepo-com-1.svg',
    title: 'کمیته ورزش',
    slug: 'sport',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/garage-svgrepo-com-1.svg',
    title: 'کمیته ساختمان',
    slug: 'construction',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/frame-71.svg',
    title: 'کمیته الکترونیک',
    slug: 'electronics',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/frame-74.svg',
    title: 'کمیته مکانیک',
    slug: 'mechanics',
  },
]

const committeeCardsRow2 = [
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/delivery-svgrepo-com-1.svg',
    title: 'کمیته مارکتینگ',
    slug: 'marketing',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/medal-ribbon-star-svgrepo-com-1.svg',
    title: 'کمیته کوچینگ',
    slug: 'coaching',
  },
  {
    icon: 'https://c.animaapp.com/mizs85qdAsOzyI/img/hand-money-svgrepo-com-1.svg',
    title: 'کمیته سرمایه گذاری',
    slug: 'investment',
  },
]

// کارت مخصوص کمیته
const CommitteeCard = ({
  icon,
  title,
  onClick,
}: {
  icon: string
  title: string
  onClick: () => void
}) => (
  <div
    onClick={onClick}
    className='flex flex-col items-center justify-center w-40 md:w-52 min-h-[150px] md:min-h-[180px] bg-[#345C5D]/70 rounded-[46px] shadow-lg cursor-pointer p-4'
  >
    <img src={icon} alt={title} className='w-16 md:w-20 h-16 md:h-20 object-contain mb-2' />
    <div className='text-center text-white text-lg leading-tight whitespace-pre-line'>
      {title}
    </div>
  </div>
)

const Committees = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div className='mt-24 w-full min-h-screen flex flex-col gap-y-10 items-center py-16 max-w-[95vw] md:max-w-[85vw] mx-auto'>
      {/* بخش عنوان و توضیح */}
      <div className='bg-[#345C5D]/70 w-full flex flex-col items-center justify-center py-10 rounded-[46px] shadow-lg px-6'>
        <img
          src='/committees.png'
          alt='کمیته‌ها'
          className='w-16 md:h-28 md:w-28 h-16 object-contain mb-4'
        />
        <h1 className='text-3xl md:text-4xl text-white mb-6'>کمیته‌ها</h1>
        <p className='text-center text-white max-w-6xl text-sm md:text-base'>
          مجموعه ما از توان مجموعهای از واحدها و کارگروه‌ها که آنها را «کمیته»
          می‌نامیم برخوردار خواهد بود. این کمیته‌ها به منظور حمایت، همافزایی و
          تسهیل امور اعضای فرانگران و کنسرسیوم به خدمت گرفته خواهند شد.
        </p>
      </div>

      {/* Row 1 */}
      <div className='flex flex-wrap justify-center gap-8'>
        {committeeCardsRow1.map((card) => (
          <CommitteeCard
            onClick={() => navigate(`/Committees/${card.slug}`)}
            key={card.title}
            icon={card.icon}
            title={card.title}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className='flex flex-wrap justify-center gap-8'>
        {committeeCardsRow2.map((card) => (
          <CommitteeCard
            onClick={() => navigate(`/Committees/${card.slug}`)}
            key={card.title}
            icon={card.icon}
            title={card.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Committees
