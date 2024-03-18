import {getAllCategories} from "../../../../../lib/articles";
import {BlogGrid} from "../../../../../components/blog/BlogGrid";
import {allPosts} from "contentlayer/generated";


const parseCategory = (categorySlug) => {
  const category = categorySlug
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ')
  return category
}

export const generateStaticParams = async () => {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    categorySlug: category.replace(/ /g, '-').toLowerCase(),
  }))
}

export async function generateMetadata({ params }) {
  const category = parseCategory(params.categorySlug)
  return { title: category }
}

export default async function BlogCategoryPage({ params }) {
  const posts = allPosts.filter(
    (post) => post.category === parseCategory(params.categorySlug)
  )

  return <BlogGrid posts={posts} />
}

export const dynamicParams = false
