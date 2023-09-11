import Navbar from "@/components/Header/Navbar";
import Experience from "@/components/Experience";
import { Hero } from "@/components/Hero";
import Head from "next/head";
import ToolsIconsRows from "@/components/Tools";
import Services from "@/components/Services/Services";
import FeaturedWork from "@/components/FeaturedWork";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { getAllArticles } from "@/lib/articles";


export default function Home({ caseStudies, articles }) {
  console.log(articles)
  console.log(caseStudies)
  return (
    <>
    {/* <Head>
        <h1 className='my-8 mx-auto text-sm w-10/12 text-warmGay-800 sm:text-2xl md:text-left md:text-3xl md:text-black md:w-full lg:text-4xl'>
        Mcwachira&#8216;s Blog and Portfolio site</h1>
        <meta name="description" content="personal website blog and portfolio" />
        <link rel="icon" href="/favicon.ico" />
    </Head> */}
 
    <Navbar/>
      <Hero />
      <Experience/>
      <ToolsIconsRows/>
      <Services/>
      <FeaturedWork caseStudies={caseStudies} />



   </>
  )
}
export async function getStaticProps() {
  return {
    props: {
      caseStudies: await getAllCaseStudies(),
      articles: await getAllArticles(),
    },
  }
}
