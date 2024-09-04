import  Article  from '@/components/Article/Article'
import  Pagination  from '@/components/Pagination'
import  Tabs  from '@/components/Tabs'
import { Container } from '@/components/Common/Container'

export function Articles({ articles, categories }:any) {
  return (
    <section
      id="articles"
      className="overflow-hidden bg-light dark:bg-dark py-16 sm:py-24 lg:py-28"
    >
      <Container className=''>
        <h2 className="text-center font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Latest Articles
        </h2>
        <Tabs
          tabs={categories}
          directory="articles"
          className="mt-9 justify-center gap-2"
        />
        <div className="mx-auto mt-14 grid max-w-lg gap-8 sm:mt-16 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-y-6 lg:gap-x-5 xl:gap-x-6 xl:gap-y-8">
          {articles.map((article:any) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <Pagination />
      </Container>
    </section>
  )
}
