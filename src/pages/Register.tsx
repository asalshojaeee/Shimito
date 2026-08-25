import { FcGoogle } from 'react-icons/fc'
import { supabase } from '../data/supabaseClient'

const Auth = () => {
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { prompt: ' select_account' },
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='bg-white w-full min-h-screen flex items-center justify-center'>
      <main className='h-screen max-w-full w-[1920px] relative bg-[#19353c] shadow-[0px_0px_120px_#00000033] flex items-center justify-center'>
        <img
          className='absolute top-0 left-0 w-full h-full object-cover'
          alt='background'
          src='https://c.animaapp.com/mix2ox95W4Hhy8/img/daniel-leone-v7datklzzaw-unsplash-1.png'
        />

        <section className='relative  w-full max-w-[420px] px-2 md:px-0 mx-auto'>
          <div className='bg-[#ffffff1a] backdrop-blur-md rounded-[40px] p-5 md:p-10 text-center space-y-8'>
            <img
              src='/register-company-logo.png'
              className='mx-auto w-[80px] md:w-[100px]'
              alt='logo'
            />

            <div className='space-y-2'>
              <h1 className='text-white text-xl md:text-2xl font-semibold'>خوش آمدید</h1>
              <p className='text-white text-sm leading-6'>
                برای ادامه وارد حساب کاربری خود شوید
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className='w-full h-11 md:h-12 text-sm md:text-base bg-white rounded-[20px] flex items-center justify-center gap-3 font-semibold text-[#173A46] hover:opacity-90 transition'
            >
              <FcGoogle size={22} />
              ورود / ثبت‌نام با گوگل
            </button>

            <p className='text-white text-xs leading-5'>
              با ورود، شما با{' '}
              <span className='text-[#4AD7FF] underline underline-offset-2 cursor-pointer'>
                قوانین و مقررات
              </span>{' '}
              موافقت می‌کنید
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Auth
