import Image from 'next/image'

export function MdxImage({ alt, caption, ...props }) {
  return (
    <figure>
      <Image className="w-full h-auto rounded-lg" {...props} alt={alt} />
      {caption && (
        <figcaption className="mt-3 text-sm text-center text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
