import { Container } from './Common/Container'
import Image from 'next/image'

import bgGradient from '@/images/blog-hero-bg.png'

export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-white lg:px-8">
      <Container className="relative bg-slate-50 py-16 sm:py-24 lg:rounded-b-3xl lg:py-32">
        <Image
          src={bgGradient}
          alt=""
          className="absolute inset-0 h-full w-full opacity-75"
        />
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-center font-display text-5xl font-semibold text-slate-900 sm:text-6xl">
            Welcome to{' '}
            <span className="relative whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="249"
                height="22"
                viewBox="0 0 249 22"
                fill="currentColor"
                className="absolute left-0 top-2/3 h-[0.6em] w-full scale-110 fill-sky-200/75"
              >
                <path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
              </svg>
              <span className="relative">my blog</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-slate-700">
            Join me on my journey as I share my insights and experiences on web
            development, business, and content creation.
          </p>
          <form
            action="#"
            method="post"
            className="relative mt-12 w-full max-w-lg"
          >
            <div className="absolute -left-48 -top-12 hidden lg:flex xl:-left-72">
              <span className="inline-block max-w-[175px] -rotate-12 transform font-writing text-2xl text-slate-600">
                Subscribe to my newsletter
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="91"
                height="49"
                viewBox="0 0 91 49"
                fill="none"
                className="relative -top-5 left-0 h-auto w-20 text-slate-600"
              >
                <g clipPath="url(#clip0_324_1142)">
                  <path
                    d="M1.69238 27.312C20.3067 17.6575 42.2779 13.0915 62.6792 20.3817C68.653 22.5164 74.9261 26.8457 79.7975 31.004C80.8268 31.8828 81.6964 32.9264 82.5869 33.944C83.4001 34.8733 83.6539 26.1696 83.7375 25.1594C84.6308 14.3591 83.4075 25.9604 83.6012 30.1072C83.7516 33.3254 84.9068 36.8047 84.5415 40.0293C84.2474 42.6259 79.3878 40.8403 77.6335 40.5719C75.8298 40.2959 63.737 40.239 66.2469 36.714C70.7498 30.3895 77.2856 27.0444 83.4264 22.7486"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_324_1142">
                    <rect
                      width="85"
                      height="29"
                      fill="white"
                      transform="translate(83 49) rotate(-165.831)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <input
              type="email"
              className="h-12 w-full rounded-full border-0 bg-white/95 py-3.5 pl-5 pr-32 text-sm leading-5 text-slate-900 placeholder-slate-400 shadow-md shadow-sky-100/50 outline-none ring-1  ring-slate-900/5 duration-200 ease-in-out focus:border-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-900/20 sm:pl-6 sm:text-md"
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 inline-flex h-10 items-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-sky-50 outline-none transition duration-200 ease-in-out hover:bg-sky-800 focus:outline-none sm:px-7 sm:text-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}
