// import Brands from '../components/Brands'
import Hero from '../components/Hero'
import Products from '../components/ProductsSlider'
import Specialties from '../components/Specialties'
// import Team from '../components/Team'

const Home: React.FC = () => {
  return (
    <>
      <div className='w-full'>
        <Hero />
        <div
          className='w-full flex flex-col items-center justify-center
                        bg-gradient-to-br from-[#000105] via-[#50006B] to-[#A855F7]'
        >
          <div className='w-full max-w-[95vw] md:max-w-[85vw] flex flex-col items-center'>
            <Specialties />
            <Products />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
