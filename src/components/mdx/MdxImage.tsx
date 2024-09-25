import Image, { ImageProps } from 'next/image';

interface MdxImageProps extends ImageProps {
    alt: string;
    caption?: string;
}

export function MdxImage({ alt, caption, src, ...props }: MdxImageProps) {
    if (!src) {
        console.error("Image src is required!");
        return null; // Optionally render a placeholder or handle this case
    }

    return (
        <figure>
            <Image className="w-full h-auto rounded-lg" {...props} src={src} alt={alt} />
            {caption && (
                <figcaption className="mt-3 text-sm text-center text-gray-500">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
