import Link from 'next/link'
import { compareDesc } from 'date-fns'

import { Container } from '@/components/Container'
import { allCaseStudies } from 'contentlayer/generated'

function getSortedCaseStudiesAndIndex(caseStudySlug) {
  const caseStudies = allCaseStudies.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const index = caseStudies.findIndex((p) => p.slug === caseStudySlug)
  return { caseStudies, index }
}

function prev(caseStudySlug) {
  const { caseStudies, index } = getSortedCaseStudiesAndIndex(caseStudySlug)
  return caseStudies[index - 1] ?? caseStudies[caseStudies.length - 1]
}

function next(caseStudySlug) {
  const { caseStudies, index } = getSortedCaseStudiesAndIndex(caseStudySlug)
  return caseStudies[index + 1] ?? caseStudies[0]
}

export function CaseStudyNavigation({ caseStudySlug }) {
  const prevCaseStudy = prev(caseStudySlug)
  const nextCaseStudy = next(caseStudySlug)

  return (
    <section className="py-8 border-t border-slate-200">
      <Container>
        <div className="flex items-center justify-between">
          <Link href={prevCaseStudy.url} className="group space-y-1.5">
            <div className="flex items-center gap-1 duration-200 text-slate-500 group-hover:text-sky-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </div>

            <div className="hidden sm:block">
              <h4 className="text-lg font-medium font-display text-slate-900 md:text-xl">
                {prevCaseStudy.title}
              </h4>
            </div>
          </Link>

          <Link
            href="/work"
            className="flex items-center justify-center w-12 h-12 duration-200 rounded-full shadow-sm group bg-slate-50 ring-1 ring-slate-100/80 hover:bg-sky-600 md:h-14 md:w-14"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 duration-200 text-slate-500 group-hover:text-sky-50 md:h-5 md:w-5"
            >
              <path
                fillRule="evenodd"
                d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <Link href={nextCaseStudy.url} className="group space-y-1.5">
            <div className="flex items-center justify-end gap-1 duration-200 text-slate-500 group-hover:text-sky-500">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="hidden sm:block">
              <h4 className="text-lg font-medium font-display text-slate-900 md:text-xl">
                {nextCaseStudy.title}
              </h4>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  )
}
