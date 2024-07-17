import Navbar from "@/components/ui/Header/Navbar";
import Experience from "@/components/Experience";
import { Hero } from "@/components/Hero";
import Head from "next/head";
import ToolsIconsRows from "@/components/Tools";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import {FeaturedWork} from "@/components/work/FeaturedWork";
import {FeaturedPosts} from "@/components/blog/FeaturedPosts";
import Footer from "@/components/ui/Footer";



export const metadata = {
    description:
        "I'm a passionate developer, entrepreneur, and general technology enthusiast living in Nairobi. I creates websites and apps for startups and businesses, turning their ideas into functional digital solutions and profitable companies.",
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
          <FeaturedPosts />

<Footer/>
      </>
  )
}

