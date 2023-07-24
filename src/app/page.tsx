'use client'

import Head from 'next/head'

import Hero from '../components/Hero/Hero';
import About from '@/components/About/About';
import ProjectsGrid from '@/components/Projects/ProjectsGrid';
import Services from '@/components/Services/Services';
import Experience from '../components/Experience/Experience';

export default function Home() {


    return (
        <>
        <div>
            <Head>
                <h1 className='my-8 mx-auto text-sm w-10/12 text-warmGay-800 sm:text-2xl md:text-left md:text-3xl md:text-black md:w-full lg:text-4xl'>
                Mcwachira&#8216;s Blog and Portfolio site</h1>
                <meta name="description" content="personal website blog and portfolio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


<Hero/>
<About/>
<Services/>
<ProjectsGrid/>
<Experience/>
             
        </div>
        </>
    )
}

