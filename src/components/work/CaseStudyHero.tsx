import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
interface TagProps {
    tag:string
}
function Tag({ tag }:TagProps) {
  const tagSlug = tag.replace(/ /g, '-').toLowerCase()
  const href = `/work/categories/${tagSlug}`

  return (
    <li>
      <Link
        href={href}
        className="inline-block px-6 py-2 text-sm font-medium transition duration-200 ease-in-out rounded-full bg-slate-50 text-slate-800 ring-1 ring-slate-100/80 hover:bg-slate-100/95 hover:text-slate-900 lg:text-md"
      >
        {tag}
      </Link>
    </li>
  )
}

interface CaseStudyHeroProps {
    title: string;
    subtitle: string;
    tags: string[];  // Allow an array of strings
    coverImage: string;
}

export function CaseStudyHero({ title, subtitle, tags, coverImage }:CaseStudyHeroProps) {
  return (
    <section className="pt-16 overflow-hidden bg-light dark:bg-dark sm:pt-20 lg:pt-28">
      <Container>
        <div className="max-w-lg mx-auto sm:max-w-3xl lg:mx-0 lg:max-w-none">
          <h1 className="text-4xl font-semibold leading-tight font-display text-slate-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            {title} - {subtitle}
          </h1>
          <ul className="flex flex-wrap items-center gap-4 mt-8 sm:gap-6">
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </ul>
        </div>
      </Container>
      <div className="relative block w-full mt-16 overflow-hidden aspect-h-9 aspect-w-16 md:aspect-h-2 md:aspect-w-5 lg:mt-20">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover w-full bg-slate-100"
          quality={90}
          priority
        />
      </div>
    </section>
  )
}
