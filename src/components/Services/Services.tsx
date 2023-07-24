import React from 'react'
import SectionTitle from '../Common/SectionTitle'
import SingleService from './SingleService'
import ServicesData from './ServicesData'

const Services = () => {
  return (

<>
      <section
        id="features"
        className="bg-primary/[.03] py-16 md:py-20 lg:py-28"
      >
        <div className="container ">

          <div className='text-center'>


          <SectionTitle
        
            title="My Services"
            paragraph="Here is what I can help you with"
          />
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 md:gap-14 lg:grid-cols-2 lg:gap-16">
            {ServicesData.map((service) => (
              <SingleService key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

</>
  )
}

export default Services