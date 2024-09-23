import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import mongodb from '../images/logos/icons/mongodb.png'
import javascript from '../images/logos/icons/javascript.png'
import html5 from '../images/logos/icons/html5.png'
import css from '../images/logos/icons/css.png'
import netlify from '../images/logos/icons/netlify.png'
import python from '../images/logos/icons/python.png'
import postgresql from '../images/logos/icons/postgresql.png'
import tailwind from '../images/logos/icons/tailwindcss.png'
import nodejs from '../images/logos/icons/nodejs.png'
import nextjs from '../images/logos/icons/nextjs.png'
import golang from '../images/logos/icons/golang.png'
import aws from '../images/logos/icons/aws.png'
import c from '../images/logos/icons/c.png'
import firebase from '../images/logos/icons/firebase.png'


const icons = [

    {
      name: 'HTML5',
      icon: html5,
    },
    {
      name: 'CSS',
      icon: css,
    },
 
    {
      name: 'Tailwind CSS',
      icon: tailwind,
    },
    {
      name: 'Javascript',
      icon: javascript,
    },
    {
      name: 'Nextjs',
      icon: nextjs,
    },
    {
      name: 'Aws',
      icon: aws,
    },
    {
      name: 'Nodejs',
      icon: nodejs,
    },
 
    {
      name: 'Golang',
      icon: golang,
    },
 
    {
      name: 'Postgresql',
      icon: postgresql,
    },

    {
      name: 'Firebase',
      icon: firebase,
    },
    {
      name: 'Python',
      icon: python,
    },
    {
      name: 'Netlify',
      icon: netlify,
    },
    // {
    //   name: 'C programming language',
    //   icon: c,
    // },
    {
      name: 'MongoDb',
      icon: mongodb,
    },
  ]


  function getTopMargin(index:number) {
    if (index % 6 === 0) {
      return 'mt-0'
    } else if (index % 2 === 0) {
      return 'mt-16'
    } else if (index % 3 === 0) {
      return 'mt-24'
    } else {
      return 'mt-8'
    }
  }


import { StaticImageData } from 'next/image';

interface StackIconProps {
    icon: string | StaticImageData;  // Supports both image URLs and static imports
    alt: string;  // Alt text is always a string
    index: number;  // Used to calculate the top margin
}

  function StackIcon({ icon, alt, index }:StackIconProps) {
    const mtClass = getTopMargin(index)
    return (
      <div
        className={clsx(
          'flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-50/90 shadow-sm shadow-sky-100 ring-1 ring-slate-100 sm:h-[88px] sm:w-[88px]',
          mtClass
        )}
      >
        <Image src={icon} alt={alt} className="h-auto w-8 shrink-0 sm:w-10" />
      </div>
    )
  }
  

const ToolsIconsRows = () => {
    return (
        <section className="relative flex justify-center gap-x-12 overflow-x-clip bg-light dark:bg-dark pt-16 sm:gap-x-16 lg:pt-12 lg:pb-14">
          <div className="absolute inset-y-0 left-0 h-full w-64 bg-gradient-to-r from-white/50 to-white/0" />
          <div className="absolute inset-y-0 right-0 h-full w-64 bg-gradient-to-l from-white/50 to-white/0" />
          <div className="absolute -top-2.5 right-4 flex transform gap-6 sm:right-16 lg:top-[unset] lg:right-0 lg:-bottom-12 xl:-bottom-20 2xl:right-32">
            <svg
              viewBox="0 0 107 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative -top-4 -right-1 h-auto w-[68px] rotate-[160deg] transform text-slate-600 lg:w-20 lg:rotate-[30deg] lg:-scale-x-100"
            >
              <path
                d="M0.447937 18.1614C9.81014 31.5352 18.4347 42.3598 31.519 52.0087C40.0175 58.2759 54.5547 65.2946 64.1291 57.0482C74.8617 47.8042 84.2643 34.1413 91.7659 22.1683C95.8416 15.6632 100.326 9.79988 103.994 3.06629C104.777 1.62775 106.117 0.590713 103.454 1.84721C99.6476 3.64332 95.7206 5.00081 91.7126 6.32044C84.0852 8.83174 82.4146 9.9082 92.4987 7.40962C94.8989 6.81489 101.851 3.59526 104.567 4.38527C107.097 5.12145 106.361 12.9525 106.422 14.9305C106.9 30.442 95.1386 15.7417 88.7647 11.1467"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="inline-block w-48 rotate-6 transform font-writing text-[22px] tracking-wide text-slate-600 lg:text-2xl">
              The tools I use on my day-to-day
            </span>
          </div>
          {icons.map((item, index) => (
            <StackIcon
              key={`stack-${index}`}
              icon={item.icon}
              alt={item.name}
              index={index}
            />
          ))}
        </section>
      )
    }
    

export default ToolsIconsRows