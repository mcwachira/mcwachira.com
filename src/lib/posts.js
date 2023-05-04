import  path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { sortByDate } from '@/utils/sortByDate'
import readingTime from 'reading-time'
import {serialize} from 'next-mdx-remote/serialize'

//plugins

import remarkToc from 'remark-toc'  //generates table of content
import rehypeFormat  from 'rehype-format' //make html in markdown more readable
import rehypeSlug from 'rehype-slug' //add id attributes to headings without ids
import rehypeCodeTitles from 'rehype-code-titles' //parsing code blocks and adding titles to code blocks 
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // it adds l;inks from headings back to themselves
import remarkMdxImages from 'remark-mdx-images' //change images to javascript imports using mdx



//get posts path

const ROOT = process.cwd()
const postsDirectory = path.join(ROOT, 'posts')


//public path
const PUBLIC_PATH  = path.join(ROOT, 'public')


export const getAllPosts = () => {
    const fileNames = fs.readdirSync(postsDirectory)

    const posts = fileNames.map((fileName) => {
        // console.log(fileName)

        const slug = fileName.replace('.mdx', "" )

        const fullPath = path.join(postsDirectory, fileName)
        // console.log(fullPath)

        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        // console.log(fileContents)

        const {data: frontmatter} = matter(fileContents)

        return {
            slug,
            frontmatter: {
                            wordCount : fileContents.split(/\s+/gu).length,
            readingTime:readingTime(fileContents),
            slug:slug || null,
            ...frontmatter,

            },
        }



    })

    return posts.sort(sortByDate)
}


export const getSinglePost = async(slug) => {
    //gets full path
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    const source = fs.readFileSync(fullPath, 'utf-8')
    
    const {content, data:frontmatter} =  matter(source)

    //console.log(content)
    //  console.log(frontmatter)
    const mdxSource = await serialize(content, {
        mdxOptions:{
            remarkPlugins:[[remarkToc, {heading: 'contents'}], remarkMdxImages],
            rehypePlugins:[rehypeFormat, rehypeSlug,rehypeCodeTitles ,  [rehypeAutolinkHeadings, { behavior: "wrap" }],],
        },
         scope:frontmatter,
    })
     console.log(frontmatter)
    

    return {
      
            slug,
            frontmatter:{
             wordCount : content.split(/\s+/gu).length,
            readingTime:readingTime(content),
            slug:slug || null,
            ...frontmatter,
            }, 
            source:mdxSource

            
}

}