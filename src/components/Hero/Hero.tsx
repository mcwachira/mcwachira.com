import React from 'react'
import SectionTitle from '../Common/SectionTitle'

import styles from '../styles/Home.module.css'
// import styled from 'styled-components'
import { Twitter, LinkedinSquare ,Github, Instagram} from 'styled-icons/boxicons-logos'
import { Blog } from 'styled-icons/icomoon'

import Link from 'next/link'
import Image from 'next/image'
const Hero = () => {
  return (

    <>

  <section id="about" className="pt-16 md:pt-20 lg:pt-28">

<div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2 flex flex-col items-center ">


<div>
<p className="text-lg mt-24  !leading-relaxed text-body-color md:text-2xl my-10">
            Hey There 👋 I am
        </p>

       
              <SectionTitle
                title="Charles Wachira"
                paragraph="I am a Fullstack Software developer helping Startup&#8216;s build mobile and web applications that their users will love.
                "
              />



<div className="flex items-center ">
           
           <Link
             href="/hire"
             className="ease-in-up  rounded-md dark:bg-primary bg-black py-4 px-8 text-lg font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
           >
           Contact Me
           </Link>
           
         </div>
              </div>
              </div>
              <div className="w-full -mt-8 lg:mt-0 px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative  mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/profile/no-background.png"
                  alt="about-image"
                  width={500}
                  height={500}
                  className="mx-auto max-w-full lg:mr-0 hidden dark:block"
                />

<Image
                  src="/images/profile/no-background.png"
                  alt="about-image"
                  width={500}
                  height={500}
                  className="mx-auto max-w-full lg:mr-0 dark:hidden"
                />
              </div>
            </div>
              </div>
              </div>
              </div>
  </section>



  </>
  )
}

export default Hero
