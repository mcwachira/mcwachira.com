'use client'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/ui/Container'
import heroPortrait from '@/images/1.jpg'
import javascript from '@/images/logos/icons/javascript.png'
import react from '@/images/logos/icons/react.png'
import golang from '@/images/logos/icons/golang.png'
import nodejs from '@/images/logos/icons/nodejs.png'
import mongodb from '@/images/logos/icons/mongodb.png'
import nextjs from '@/images/logos/icons/nextjs.png'
import postgresql from '@/images/logos/icons/postgresql.png'
import tailwind from '@/images/logos/icons/tailwindcss.png'
import {
  DribbbleIcon,
  GitHubIcon,
  InstagramIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import React from 'react'
import { Url } from 'next/dist/shared/lib/router/router'
import { UrlObject } from 'url';
import { useTheme } from 'next-themes'
import clsx from 'clsx'



interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string | Url;
  className?: string;  // Optional className if needed
}

function SocialLink({ icon: Icon, href, className = '', ...props }: SocialLinkProps) {
  return (
      <Link
          href={href}
          className={`border-slate-200 hover:bg-slate-50 flex h-11 w-11 items-center justify-center rounded-full border duration-200 ${className}`}
          {...props}  // Remaining props passed to the Link
      >
        <Icon className="fill-slate-600 group-hover:fill-slate-700 h-4 w-4 transition" />
      </Link>
  );
}

export function Hero() {

  return (
    <section className="relative overflow-hidden bg-light py-20 dark:bg-dark lg:py-24">
      {/* Light blue gradient background */}
      <svg
        width={1728}
        height={894}
        viewBox="0 0 1728 894"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 top-56 w-auto lg:inset-y-0"
      >
        <g clipPath="url(#clip0_8_95)">
          <g opacity="0.6" filter="url(#filter0_f_8_95)">
            <path
              d="M201.4 582.997H330V342.155L23 501.52L201.4 582.997Z"
              fill="#60A5FA"
              fillOpacity="0.45"
            />
            <path
              d="M330 342.155V284H90H-70L23 501.52L330 342.155Z"
              fill="#7DD3FC"
              fillOpacity="0.8"
            />
            <path
              d="M-70 582.997H201.4L23 501.52L-70 284V582.997Z"
              fill="#F0FDFA"
              fillOpacity="0.5"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_8_95"
            x={-370}
            y={-16}
            width={1000}
            height="898.997"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={150}
              result="effect1_foregroundBlur_8_95"
            />
          </filter>
          <clipPath id="clip0_8_95">
            <rect width={1728} height={894} fill="white" />
          </clipPath>
        </defs>
      </svg>

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center lg:items-start">
          <h1 className="font-display text-slate-900 text-center text-5xl font-semibold sm:text-6xl lg:text-left">
            <span className="relative whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="249"
                height="22"
                viewBox="0 0 249 22"
                fill="currentColor"
                className="fill-sky-200/75 absolute left-0 top-2/3 h-[0.6em] w-full"
              >
                <path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
              </svg>
              <span className="relative">Helping</span>
            </span>{' '}
            businesses turn their ideas into reality
          </h1>
          <p className="text-slate-700 mt-6 text-center text-lg leading-8 lg:text-left">
            I&apos;m a passionate developer, entrepreneur, and general
            technology enthusiast living in Nairobi. I creates websites and apps
            for startups and businesses, turning their ideas into functional
            digital solutions and profitable businesses.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-start">
            <Button
              href="tel:0726601941"
              className="h-11  bg-dark !text-light dark:bg-light  dark:!text-dark"
            >
              Book a call with me
            </Button>

            <div className="flex gap-3 sm:gap-4">
              <SocialLink
                href="https://github.com/mcwachira"
                target="_blank"
                aria-label="Follow on Github"
                icon={GitHubIcon}
              />

              <SocialLink
                href="https://www.instagram.com/mcwachira/"
                target="_blank"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://twitter.com/mc_wachira"
                target="_blank"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg lg:mr-0">
          <div className="bg-slate-50 aspect-h-5 aspect-w-4 relative rounded-2xl">
            <Image
              className="h-full w-full rounded-2xl object-cover object-center"
              src={heroPortrait}
              alt=""
              sizes="(min-width: 552px) 32rem, calc(100vw - 40px)"
              width={500}
              height={500}
              //   fill
              priority
            />
            <div>
              <div className="absolute hidden w-max md:left-full md:top-16 md:block lg:-left-28 lg:-top-8 2xl:left-full 2xl:top-16 ">
                <span className="font-writing text-slate-600 inline-block transform text-2xl tracking-wide md:rotate-[16deg] lg:translate-x-6 lg:rotate-[-18deg] 2xl:rotate-12">
                  Hi, I&apos;m mcwachira!
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="103"
                  height="102"
                  viewBox="0 0 103 102"
                  fill="none"
                  className="text-slate-600 h-auto w-28 md:-translate-x-1/2 md:-translate-y-6 md:rotate-0 lg:-translate-y-3 lg:translate-x-3/4 lg:rotate-12 lg:-scale-x-100 2xl:-translate-x-1/2 2xl:-translate-y-6 2xl:rotate-0 2xl:scale-x-100"
                >
                  <g>
                    <path
                      d="M100.676 26.5417C93.9574 46.1137 83.3723 65.5204 62.3048 74.1115C51.0557 78.6989 36.7215 76.3709 36.7673 62.5332C36.7985 53.1087 42.243 38.3844 53.849 37.3949C66.6654 36.3021 46.8111 57.0334 44.2548 58.8791C32.2897 67.5184 20.2216 71.4112 5.76428 74.151C0.348605 75.1774 3.24474 76.5966 6.85897 77.2296C9.99484 77.7788 13.5771 78.3248 16.755 78.0657C17.7243 77.9867 11.502 77.2793 10.5148 77.213C6.28171 76.9284 1.40658 76.4418 2.9682 71.2948C3.21916 70.4678 6.25335 62.9691 7.53037 63.112C8.19484 63.1864 9.21134 68.8129 9.5344 69.5548C11.6329 74.3731 14.1134 76.5032 19.3253 77.6737"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="shadow-sky-100/50 ring-slate-900/5 absolute -top-6 right-12 inline-flex h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-light/90 px-8 text-sm font-semibold !text-dark shadow-lg ring-1 backdrop-blur-md md:-left-28 md:top-14 lg:-top-6 lg:left-44 lg:px-10 2xl:-left-48 2xl:top-14">
                <Image src={react} alt="" className="h-auto w-4" priority />
                4+ years of experience
              </div>
              <div className="shadow-sky-100/50 ring-slate-900/5 absolute left-12 top-full inline-flex h-12 w-max -translate-y-6 items-center justify-center gap-3.5 rounded-2xl bg-light/90 px-8 text-sm font-semibold !text-dark shadow-lg ring-1 backdrop-blur-md md:left-0 md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 lg:px-10 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32">
                <Image src={nodejs} alt="" className="h-6 w-auto" priority />
                4+ years of experience
              </div>
              <div className="text-slate-700 shadow-sky-100/50 ring-slate-900/5 absolute top-[350px] hidden h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-light/90 px-8 text-sm font-semibold shadow-lg ring-1 backdrop-blur-md md:left-full md:inline-flex md:-translate-x-32 lg:left-48 lg:hidden lg:px-10 2xl:left-full 2xl:inline-flex 2xl:-translate-x-28">
                <Image
                  src={javascript}
                  alt=""
                  className="h-auto w-7"
                  priority
                />
                <span className="">4 years of experience</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
