import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getFormattedDate from '@/lib/getFormattedDate';


export interface Blog {
    meta: BlogMeta
    slug: string
    content: string
}

export interface BlogMeta{
    title?: string
    date?: Date
    description?: string
    author?: string
    image? : string | string[]
}

export interface BlogItem {
    slug: string
}



//get post path

const ROOT= process.cwd();
const postsDirectory = path.join(ROOT, 'content/posts')


//public path
const PUBLIC_PATH  = path.join(ROOT, 'public')

const getSlugFromFileName = (filename:string) =>filename.replace('.mdx', '')

const getFileNameFromSlug = (slug: string) => slug + '.mdx'

const getBlogFiles = () => fs.readdirSync(path.join(postsDirectory)).filter(x => {
    const y = x.split('.'); 
    
    //return all mdx files
    return y[y.length - 1] === "mdx"}
    
    )


const readBlogFile = (filename : string) => {
    try
     {
        return fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    
    } catch {
         return null
        }
    
    }

    const getBlogFromFile = (filename : string) : Blog | null => {
        const file = readBlogFile(filename)
        if(file == null){
            return null
        }
    
        const { data, content } = matter(file) 
        const slug = getSlugFromFileName(filename)
    
        const meta = cleanMetaFromMatter(data)
    
        return ({ meta, slug, content} )
    }
    

    const cleanMetaFromMatter = (meta : {[key: string]: any }) : BlogMeta => {
        return {
            ...meta,
            author: meta.author ?? "mcwachira",
            date: new Date(meta.date) ?? null
        }
    }
    


const getBlogItemFromFile = (filename : string) : BlogItem => {
    return {
        slug: getSlugFromFileName(filename)
    }
}

const filterNewToOld = (blogs : (Blog | null)[]) => {
    return blogs.sort((a, b) => (new Date(b?.meta?.date ?? new Date()).getTime() - new Date(a?.meta?.date ?? new Date()).getTime()));
}



export function getAllBlogs(){
    const files = getBlogFiles();

    const blogs = files.map(filename => {
        return getBlogFromFile(filename)
      })

    return filterNewToOld(blogs)
}

export function getAllBlogsInfo(){
    const files = getBlogFiles();

    return files.map(filename => getBlogItemFromFile(filename))
}

export function getBlog(slug : string) : Blog | null{
    const filename = getFileNameFromSlug(slug)

    return getBlogFromFile(filename)
}