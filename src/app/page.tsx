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
import ProjectsGrid from "@/components/Projects/ProjectsGrid";



export const metadata = {
    description:
        "I'm a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco. I've worked with hundreds of startups to help them develop their ideas into profitable businesses.",
}

export default function Home() {

  return (
      <>



        <Hero />
        <Experience/>
        <ToolsIconsRows/>
        <Services/>
        {/* <ProjectsGrid/> */}
        <FeaturedWork/>
        <FeaturedArticles/>


      </>
  )
}

