import Head from 'next/head'

import Navbar from '@/components/Header/Navbar'
import { CaseStudies } from '@/components/CaseStudies'
import { getAllCaseStudies, getFeaturedTags } from '@/lib/caseStudies'
import { Footer } from '@/components/Footer'

export default function Work({ caseStudies, tags }) {
  return (
    <>
      <Head>
        <title>Work - Jane Doe</title>
        <meta
          name="description"
          content="Explore an impressive collection of case studies showcasing a my diverse skill set, innovative solutions, and successful projects."
        />
      </Head>
      <Navbar/>
      <CaseStudies caseStudies={caseStudies} tags={tags} />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      caseStudies: await getAllCaseStudies(),
      tags: await getFeaturedTags(),
    },
  }
}
