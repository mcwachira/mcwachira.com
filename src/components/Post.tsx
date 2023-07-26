// 'use client'
import Link from 'next/link'

import { getAllPosts } from '@/lib/post'

import getFormattedDate from "@/lib/getFormattedDate"
import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import BlogPost from './Blog/BlogPost'

// export function generateStaticParams() {
//     const posts = getSortedPostsData()

//     return posts.map((post) => ({
//         postId: post.id
//     }))
// }

// export function generateMetadata({ params }: { params: { postId: string } }) {

//     const posts = getSortedPostsData()
//     const { postId } = params

//     const post = posts.find(post => post.id === postId)

//     if (!post) {
//         return {
//             title: 'Post Not Found'
//         }
//     }

//     return {
//         title: post.title,
//     }
// }

// export default async function Post({ params }: { params: { postId: string } }) {

//     const posts = getSortedPostsData()
//     const { postId } = params

//     if (!posts.find(post => post.id === postId)) notFound()

//     const { title, date, contentHtml } = await getPostData(postId)

//     const pubDate = getFormattedDate(date)

//     return (
//         <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
//             <h1 className="text-3xl mt-4 mb-0">{title}</h1>
//             <p className="mt-0">
//                 {pubDate}
//             </p>
//             <article>
//                 <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
//                 <p>
//                     <Link href="/">← Back to home</Link>
//                 </p>
//             </article>
//         </main>
//     )
// }



const Post =  () => {

  const posts =   getAllPosts()

    
  console.log('hello') 
  
  console.log(posts) 
 
    //  const categories = posts.map((post) => post.frontmatter.category)
 
    //  console.log(categories)
 
     //gives us a an array with non repeating values
     //const uniqueCategories = [...new Set(categories)]
     /* console.log(uniqueCategories) */

  return (
    <div className='w-full flex flex-col mt-20'>

    <h1 className='text-center text-[1.7rem] leading-8 lg:text-[2.0rem] lg:leading-[2.2rem] lg:px-40 lg:py-4'>
              I&#8216;m <span className='text-[#0070f3]'>
              Still Learning.
                 
              </span>  </h1>


              <div className='w-full mx-auto my-4 lg:w-4/5'>
              <h2 className='text-[2.0rem] text-center lg:text-[2.3rem]'>All Posts</h2>
              <div className='flex items-center gap-4 flex-wrap ml-8 lg:m-0'>


                  {/* {categories?.map((category, index) => (
                  
                <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
                          <h3 className='text-[1.1rem] text-[color:var(--color-text-secondary)] border cursor-pointer p-2 rounded-[5px] border-solid border-[#0AC2C2];
  background: #bffff0'>
                              {category}
                          </h3> 
                 

                </Link>
            ))} */}
                     

                
              </div>
              {posts?.map((post, index) => (
                  <BlogPost key={index} post={post} />
              ))}
              </div>
       
    </div>
  )
}

export default Post



// export const getBlogPosts = async () => {

//     const posts =  getAllPosts()

  
//  console.log(posts) 

//     const categories = posts.map((post) => post.frontmatter.category)

//     console.log(categories)

//     //gives us a an array with non repeating values
//     const uniqueCategories = [...new Set(categories)]
//     /* console.log(uniqueCategories) */

//     return {
//         props: {
//             posts,
//             categories: uniqueCategories
//         }
//     }
// }





