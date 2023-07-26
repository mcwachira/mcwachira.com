
import { getAllBlogsInfo, getBlog } from '@/lib/blogHelper'
import { notFound } from 'next/navigation';
import generateRssFeed from '@/lib/rssHelper';
import { Metadata } from 'next';
import BlogComponent from '@/components/Blog/Blog';


export async function generateStaticParams() {
    await generateRssFeed(); //Don't delete
    return getAllBlogsInfo()
}

export async function generateMetadata({ params, searchParams } : any){
    const blog = getBlog(params.slug);

    const meta : Metadata = {
        title: blog?.meta?.title,
        description: blog?.meta?.description,
        openGraph: {
            type : "article"
        }
    }

    meta.twitter = {
        card: "summary",
        site: "@mcwachira",
        creator: "@mcwachira",
        title: blog?.meta?.title,
        description: blog?.meta?.description,
    }

    if(blog?.meta?.image){
        const imageArray = Array.isArray(blog?.meta?.image) ? blog?.meta?.image : [blog?.meta?.image]

        meta.openGraph = {
            ...meta.openGraph,
            images: imageArray
        }

        meta.twitter.images = imageArray[0]

        meta.twitter = {
            ...meta.twitter,
            card: meta.twitter.images ? "summary_large_image" : "summary"
        }
    }

    return meta;
}

//Fix Any
export default function BlogPage({ params } :any) {
    const blog = getBlog(params.slug);
    console.log(blog)

    if(!blog){
        return notFound;
    }

    return (
        <main className="max-w-3xl flex flex-col mx-auto px-4 py-8 md:py-10">
            <article className='mdx'>
                <BlogComponent blog={blog} />
            </article>
        </main>
    )

    /*
            <p>{JSON.stringify(props.slug)}</p>
            <br/>
            <p>{JSON.stringify(props.frontMatter)}</p>
            <br/>*/
}