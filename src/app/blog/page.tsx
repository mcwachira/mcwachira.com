import BlogPreviewComponent from "@/components/Blog/BlogPreview";
import { getAllBlogs } from "@/lib/blogHelper";

export default function BlogPosts() {

  //Static by default
  const blogs = getAllBlogs();
  console.log(blogs.length)

  return (


<section className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28">
<div className="container">
    
      <section className='py-5'>
        <h2 className='text-3xl font-bold'>
          Latest Blogs
        </h2>

        <div className='py-4 flex flex-col gap-4 px-2 md:px-4'>
          {blogs.map((blog) => (
            blog && <BlogPreviewComponent key={blog.slug} blog={blog}/>
          ))}
        </div>

        </section>

        </div>
      </section>

      

  )
}

