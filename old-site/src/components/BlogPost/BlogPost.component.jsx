import React from 'react'

import Link from 'next/link'

const BlogPost = ({ post }) => {

    return (                    
        <div className='w-[90%]  md:w-full border flex flex-col gap-12 transition-all duration-[0.3s] ease-[ease-in-out] mx-auto my-12 rounded-[10px] border-solid border-[#0AC2C2]'>
            <div className='m-2'>
                <Link href={`/blog/${post.slug}`}>
    
                <h2 className=' text-2xl text-[#0070f3] mt-4'> {post.frontmatter.title}</h2>
       
                </Link>
                <p className='text-[1.2rem] text-black'>
                    {post.frontmatter.excerpt}
                </p>
                <Link className='flex items-center text-base transition-[color] duration-[0.15s] ease-[ease] ml-8' href={`/blog/${post.slug}`}> Read More   </Link>
           
        
            </div>
          
        </div>
       
    )
}

export default BlogPost