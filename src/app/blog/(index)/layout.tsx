import {getAllCategories} from "../../../lib/articles";
import {BlogHero} from "@/components/BlogHero";
import {Container} from "@/components/ui/Container";
import {Tabs} from "@/components/Tabs";
import Pagination from "@/components/Pagination";
import Footer from "@/components/ui/Footer";
import React from "react";


export const metadata = {
  title: {
    template: 'Blog - %s - mcwachira',
    default: 'Blog',
  },
  description:
    'Explore a diverse range of blog posts covering web development, design, content creation, business, programming tutorials, and more.',
}

export default async function BlogLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
  const categories = await getAllCategories()

  return (
    <>
      <BlogHero />
      <section
        id="articles"
        className="overflow-hidden bg-light dark:bg-dark py-16 sm:py-24 lg:py-28"
      >
        <Container>
          <h2 className="text-center font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
            Latest Articles
          </h2>
          <Tabs
            tabs={categories}
            directory="blog"
            className="mt-9 justify-center gap-2"
          />
          {children}
          <Pagination />
        </Container>
      </section>
      <Footer />
    </>
  )
}
