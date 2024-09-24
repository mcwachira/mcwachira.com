import {Container} from "@/components/ui/Container";
import {Tabs} from "@/components/Tabs";
import Pagination from "@/components/Pagination";
import Footer from "@/components/ui/Footer";
import {getFeaturedTags} from "@/lib/caseStudies";
import React from "react";

export const metadata = {
  title: {
    template: 'Work - %s - mcwachira',
    default: 'Work',
  },
  description:
    'Explore an impressive collection of projects showcasing a my diverse skill set, innovative solutions, and successful projects.',
}

export default function WorkLayout({children,}: { children: React.ReactNode }) {
  return (
    <>
      <section className="overflow-hidden bg-ligth dark:bg-dark py-16 sm:pt-24 lg:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-display text-5xl font-semibold text-slate-900 sm:text-6xl lg:leading-none">
                Projects
              </h2>

              <p className="text-lg text-slate-700 lg:ml-auto lg:max-w-lg">
                Dive into my diverse range of projects, showcasing my expertise
                in software development, design, and dedication to delivering
                exceptional results.
              </p>
            </div>
            <Tabs
              className="mt-14 gap-x-1.5 gap-y-4 md:gap-x-1 lg:mt-16 lg:gap-2"
              tabs={getFeaturedTags()}
              directory={'work'}
            />
            {children}
            <Pagination />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
