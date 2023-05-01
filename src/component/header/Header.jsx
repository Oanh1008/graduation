
import classNames from 'classnames'
import React, { useState } from 'react'
import NavbarItem from './NavbarItem'
import logo from '../../assets/image/logo_1.png'
import Contact from './Contact'
import { SidebarData } from './navbar'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [navbar, setNavbar] = useState(true)

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open)
  }
  const changeColorNavBar = () => {
    if (window.scrollY >= 800) {
      setNavbar(false)
    }
    else {
      setNavbar(true)
    }
  }

  window.addEventListener('scroll', changeColorNavBar)

  return (
    <header>
      <div className={classNames('md:py-0 fixed py-5 w-full top-0 transition-all duration-600 ease-in-out z-30 bg-white border drop-shadow-lg',
        // {
        //   ' drop-shadow-lg': showContact,
        //   ' bg-cyan-900': !navbar,
        // }
      )}>
        <div className=" max-w-[1536px] mx-auto">
          <div className="flex justify-between items-center mx-3 ">
            <a href='/'>
              <img src={logo} alt="logo" width={200} />
            </a>

            <div className='flex'>
              <div className="hidden lg:flex float-right w-full md:w-auto my-0 mr-0 ml-auto" >
                <NavbarItem />
              </div>

              <button className="text-cyan-900 font-medium hover:text-[#6aaac0] focus:text-[#7fb1c1] py-9 px-4 text-center inline-flex items-center  focus:outline-none"
                type="button"
                onClick={() => setShowContact(!showContact)}>
                Liên hệ
              </button>
              <div className=' flex lg:hidden items-center ml-10 '>
                {/* <SVGBar className='text-3xl fill-orange-400 h-9 w-9' onClick={() => handleClick()} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames('bg-white hidden shadow-lg md:block fixed top-24 z-20 w-full pt-6 pb-12 transition-all duration-700 ease-out',
        {
          'opacity-100 border-t ': showContact,
          ' invisible opacity-0 translate-y-16': !showContact
        })}>
        <Contact />

      </div>

      <div className={classNames("fixed top-24 hidden md:block right-0 w-full h-full z-10 transition-all duration-500 ease-in-out bg-neutral-100",
        {
          "opacity-60": showContact,
          "opacity-0 invisible ": !showContact
        })}
        onClick={() => setShowContact(!showContact)}>

      </div>
    </header >
  )
}

export default Header