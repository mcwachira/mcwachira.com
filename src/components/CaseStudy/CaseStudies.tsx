import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'



import { Container } from '@/components/Common/Container'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'


const  CaseStudies = ({ caseStudies, tags }:any)  =>{
  return (
    <section className="overflow-hidden bg-white py-16 sm:pt-24 lg:pt-32">
      <Container className=''>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display text-5xl font-semibold text-slate-900 sm:text-6xl lg:leading-none">
              Case Studies
            </h2>

            <p className="text-lg text-slate-700 lg:ml-auto lg:max-w-lg">
              Dive into my diverse range of projects, showcasing my expertise in
              software development, design, and dedication to delivering
              exceptional results.
            </p>
          </div>
          <Tabs
            className="mt-14 gap-x-1.5 gap-y-4 md:gap-x-1 lg:mt-16 lg:gap-2"
            tabs={tags}
            directory={'work'}
          />
          <div
            className={clsx(
              'mx-auto mt-12 grid max-w-xl gap-12 sm:mt-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2 lg:gap-10 xl:gap-24',
              caseStudies.length % 2 === 0 && 'lg:pb-32'
            )}
          >
            {caseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.title}
                className={clsx(
                  'flex flex-col gap-12 rounded-3xl bg-slate-50 px-7 py-12 sm:gap-14 sm:p-16 lg:py-14 lg:px-10 xl:gap-16 xl:p-16',
                  index % 2 === 0
                    ? 'rounded-tl-[64px]'
                    : 'transform rounded-br-[64px] lg:translate-y-24 xl:translate-y-32'
                )}
              >
                <Link
                  href={`/work/${caseStudy.slug}`}
                  className={clsx(
                    'group aspect-w-16 aspect-h-9 relative block w-full overflow-hidden rounded-xl md:aspect-w-3 md:aspect-h-2',
                    index % 2 === 0 ? 'order-1' : 'order-2'
                  )}
                >
                  <Image
                    src={caseStudy.thumbnail}
                    alt={caseStudy.title}
                    fill={true}
                    className="w-full rounded-xl bg-slate-100 object-cover object-top transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5"></div>
                </Link>
                <div
                  className={clsx(
                    'flex flex-col items-center',
                    index % 2 === 0 ? 'order-2' : 'order-1'
                  )}
                >
                  <h3 className="text-center font-display text-[28px] font-medium text-slate-900">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-5 text-center text-base leading-8 text-slate-700">
                    {caseStudy.description}
                  </p>
                  <Link
                    href={`/work/${caseStudy.slug}`}
                    className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-white py-3 px-9 text-md font-medium text-sky-900 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100/90 transition duration-300 hover:bg-white/60 hover:text-sky-700 hover:shadow-md hover:shadow-sky-100"
                  >
                    View Case study
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-sky-800 duration-300 ease-in-out group-hover:text-sky-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination />
        </div>
      </Container>
    </section>
  )
}


export default CaseStudies