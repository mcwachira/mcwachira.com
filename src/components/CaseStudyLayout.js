import Head from 'next/head'

import Navbar from '@/components/Header/Navbar'
import { CaseStudyHero } from '@/components/CaseStudyHero'
import { CaseStudyDetails } from '@/components/CaseStudyDetails'
import { CaseStudyGallery } from '@/components/CaseStudyGallery'
import { CaseStudyTestimonial } from '@/components/CaseStudyTestimonial'
import { CaseStudyNavigation } from '@/components/CaseStudyNavigation'
import { Footer } from '@/components/Footer'

export function CaseStudyLayout({ data, children }) {
  return (
    <>
      <Head>
        <title>{`${data.title} - Jane Doe`}</title>
        <meta name="description" content={data.description} />
      </Head>
      <Header />
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
