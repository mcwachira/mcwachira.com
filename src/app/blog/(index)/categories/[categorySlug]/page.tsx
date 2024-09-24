import { getAllCategories } from "@/lib/articles";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { allPosts } from "contentlayer/generated";
import {PostTypes} from "@/types/post";



// Type definition for metadata parameters
interface MetadataParams {
  params: {
    categorySlug: string;
  };
}

// Function to parse the category slug into a more readable format
const parseCategory = (categorySlug: string): string => {
  const category = categorySlug
      .replace(/-/g, ' ')
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ')
  return category;
}

// Function to generate static parameters for categories
export const generateStaticParams = async () => {
  const categories: string[] = await getAllCategories();
  return categories.map((category) => ({
    categorySlug: category.replace(/ /g, '-').toLowerCase(),
  }));
}

// Function to generate metadata for the page
export async function generateMetadata({ params }: MetadataParams) {
  const category = parseCategory(params.categorySlug);
  return { title: category };
}

// Main component for the blog category page
export default async function BlogCategoryPage({ params }: MetadataParams) {
  const posts: PostTypes[] = allPosts.filter(
      (post: PostTypes) => post.category === parseCategory(params.categorySlug)
  );

  return <BlogGrid posts={posts} />;
}

// Disable dynamic parameters
export const dynamicParams = false;
