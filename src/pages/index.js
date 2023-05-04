import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { getAllPosts } from '@/lib/posts'



export default function Index({posts}) {
  return (
    <> 


<div>
{/* {posts.map((post) =>(
console.log(post.slug)
))} */}

{posts.map((post) => 

<ul >

<li key={post.frontmatter.title}>
<Link href={`/blog/${post.slug}`} >{post.frontmatter.title}  </Link>
  </li>
  </ul>

)}

</div>




<div>
Begining of my blog
</div>

      </>
  )
}




export function getStaticProps() {
  const posts = getAllPosts().slice(0, 6)
//console.log(posts)
  return {
    props:{
      posts
    }
  }
}