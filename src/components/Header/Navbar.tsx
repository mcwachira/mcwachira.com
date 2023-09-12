"use client"

import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ThemeToggler from './ThemeToggler'
import menuData from './menuData'
import clsx from 'clsx'
import { Menu, Popover, Transition, Disclosure } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import logo from '@/logo/png/color.png'
import { Container } from '../Common/Container';
import { Button } from '../Button'



const Navbar = () => {

    const router = useRouter()

       const [sticky, setSticky] = useState<boolean>(false)

    const handleStickyNavbar = () => {
        if(window.scrollY >=80){
            setSticky(true)
          }else{
            setSticky(false)
          }
        }

        
        useEffect(() => {

            window.addEventListener('scroll', handleStickyNavbar)
        },[]
        )
  function MenuIcon({ open }) {
    return (
      <span className="relative h-3.5 w-4 transform transition duration-500 ease-in-out">
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900',
            open ? 'top-1.5 left-1/2 w-0' : 'top-0 left-0 w-full'
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900',
            open ? 'rotate-45' : 'rotate-0'
          )}
        />
        <span
          className={clsx(
            'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900',
            open ? '-rotate-45' : 'rotate-0'
          )}
        />
        <span
          className={clsx(
            'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900',
            open ? 'top-1.5 left-1/2 w-0' : 'left-0 top-3 w-full'
          )}
        />
      </span>
    )
  }


  function MobileNav() {
    return (
      <Popover>
        <Popover.Button
          className="group relative z-50 flex cursor-pointer items-center justify-center rounded-full bg-slate-100/80 p-3 shadow-sm shadow-sky-100/50 ring-1 ring-slate-900/5 transition duration-300 ease-in-out hover:bg-slate-200/60 focus:outline-none md:hidden  "
          aria-label="Toggle Navigation"
        >
          {({ open }) => <MenuIcon open={open} />}
        </Popover.Button>
        <Transition.Root>
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 z-20 bg-slate-900 bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100 "
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-90"
          >
            <Popover.Panel
              as="div"
              className="absolute inset-x-0 top-full z-30 mt-4 origin-top overflow-hidden rounded-2xl bg-slate-50 px-6 py-7 shadow-xl shadow-sky-100/40 ring-1 ring-slate-900/5"
            >
              <div>
                <div className="flex flex-col space-y-4">
                  {menuData.map((link) => (
                    <Link
                      key={`${link.label}-mobile`}
                      href={link.href}
                      className="block text-base font-semibold text-slate-700 duration-200 hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  ))}
<ThemeToggler />
                </div>
              </div>
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </Popover>
    )
  }

  return (
    <header className={clsx("h-24 border-b  w-full   border-slate-200/80 bg-white",  sticky ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20":"")}> 
    {/* absolute */}
      <Container className="flex h-full w-full items-center">
        <nav className="relative z-50 flex w-full items-center justify-between">
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              aria-label="Home"
              className="flex flex-shrink-0 items-center"
            >
              <Image
                src='/logo/png/color.png'
                alt=""
                width={50} height={50} 
                className="h-8 w-auto sm:h-9 md:hidden lg:block lg:h-10 dark:hidden"
              />
              <Image
                src='/logo/png/white.png'
                alt=""
                width={50} height={50} 
                className="h-8 w-auto sm:h-9 md:hidden lg:hidden lg:h-10 dark:block"
              />
            </Link>
          </div>
          <div className="hidden items-center md:flex md:space-x-6 lg:space-x-8">
            {menuData.map((link) => (
              <Link
                key={`${link.label}-desktop`}
                href={link.href}
                className={clsx(
                  'relative duration-200 after:absolute after:left-1/2 after:-bottom-2.5 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-slate-900 after:opacity-0 after:content-[""]',
                  router.pathname == link.href
                    ? 'font-semibold text-slate-900 after:opacity-100'
                    : 'font-medium text-slate-700 hover:text-slate-900 hover:after:opacity-25'
                )}
              >
                {link.label}
              </Link>
            ))}

<ThemeToggler />
          </div>
          <div className="flex items-center">
            <Button className="" variant="secondary" href="#">
              Book a call
            </Button>
            <div className="ml-4 md:hidden">
              <MobileNav />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

//     const [navbarOpen, setNavOpen] = useState<boolean>(false)

//     const navbarToggleHandler = () => {

//         setNavOpen(!navbarOpen)
//     }


//     const [sticky, setSticky] = useState<boolean>(false)

//     const handleStickyNavbar = () => {
//         if(window.scrollY >=80){
//             setSticky(true)
//           }else{
//             setSticky(false)
//           }
//         }

        
//         useEffect(() => {

//             window.addEventListener('scroll', handleStickyNavbar)
//         }
//         ,[])

//   return (
//  <>

// {/* ${navbarOpen?'inset-0 z-20 bg-slate-900 bg-opacity-50':""} */}
//    <header className={
//     clsx("header top-0 left-0 z-40 flex w-full items-center bg-transparent",   sticky ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20":"absolute", navbarOpen?' z-20 bg-slate-900 bg-opacity-10':"")}>
 
//  <div className="container">
//     <div className="relative mx-4 flex items center justify-between">
//     <div className="w-60 max-w-full ">
//       <Link   href='/' className={`header-logo block w-full ${sticky ? 'py-5 lg:py-2':'py-8'}`}>


// <Image src='/logo/png/color.png' alt='logo' width={50} height={50} className=' dark:hidden'/>

// <Image src='/logo/png/white.png' alt='logo' width={50} height={50} className='hidden dark:block'/>

     

//       </Link>
//     </div>
//     <div className="flex w-full items-center justify-between px-4">
//       <div>
//       <button
//                   onClick={navbarToggleHandler}
//                   id="navbarToggler"
//                   aria-label="Mobile Menu"
//                   className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
//                 >
//                   <span
//                     className={clsx("relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
//                       navbarOpen ? " top-[7px] rotate-45" : " "
//                     )}
//                   />
//                   <span
//                     className={clsx("relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
//                       navbarOpen ? "opacity-0 " : " "
//   )}
//               />
//                   <span
//                     className={clsx("relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
//                       navbarOpen ? " top-[-8px] -rotate-45" : " "
//                  ) }
//                   />
//                 </button>
//                 <nav
//                   id="navbarCollapse"
//                   className={`navbar absolute inset-x-0 top-full  z-30 mt-2 origin-top overflow-hidden rounded-2xl border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
//                     navbarOpen
//                       ? "visibility top-full opacity-100 "
//                       : "invisible top-[120%] opacity-0"
//                   }`}
//                 >
//  {/* ${navbarOpen?'inset-0 z-20 bg-slate-900 bg-opacity-50':""} */}
//                   <ul className="block items-center lg:flex lg:space-x-12">


//                     {menuData.map((menuItem, index) => (
//                       <li className="group relative" key={menuItem.id}>

// {menuItem.href && <Link
//                             href={menuItem.href}
//                             className={`flex py-2 text-base font-semibold lg:text-xl  text-dark group-hover:opacity-70 dark:text-white lg:mr-0 md:inline-flex lg:py-6 lg:px-0`}
//                           >
//                             {menuItem.label}
//                           </Link>}


//                       </li>
//                     ))}



// <div>

// <ThemeToggler />
// </div>


//                   </ul>

            

//                 </nav>

  

//       </div>

//       <div className="flex items-center justify-end  pr-16  lg:pr-0">
           
//                 <Link
//                   href="/hire"
//                   className="ease-in-up  rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
//                 >
//                  Hire
//                 </Link>
                
//               </div>
//             </div>
//           </div>
//         </div>
//    </header>
   
//  </>
//   )
// }


export default Navbar