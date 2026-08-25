import Brands from '../components/Brands'
import Hero from '../components/Hero'
import Specialties from '../components/Specialties'
import Team from '../components/Team'

const Home: React.FC = () => {
  return (
    <>
      <div className='w-full'>
        <Hero />
        <div
          className='w-full flex flex-col items-center justify-start
                        bg-gradient-to-b from-[#020201] to-[#00646B]'
        >
          <div className='w-full max-w-[95vw] md:max-w-[85vw] flex flex-col items-center'>
            <Specialties />
            <Team />
            <Brands />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
