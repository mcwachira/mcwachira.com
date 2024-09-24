
import { allPosts } from 'contentlayer/generated'
import {BlogGrid} from "@/components/blog/BlogGrid";

export default async function BlogPage() {
  return <BlogGrid posts={allPosts} />
}
