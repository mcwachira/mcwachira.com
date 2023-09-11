import Image from 'next/image'

import { Container } from './Common/Container'

export function CaseStudyGallery({ images }) {
  return (
    <section className="overflow-hidden bg-slate-50 py-16 sm:py-24 lg:py-28 xl:py-32">
      <Container>
        <div className="mx-auto grid max-w-lg gap-8 sm:max-w-2xl sm:grid-cols-2 lg:mx-0 lg:max-w-none">
          {images.map((image, index) => (
            <div
              key={`image-${index}`}
              className="aspect-w-3 aspect-h-2 w-full overflow-hidden sm:aspect-w-4 sm:aspect-h-3"
            >
              <Image
                src={image}
                alt=""
                fill={true}
                className="w-full rounded-3xl bg-slate-100 object-cover object-center"
                quality={90}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
