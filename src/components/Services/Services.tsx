import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import ServicesData from './ServicesData'
import SingleService from './SingleServices'
import { Container } from '../Common/Container'


const Services = () => {
  return (

<>
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <Container className="">

          <div className='text-center'>


          <SectionTitle
        
            title="My Services"
            paragraph="Here is what I can help you with"
          />
          </div>
          {/* <div className="absolute inset-y-0 left-0 h-full w-64 bg-gradient-to-r from-white/50 to-white/0" />
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
              Services I offer
            </span>
          </div> */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 md:gap-14 lg:grid-cols-2 lg:gap-16 lg:gap-x-24 py-24">
            
            {ServicesData.map((service) => (
              <SingleService key={service.id} service={service} />
            ))}
          </div>
   
        </Container>
      </section>

</>
  )
}

export default Services