import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { supabase } from "../data/supabaseClient";

const linkBase =
  "px-2 py-1 transition-all duration-300 hover:text-white hover:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.9))_drop-shadow(0_0_18px_rgba(255,255,255,0.7))]";

const linkActive =
  "text-white [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.9))_drop-shadow(0_0_18px_rgba(255,255,255,0.7))]";

const linkInactive = "text-white/80";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

 
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoadingUser(false);
    });

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingUser(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    };

    if (openUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu]);

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (

<div
  className="
    fixed
    top-0
    md:top-3
    w-full
    md:w-[90vw]
    lg:w-[85vw]
    xl:max-w-[85vw]
    h-[12vh]
    z-20

    px-4
    md:px-5
    lg:px-6

    border
    border-[#EF2CC51A]

    bg-[#EF2CC51A]
    backdrop-blur-[40px]

    shadow-[0_0_40px_-15px_rgba(226,139,254,0.4)]

    md:rounded-[30px]
  "
>
  <div className="flex h-full w-full items-center justify-between">

    {/* Logo */}
    <img
      src="/logo-nav.png"
      alt="لوگو"
      className="
        w-14
        md:w-14
        lg:w-16
        shrink-0
      "
    />

    {/* Navbar */}
    <nav
      className="
        hidden
        md:flex
        items-center
        justify-end
        gap-3
        lg:gap-5
        xl:gap-6
        font-normal
        text-white
        whitespace-nowrap
      "
    >
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          }`
        }
      >
        حساب کاربری
      </NavLink>

      <NavLink
        to="/services"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          }`
        }
      >
        گزینه ها
      </NavLink>

      <NavLink
        to="/product"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          }`
        }
      >
        خدمات
      </NavLink>

      <NavLink
        to="/our-products"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          }`
        }
      >
        محصولات
      </NavLink>

      <NavLink
        to="/Committees"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          }`
        }
      >
        کمیته ها
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive ? linkActive : linkInactive
          } border-0`
        }
      >
        خانه
      </NavLink>
    </nav>



      
      
        <div
          ref={userMenuRef}
          className="relative hidden md:flex"
        >
          {loadingUser ? (
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-t-transparent border-blue-600" />
          ) : user ? (
            <>
        
              <button
                onClick={() =>
                  setOpenUserMenu((prev) => !prev)
                }
                className="focus:outline-none"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="user avatar"
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover border border-white/30"
                  />
                ) : (
                  <img
                    src="/user.webp"
                    alt="default avatar"
                    className="h-11 w-11 rounded-full object-cover border border-white/30"
                  />
                )}
              </button>

             
              {openUserMenu && (
                <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl bg-gray-500 shadow-lg">

                  <NavLink
                    to="/profile"
                    onClick={() => setOpenUserMenu(false)}
                    className="block px-4 py-3 text-right text-sm text-gray-300 hover:bg-gray-600"
                  >
                    پروفایل کاربری
                  </NavLink>

                  <NavLink
                    to="/onboarding"
                    onClick={() => setOpenUserMenu(false)}
                    className="block px-4 py-3 text-right text-sm text-white hover:bg-gray-600"
                  >
                    ثبت نام شرکت | افراد
                  </NavLink>

                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setOpenUserMenu(false);
                    }}
                    className="w-full px-4 py-3 text-right text-sm text-red-600 hover:bg-gray-600"
                  >
                    خروج
                  </button>
                </div>
              )}
            </>
          ) : (
          <NavLink
  to="/register"
  onClick={() => setMenuOpen(false)}
  className="
    rounded-[20px]
    border
    border-[#A855F766]
    bg-[#A855F71A]

    px-[14px]
    md:px-[12px]
    lg:px-[16px]
    xl:px-[20px]

    py-[10px]
    md:py-[8px]
    lg:py-[10px]
    xl:py-[12px]

    text-[16px]
    md:text-[14px]
    lg:text-[16px]
    xl:text-[20px]

    font-bold
    text-white
    whitespace-nowrap
    shrink-0
  "
>
  ورود به نرم افزار
</NavLink>
          )}
        </div>

    
        <button
          className="
            rounded-[8px]
            bg-white/10
            p-1
            text-3xl
            text-white
            focus:outline-none
            md:hidden
          "
          onClick={toggleMenu}
        >
          {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
        </button>
      </div>


      {menuOpen && (
        <div
          className="
            absolute
            left-0
            top-[100%]
            z-10
            flex
            w-full
            animate-slideDown
            flex-col
            items-center
            gap-4
            rounded-[30px]
            bg-black/60
            py-4
            text-white
            backdrop-blur-md
          "
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? linkActive : linkInactive
              }`
            }
          >
            خانه
          </NavLink>

          <NavLink
            to="/Committees"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? linkActive : linkInactive
              }`
            }
          >
            کمیته ها
          </NavLink>

          <NavLink
            to="/our-products"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? linkActive : linkInactive
              }`
            }
          >
            محصولات
          </NavLink>


          <NavLink
            to="/services"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? linkActive : linkInactive
              }`
            }
          >
            خدمات
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? linkActive : linkInactive
              }`
            }
          >
            گزینه ها
          </NavLink>

          
          <div
            ref={userMenuRef}
            className="relative"
          >
            {loadingUser ? (
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-t-transparent border-blue-600" />
            ) : user ? (
              <>
                <button
                  onClick={() =>
                    setOpenUserMenu((prev) => !prev)
                  }
                  className="focus:outline-none"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="user avatar"
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover border border-white/30"
                    />
                  ) : (
                    <img
                      src="/user.webp"
                      alt="default avatar"
                      className="h-11 w-11 rounded-full object-cover border border-white/30"
                    />
                  )}
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl bg-gray-500 shadow-lg">

                    <NavLink
                      to="/profile"
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                      className="block px-4 py-3 text-right text-sm text-gray-300 hover:bg-gray-600"
                    >
                      پروفایل کاربری
                    </NavLink>

                    <NavLink
                      to="/onboarding"
                      onClick={() =>
                        setOpenUserMenu(false)
                      }
                      className="block px-4 py-3 text-right text-sm text-gray-300 hover:bg-gray-600"
                    >
                      ثبت نام شرکت | افراد
                    </NavLink>

                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setOpenUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-right text-sm text-red-600 hover:bg-gray-600"
                    >
                      خروج
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-[16px]
                  bg-[#D9D9D9]
                  px-[20px]
                  py-[12px]
                  font-semibold
                  text-neutral-900
                  transition
                  hover:bg-white
                "
              >
                ورود / ثبت نام
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;