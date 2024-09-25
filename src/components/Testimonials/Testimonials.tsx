import Image from 'next/image'
import { useEffect, useState } from 'react'
import testimonials from './testimonialData'

import zendesk from '@/images/logos/zendesk.svg'
import intercom from '@/images/logos/intercom.svg'
import coursera from '@/images/logos/coursera.svg'
import unbounce from '@/images/logos/unbounce.svg'
import prismic from '@/images/logos/prismic.svg'
import codesee from '@/images/logos/codesee.svg'
import booqable from '@/images/logos/booqable.svg'
import tapcart from '@/images/logos/tapcart.svg'
import mailchimp from '@/images/logos/mailchimp.svg'
import instagram from '@/images/logos/instagram.svg'

// Import Swiper
// core version + navigation, pagination modules:
import { Navigation } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import {Container} from "@/components/ui/Container";








const Testimonials = () => {

  //  let testimonialsCount = parseFloat(testimonials?.length)



  let testimonialsCount = testimonials?.length
  let [swiperIndex, setSwiperIndex] = useState(1)
  let [carouselProgress, setCarouselProgress] = useState(15)


  useEffect(() => {
    let screenWidth = window.innerWidth
    if(screenWidth >= 1138){
      setCarouselProgress(((swiperIndex + 3) /testimonialsCount) * 100)
    }

  },[swiperIndex, testimonialsCount])
  return (
<section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:pt-32 ">

<Container className="relative">
<div className="mx-auto grid max-w-xl gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
              Here’s what past clients are saying about me
            </h2>
            <div className="mt-10 hidden h-[10px] w-full rounded-full bg-gray-300 lg:mt-16 lg:block">
              <div
                className="h-full rounded-full bg-gray-500 duration-200"
                style={{ width: `${carouselProgress}%` }}
              ></div>
            </div>
          </div>


          <div className="lg:ml-auto lg:max-w-sm">
            <p className="text-lg text-slate-700">
            We owe our business&apos;s online success to this developer. They&apos;re not just technically skilled but also have a keen eye for design, creating a perfect blend for profitability.
            </p>
            <div className="mt-14 flex gap-2.5 lg:mt-12">
              <button className="carousel-prev inline-flex h-12 w-12 items-center justify-center rounded-full bg-light shadow-sm shadow-sky-200/75 ring-1 ring-slate-200/60 duration-200 hover:bg-sky-50/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 text-sky-700/70"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="carousel-next inline-flex h-12 w-12 items-center justify-center rounded-full bg-light shadow-sm shadow-sky-200/75 ring-1 ring-slate-200/60 duration-200 hover:bg-sky-50/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 text-sky-700/70"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className="relative mt-8 lg:mt-24">

      <Container className="relative">
        <Swiper
   modules={[Navigation]}
   navigation={{ nextEl: '.carousel-next', prevEl: '.carousel-prev' }}
   scrollbar={{ draggable: true }}
   spaceBetween={0}
   slidesPerView="auto"
   grabCursor={true}
   loop={false}
   centeredSlides={false}
   initialSlide={0}
   onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
   className="!overflow-visible"
 >
 <div className="flex w-full">
              {testimonials.map((testimonial, testimonialIndex) => (
                <SwiperSlide
                  key={`testimonial-${testimonialIndex}`}
                  className="swiper-slide !h-auto !w-auto shrink-0 border-b border-l border-t border-slate-200 p-10 shadow-sm shadow-sky-100/50 first:rounded-l-2xl last:rounded-r-2xl last:border-r"
                >
                  <div className="flex h-full w-full max-w-[272px] flex-1 flex-col">
                    <div className="flex-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((i, n) => (
                          <svg
                            key={`testimonial-${testimonialIndex}-star-${n}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <h4 className="mt-7 font-display text-xl font-medium text-slate-900">
                        {testimonial.headline}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-700">
                        {testimonial.content}
                      </p>
                    </div>
                    <div>
                      <hr className="my-6 h-px w-full bg-slate-200" />
                      <div className="flex items-center justify-between">
                        <div className="">
                          <p className="font-display text-md font-medium text-slate-900">
                            {testimonial.author.name}
                          </p>
                          <p className="mt-1.5 text-sm text-slate-600">
                            {testimonial.author.role}
                          </p>
                        </div>
                        <Image
                          src={testimonial.author.image}
                          alt={testimonial.author.name}
                          className="h-14 w-14 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </Container>
        <div className="absolute inset-y-0 right-0 z-10 hidden bg-gradient-to-r from-slate-50/0 to-slate-50/80 2xl:block 2xl:w-64"></div>
      </div>

    </section>
  )
}


export default Testimonials