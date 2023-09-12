import Image from 'next/image'
import Link from 'next/link'


import { Container } from '@/components/Common/Container'
import { Work } from '@/types/work'

function Tag({ tag }) {
  const tagSlug = tag.replace(/ /g, '-').toLowerCase()
  const href = `/work/${tagSlug}`

  return (
    <li>
      <Link
        href={href}
        className="inline-block rounded-full bg-slate-50 px-6 py-2 text-sm font-medium text-slate-800 ring-1 ring-slate-100/80 transition duration-200 ease-in-out hover:bg-slate-100/95 hover:text-slate-900 lg:text-md"
      >
        {tag}
      </Link>
    </li>
  )
}

export function CaseStudyHero({ title, subtitle, tags, coverImage }:Work) {
  return (
    <section className="overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-28">
      <Container>
        <div className="mx-auto max-w-lg sm:max-w-3xl lg:mx-0 lg:max-w-none">
          <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            {title} - {subtitle}
          </h1>
          <ul className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            {tags.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </ul>
        </div>
      </Container>
      <div className="aspect-w-16 aspect-h-9 relative mt-16 block w-full overflow-hidden md:aspect-w-5 md:aspect-h-2 lg:mt-20">
        <Image
          src={coverImage}
          alt={title}
          fill={true}
          className="w-full bg-slate-100 object-cover"
          quality={90}
        />
      </div>
    </section>
  )
}
