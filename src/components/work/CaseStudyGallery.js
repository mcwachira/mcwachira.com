import Image from 'next/image'

import { Container } from '@/components/Container'

export function CaseStudyGallery({ images }) {
  return (
    <section className="py-16 overflow-hidden bg-slate-50 sm:py-24 lg:py-28 xl:py-32">
      <Container>
        <div className="grid max-w-lg gap-8 mx-auto sm:max-w-2xl sm:grid-cols-2 lg:mx-0 lg:max-w-none">
          {images.map((image, index) => (
            <div
              key={`image-${index}`}
              className="w-full overflow-hidden aspect-h-2 aspect-w-3 sm:aspect-h-3 sm:aspect-w-4"
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center w-full rounded-3xl bg-slate-100"
                quality={90}
                sizes="(min-width: 1280px) 37rem, (min-width: 1024px) calc(50vw - 3rem), (min-width: 640px) 20rem, calc(100vw - 2.5rem)"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
