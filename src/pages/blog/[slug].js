import { getAllPosts, getSinglePost } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote'
import MdxImage from '@/utils/mdxImage'
import Link from 'next/link'
import Image from 'next/image'


const PostPage = ({slug, source, frontmatter}) => {


    //console.log(frontmatter)
    return (

        <div>
<Link href='/'>

        Go  Back Home
    

</Link>

<h1>
    
    {frontmatter.title}
</h1>

<Image src={frontmatter.cover_image} alt={frontmatter.title} width={1000} height={400}/>
<main>
    <MDXRemote {...source}  components={{Image, MdxImage}}/>
</main>

        </div>
    )
}

export default PostPage

export const getStaticProps = async ({params}) => {
   
    console.log(params)
    const post = await getSinglePost(params.slug)
    console.log(post)

    return {
        props:{
            ...post
        }
    }
}

export const getStaticPaths = async() => {
    const paths = getAllPosts().map(({slug}) => ({params:{slug}}))
    // console.log(paths)


    return {
        paths,
        fallback:false,
    }
}