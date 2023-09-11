import Navbar from "@/components/Header/Navbar";
import Experience from "@/components/Experience";
import { Hero } from "@/components/Hero";
import Head from "next/head";
import ToolsIconsRows from "@/components/Tools";
import Services from "@/components/Services/Services";
import FeaturedWork from "@/components/FeaturedWork";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { getAllArticles } from "@/lib/articles";
import  Footer  from "@/components/Footer";
import Testimonials from "@/components/Testimonials/Testimonials";
import FeaturedArticles from "@/components/FeaturedArticles";


export default function Home({ caseStudies, articles }) {
  console.log(articles)
  console.log(caseStudies)
  return (
    <>
     <Head>
        <title>Contact me - Mcwachira </title>
        <meta
          name="description"
          content="Hi, I'm Mcwachira , a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco."
        />
      </Head>
 
    <Navbar/>
      <Hero />
      <Experience/>
      <ToolsIconsRows/>
      <Services/>
      <FeaturedWork caseStudies={caseStudies} />
<Testimonials/>
      <FeaturedArticles articles={articles} />
      <Footer />

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
