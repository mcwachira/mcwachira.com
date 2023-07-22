"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import React from 'react'

const Navbar = () => {
//Navbar Toggle 
const [navbarOpen, setNavbarOpen] = useState(false);
const navbarToggleHandler = () => {
  setNavbarOpen(!navbarOpen);
};




  //Navbar always on top
  const [sticky, setSticky] = useState(false);

  const handleStickyNavbar = () => {
    if(window.scrollY >=80){
      setSticky(true)
    }else{
      setSticky(false)
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', handleStickyNavbar)
  }, [])


  return (
   <>
   <header className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${sticky ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20":'absolute'}`}>


<div className="container">
  <div className="relative mx-4 flex items-center justify-between">
    <div className="w-60 max-w-full px-4 xl:mr-12">
      <Link   href='/' className={`header-logo block w-full ${sticky ? 'py-5 lg:py-2':'py-8'}`}>


<Image src='/logo/png/color.png' alt='logo' width={50} height={50} className=' dark:hidden'/>

<Image src='/logo/png/white.png' alt='logo' width={50} height={50} className='hidden dark:block'/>

     

      </Link>
    </div>

    <div className="flex w-full items-center justify-between px-4">
      <div>
      <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >

                  <ul className="block items-center xl:flex lg:space-x-12">


                    {menuData.map((menuItem, index) => (
                      <li className="group relative" key={menuItem.id}>

{menuItem.path && <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base font-semibold lg:text-xl  text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            {menuItem.title}
                          </Link>}


                      </li>
                    ))}



<div>

<ThemeToggler />
</div>


                  </ul>

            

                </nav>

  

      </div>

      <div className="flex items-center justify-end  pr-16  lg:pr-0">
           
                <Link
                  href="/hire"
                  className="ease-in-up  rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                >
                 Hire
                </Link>
                
              </div>
            </div>
          </div>
        </div>
   </header>
   
   
   
   </>  
   
   
   )
}

export default Navbar