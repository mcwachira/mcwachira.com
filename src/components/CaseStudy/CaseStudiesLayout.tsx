import React from 'react'
import { Work } from '@/types/work'
import Navbar from '@/components/Header/Navbar'
import { CaseStudyHero } from '@/components/CaseStudy/CaseStudyHero'
import { CaseStudyDetails } from '@/components/CaseStudy/CaseStudyDetails'
import { CaseStudyGallery } from '@/components/CaseStudy/CaseStudyGallery'
import { CaseStudyTestimonial } from '@/components/CaseStudy/CaseStudyTestimonial'
import { CaseStudyNavigation } from '@/components/CaseStudy/CaseStudyNavigation'
import  Footer  from '@/components/Footer'
import Head from 'next/head'

interface caseStudiesLayoutProps{
children:React.ReactElement,
data:Work
}

const CaseStudiesLayout = ({data, children}: caseStudiesLayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${data.title} - Jane Doe`}</title>
        <meta name="description" content={data.description} />
      </Head>
      <Navbar />
      <CaseStudyHero
        title={data.title}
        subtitle={data.subtitle}
        tags={data.tags}
        coverImage={data.coverImage}
      />
      <CaseStudyDetails
        client={data.client}
        description={data.description}
        projectDuration={data.projectDuration}
        projectURL={data.projectURL}
      >
        {children}
      </CaseStudyDetails>
      <CaseStudyGallery images={data.images} />
      <CaseStudyTestimonial
        clientName={data.client.name}
        testimonial={data.testimonial}
      />
      <CaseStudyNavigation navigation={data.navigation} />
      <Footer newsletter={false} />
    </>
  )
}

export default CaseStudiesLayout