import Image from 'next/image'


import { Container } from './Common/Container'
import testimonialBG from '@/images/testimonial-bg.jpg'

export function CaseStudyTestimonial({ testimonial, clientName }) {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-3xl text-center font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
            Hear it straight from{' '}
            <span className="relative sm:whitespace-nowrap">
              <span className="relative text-sky-700">{clientName}</span>
            </span>{' '}
          </h2>

          <div className="relative mx-auto mt-14 w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-50 px-6 py-10 sm:mt-16 sm:p-12 md:px-16 md:py-14 lg:mt-20 lg:px-20 lg:py-16">
            <Image
              src={testimonialBG}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-left"
            />

            <blockquote className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                className="absolute -left-3 -top-6 h-20 w-20 text-slate-500/10 sm:-left-8 sm:-top-10 sm:h-28 sm:w-28"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M21.66145,33.81676c0,4.29661-3.96109,8.22346-8.91304,8.22346C4.56585,42.04022,1,35.98671,1,27.90615 c0-9.27484,9.34862-18.21943,17.83035-21.94637l2.26574,3.64916C14.10766,12.9954,8.88433,17.58691,8.14413,25.28492h2.89106 c3.09587,0,6.31198,0.4991,8.45903,2.72402C21.02498,29.59761,21.66145,31.62025,21.66145,33.81676z M47,33.81676 c0,4.29661-3.96109,8.22346-8.91304,8.22346c-8.18256,0-11.74842-6.05352-11.74842-14.13408 c0-9.27484,9.34862-18.21943,17.83035-21.94637l2.26574,3.64916c-6.98843,3.38646-12.21176,7.97797-12.95195,15.67598 c3.15316,0,5.76908-0.11425,8.09925,0.71955C45.21084,27.30299,47,30.10812,47,33.81676z"
                  ></path>
                </g>
              </svg>
              <p className="relative text-lg font-medium leading-8 text-slate-900 sm:text-xl sm:leading-10">
                &quot;{testimonial.text}&quot;
              </p>
            </blockquote>
            <div className="relative">
              <hr className="my-6 h-px w-full bg-slate-200" />
              <div className="flex items-center justify-between">
                <div className="flex w-auto items-center gap-5">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-sm ring-1 ring-slate-100/80">
                    <Image
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      className="h-14 w-14 object-cover"
                      fill={true}
                    />
                  </div>
                  <div>
                    <p className="font-display text-base font-medium text-slate-900">
                      {testimonial.author.name}
                    </p>
                    <p className="mt-1 text-md text-slate-600">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
                <div className="hidden gap-0.5 sm:flex">
                  {[...Array(5)].map((i, n) => (
                    <svg
                      key={`star-${n}`}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
