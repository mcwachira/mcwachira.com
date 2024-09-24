import React, { FC } from "react";
import { allPosts } from "contentlayer/generated";
import { BusinessIcon, ContentCreationIcon, TutorialIcon, WebDevelopmentIcon } from "@/components/CategoryIcons";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { MdxContent } from "@/components/mdx/MdxContent";
import { PostFooter } from "./PostFooter";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import { PostTypes } from "@/types/post";


const iconOptions: { [key: string]: React.FC<any> } = {
  'Web Development': WebDevelopmentIcon,
  Business: BusinessIcon,
  'Content Creation': ContentCreationIcon,
  Tutorials: TutorialIcon,
}

interface GenerateMetadataParams {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () =>
    allPosts.map((post: PostTypes) => ({ slug: post?.slug }));

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const post = allPosts.find((post: PostTypes) => post?.slug === params.slug);
  return { title: post?.title, description: post?.description };
}

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = allPosts.find((post: PostTypes) => post?.slug === params.slug);
  const categorySlug = post?.category.replace(/ /g, '-').toLowerCase();


  // Ensure the category is valid before accessing iconOptions
  const CategoryIcon = post.category ? iconOptions[post.category] : undefined;




  return (
      <>
        <main>
          <article>
            {/* Article Header */}
            <header className="relative bg-light dark:bg-dark py-16 sm:pt-24 lg:pt-28">
              <div className="absolute inset-x-0 bottom-0 h-1/4 " />
              <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
                <Link
                    href={`/articles/${categorySlug}#articles`}
                    className="group inline-flex items-center justify-center gap-3.5 text-base leading-5 tracking-wide text-sky-700 transition duration-200 ease-in-out hover:text-sky-600 sm:text-lg"
                >
                  <CategoryIcon className="h-[18px] w-[18px] text-sky-700/90 transition duration-200 group-hover:text-sky-600 sm:h-5 sm:w-5" />
                  {post?.category}
                </Link>
                <h1 className="mt-6 text-center font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
                  {post?.title}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-700">
                  {post?.description}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4 text-md text-slate-500">
                <span className="flex items-center gap-2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                      stroke="currentColor"
                      className="h-6 w-6 text-slate-400"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <time dateTime={post?.date}>
                    {format(parseISO(post?.date), 'LLL d, yyyy')}
                  </time>
                </span>
                  <span className="flex items-center gap-2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.75"
                      stroke="currentColor"
                      className="h-6 w-6 text-slate-400"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                    {`${post?.timeToRead} minute read`}
                </span>
                </div>
                <div className="mx-auto mt-16 w-full max-w-4xl">
                  <div className="aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-3xl shadow-lg shadow-sky-100/50 md:aspect-h-2 md:aspect-w-3">
                    <Image
                        src={post?.image}
                        alt={post?.title}
                        fill={true}
                        className="w-full rounded-3xl bg-slate-100 object-cover"
                        sizes="(min-width: 1024px) 56rem, calc(100vw - 2.5rem)"
                    />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/10"></div>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-light dark:bg-dark px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg mx-auto max-w-2xl">
                <MdxContent code={post?.body.code} />
              </div>
              <PostFooter />
            </div>
          </article>
        </main>
        <Footer />
      </>
  );
}

export const dynamicParams = false;
