import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Container } from '../Common/Container'


const CaseStudies = ({caseStudies, tags}) => {
  return (
      <section className="overflow-hidden bg-white py-16 sm:pt-24 lg:pt-32">
      <Container className="">

  <div className="mx-auto max-w-2xl lg:mx-0:lg:max-w-none">

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
  </div>
</Container>


      </section>
  )
}

export default CaseStudies