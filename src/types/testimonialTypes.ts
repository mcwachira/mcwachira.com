import { StaticImageData } from "next/image"
export type TestimonialTypes = {
    headline:string,
    content:string,
     author: {
           name: string,
           role: string,
           image: StaticImageData,
         },
}