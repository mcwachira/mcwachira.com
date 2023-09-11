import Head from 'next/head'

import Navbar from '@/components/Header/Navbar'
import  AboutHero from '@/components/AboutHero'
import { WorkExperience } from '@/components/WorkExperience'
import { Workstation } from '@/components/Workstation'
import { Stack } from '@/components/Stack'

import { Footer } from '@/components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Mcwachira</title>
        <meta
          name="description"
          content="Hi, I'm Mcwachira, a passionate developer, entrepreneur, and general technology enthusiast living in Nairobi."
        />
      </Head>
      <Navbar/>
      <AboutHero />
      {/* <WorkExperience />
      <Workstation /> */}
      <Stack /> 
      <Footer />
    </>
  )
}
