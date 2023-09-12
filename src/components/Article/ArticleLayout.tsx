import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {MetaTypes } from '@/types/types'
import  Navbar from '@/components/Header/Navbar'
import Footer  from '@/components/Footer'
import { formatDate } from '@/lib/formatDate'
import { LinkedInIcon, InstagramIcon, TwitterIcon } from '@/components/SocialIcons'
import {
  WebDevelopmentIcon,
  TutorialIcon,
  BusinessIcon,
  ContentCreationIcon,
} from '@/components/CategoryIcons'
import React from 'react'

const iconOptions = {
  'Web Development': WebDevelopmentIcon,
  Business: BusinessIcon,
  'Content Creation': ContentCreationIcon,
  Tutorials: TutorialIcon,
}

const SocialLink = ({ icon: Icon, ...props }) =>  {
  return (
    <Link
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 duration-200 hover:bg-slate-50"
      {...props}
    >
      <Icon className="h-3.5 w-3.5 fill-slate-500 transition group-hover:fill-slate-600" />
    </Link>
  )

}


interface articleLayoutTypes {
  meta:MetaTypes;
children:React.ReactNode
}
export function ArticleLayout({ meta, children }:articleLayoutTypes) {
  const categorySlug = meta.category.replace(/ /g, '-').toLowerCase()
  const CategoryIcon = iconOptions[meta.category]

  return (
    <>
      <Head>
        <title>{`${meta.title} - Jane Doe`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Navbar />
      <main>
        <article>
          {/* Article Header */}
          <header className="relative bg-slate-50 py-16 sm:pt-24 lg:pt-28">
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-white" />
            <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
              <Link
                href={`/articles/${categorySlug}#articles`}
                className="group inline-flex items-center justify-center gap-3.5 text-base leading-5 tracking-wide text-sky-700 transition duration-200 ease-in-out hover:text-sky-600 sm:text-lg"
              >
                <CategoryIcon className="h-[18px] w-[18px] text-sky-700/90 transition duration-200 group-hover:text-sky-600 sm:h-5 sm:w-5" />
                {meta.category}
              </Link>
              <h1 className="mt-6 text-center font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
                {meta.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-700">
                {meta.description}
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 text-md text-slate-500">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    className="h-6 w-6 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    className="h-6 w-6 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {`${meta.timeToRead} minute read`}
                </span>
              </div>
              <div className="mx-auto mt-16 w-full max-w-4xl">
                <div className="aspect-w-16 aspect-h-9 relative block w-full overflow-hidden rounded-3xl shadow-lg shadow-sky-100/50 md:aspect-w-3 md:aspect-h-2">
                  <Image
                    src={meta.image}
                    alt={meta.title}
                    fill={true}
                    className="w-full rounded-3xl bg-slate-100 object-cover "
                  />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/10"></div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg mx-auto max-w-2xl">{children}</div>
            <footer className="mx-auto max-w-2xl">
              <hr className="mt-14 h-px w-full pb-6 text-slate-300/75 sm:pb-4" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="pl-0.5 text-lg font-semibold tracking-wide text-slate-900 sm:pl-0">
                  Share article
                </p>
                <div className="mt-2.5 flex gap-3 sm:mt-0 sm:gap-4">
                  <button className="group flex h-10 items-center justify-center gap-3 rounded-full border border-slate-200 px-6 text-sm font-medium text-slate-600 duration-200 ease-in-out hover:bg-slate-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 text-slate-500 transition duration-200 ease-in-out group-hover:text-slate-600"
                    >
                      <g
                        strokeWidth="1.25"
                        fill="none"
                        stroke="currentCOlor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2.5" y="3.5" width="10" height="12"></rect>{' '}
                        <polyline
                          points="4.5,0.5 15.5,0.5 15.5,13.5 "
                          stroke="currentCOlor"
                        ></polyline>{' '}
                        <line x1="5.5" y1="6.5" x2="9.5" y2="6.5"></line>{' '}
                        <line x1="5.5" y1="9.5" x2="9.5" y2="9.5"></line>{' '}
                        <line x1="5.5" y1="12.5" x2="9.5" y2="12.5"></line>
                      </g>
                    </svg>
                    Copy link
                  </button>
                  <SocialLink
                    href="https://linkedin.com"
                    aria-label="Share on LinkedIn"
                    icon={LinkedInIcon}
                  />

                  <SocialLink
                    href="https://instagram.com"
                    aria-label="Share on Instagram"
                    icon={InstagramIcon}
                  />
                  <SocialLink
                    href="https://twitter.com"
                    aria-label="Share on Twitter"
                    icon={TwitterIcon}
                  />
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}


export default ArticleLayout