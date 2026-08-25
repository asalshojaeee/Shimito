import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoClose } from 'react-icons/io5' // برای آیکن بستن منو
import { supabase } from '../data/supabaseClient'

const linkBase = 'px-2 py-1 transition hover:text-white'
const linkActive =
  'text-white after:block after:h-[2px] after:rounded after:bg-white/60 after:mt-1'
const linkInactive = 'text-white/80'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoadingUser(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoadingUser(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setOpenUserMenu(false)
      }
    }

    if (openUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openUserMenu])

  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <div className='fixed top-0 md:top-10 w-full md:max-w-[85vw] h-[10vh] border border-white/10 bg-white/10 p-6 backdrop-blur-[10px] shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] z-20 md:rounded-[40px]'>
      <div className='flex h-full w-full items-center justify-between'>
        <img src='/logo-nav.png' alt='لوگو' className='md:w-16 w-14' />

        <nav className='hidden md:flex items-center gap-6'>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            درباره ما
          </NavLink>
          <NavLink
            to='/services'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            خدمات
          </NavLink>
          <NavLink
            to='/product'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            محصول
          </NavLink>
          <NavLink
            to='/our-team'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            اعضا
          </NavLink>
          <NavLink
            to='/Committees'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            کمیته ها
          </NavLink>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            صفحه اصلی
          </NavLink>
        </nav>

        <div ref={userMenuRef} className='relative hidden md:flex'>
          {loadingUser ? (
            <span className='inline-block w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin'></span>
          ) : user ? (
            <>
              {/* Avatar */}
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className='focus:outline-none'
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt='user avatar'
                    referrerPolicy='no-referrer'
                    className='w-11 h-11 rounded-full object-cover border border-white/30'
                  />
                ) : (
                  <img
                    src='/user.webp'
                    alt='default avatar'
                    className='w-11 h-11 rounded-full object-cover border border-white/30'
                  />
                )}
              </button>

              {openUserMenu && (
                <div className='absolute top-full right-0 mt-3 w-52 rounded-xl bg-gray-500 shadow-lg overflow-hidden z-50'>
                  <NavLink
                    to='/profile'
                    onClick={() => setOpenUserMenu(false)}
                    className='block px-4 py-3 text-right text-sm text-gray-300  hover:bg-gray-600'
                  >
                    پروفایل کاربری
                  </NavLink>

                  <NavLink
                    to='/onboarding'
                    onClick={() => setOpenUserMenu(false)}
                    className='block px-4 py-3 text-sm text-right text-gray-300 hover:bg-gray-600'
                  >
                    ثبت نام شرکت | افراد
                  </NavLink>

                  <button
                    onClick={async () => {
                      await supabase.auth.signOut()
                      setOpenUserMenu(false)
                    }}
                    className='w-full text-right px-4 py-3 text-sm text-red-600 hover:bg-gray-600'
                  >
                    خروج
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to='/register'
              onClick={() => setMenuOpen(false)}
              className='rounded-[16px] bg-[#D9D9D9] px-[20px] py-[12px] text-neutral-900 font-semibold hover:bg-white transition'
            >
              ورود / ثبت نام
            </NavLink>
          )}
        </div>

        <button
          className='md:hidden bg-white/10 text-white text-3xl focus:outline-none  p-1 rounded-[8px]'
          onClick={toggleMenu}
        >
          {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className='absolute top-[100%] left-0 w-full bg-black/60 backdrop-blur-md rounded-[30px] flex flex-col items-center py-4 gap-4 text-white animate-slideDown z-10'>
          <NavLink
            to='/'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            صفحه اصلی
          </NavLink>
          <NavLink
            to='/Committees'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            کمیته ها
          </NavLink>
          <NavLink
            to='/our-team'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            اعضا
          </NavLink>
          <NavLink
            to='/product'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            محصول
          </NavLink>
          <NavLink
            to='/services'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            خدمات
          </NavLink>
          <NavLink
            to='/about'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            درباره ما
          </NavLink>
          <div ref={userMenuRef} className='relative '>
            {loadingUser ? (
              <span className='inline-block w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin'></span>
            ) : user ? (
              <>
                <button
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className='focus:outline-none'
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt='user avatar'
                      referrerPolicy='no-referrer'
                      className='w-11 h-11 rounded-full object-cover border border-white/30'
                    />
                  ) : (
                    <img
                      src='/user.webp'
                      alt='default avatar'
                      className='w-11 h-11 rounded-full object-cover border border-white/30'
                    />
                  )}
                </button>

                {openUserMenu && (
                  <div className='absolute  right-0 mt-3 w-52 rounded-xl bg-gray-500 shadow-lg overflow-hidden z-50'>
                    <NavLink
                      to='/profile'
                      onClick={() => setOpenUserMenu(false)}
                      className='block px-4 py-3 text-right text-sm text-gray-300  hover:bg-gray-600'
                    >
                      پروفایل کاربری
                    </NavLink>

                    <NavLink
                      to='/onboarding'
                      onClick={() => setOpenUserMenu(false)}
                      className='block px-4 py-3 text-sm text-right text-gray-300 hover:bg-gray-600'
                    >
                      ثبت نام شرکت | افراد
                    </NavLink>

                    <button
                      onClick={async () => {
                        await supabase.auth.signOut()
                        setOpenUserMenu(false)
                      }}
                      className='w-full text-right px-4 py-3 text-sm text-red-600 hover:bg-gray-600'
                    >
                      خروج
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to='/register'
                onClick={() => setMenuOpen(false)}
                className='rounded-[16px] bg-[#D9D9D9] px-[20px] py-[12px] text-neutral-900 font-semibold hover:bg-white transition'
              >
                ورود / ثبت نام
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
