import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { SortByDate } from '@/utils/sortByDate'
import readingTime from 'reading-time'
import {serialize} from 'next-mdx-remote/serialize'
import rehypeImgSize from 'rehype-img-size'


//syntax highlighting
import { remarkCodeHike } from "@code-hike/mdx"
// import theme from "shiki/themes/solarized-dark.json"


//plugins

import remarkToc from 'remark-toc'  //generates table of content
import rehypeFormat  from 'rehype-format' //make html in markdown more readable
import rehypeSlug from 'rehype-slug' //add id attributes to headings without ids
import rehypeCodeTitles from 'rehype-code-titles' //parsing code blocks and adding titles to code blocks 
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // it adds l;inks from headings back to themselves
import remarkMdxImages from 'remark-mdx-images' //change images to javascript imports using mdx




//get post path

const ROOT= process.cwd();
const postsDirectory = path.join(ROOT, 'content/posts')

//public path
const PUBLIC_PATH  = path.join(ROOT, 'public');




//array to store all our file paths
const blogFiles = [];

//function to get all post in the subdirectory

const getFilesFromSubDirectories = (dir, fileTypes) => {


    const walkDir = (currentPath:any) => {
        const files = fs.readdirSync(currentPath)
        for(let i in files){
            let currentFile = path.join(currentPath, files[i])

            if(fs.statSync(currentFile).isFile() && fileTypes.indexOf(path.extname(currentFile)) !=-1){

                console.log(currentFile);

                blogFiles.push(currentFile.replace(`${dir}/`, ''))
            }else if(fs.statSync(currentFile).isDirectory()){
                    walkDir(currentFile)
                }
            

        }

        walkDir(dir)

        return blogFiles
    }
}

getFilesFromSubDirectories(postsDirectory, ['.mdx'])


export const getAllPosts = () => {

    const posts = blogFiles?.map((fileName) => {

        const slug = fileName.replace('.mdx', '');

        const fullPath = path.join(postsDirectory, fileName)

        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const {data: frontmatter}= matter(fileContents);

        return {
            slug,
            frontmatter:{
                wordCount:fileContents.split(/\s+/gu).length,
                readingTime:readingTime(fileContents),
                slug:slug ||null,
                ...frontmatter
           }
        }
    })

    return posts.sort(SortByDate)
} 



export const getSinglePost = async(slug) => {
    //gets full path
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    const source = fs.readFileSync(fullPath, 'utf-8')
    
    const {content, data:frontmatter} =  matter(source)


    const mdxSource = await serialize(content, {
        mdxOptions:{
            remarkPlugins:[[remarkToc, {heading: 'contents'}],[remarkCodeHike,{autoImport:false, theme: "dark-plus"}], remarkMdxImages],
            rehypePlugins:[rehypeFormat, rehypeSlug,rehypeCodeTitles , 
                 [rehypeAutolinkHeadings, { behavior: "wrap" }],[rehypeImgSize, {dir:'public'}]],
            useDynamicImport: true,
        },
         scope:frontmatter,
    })
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