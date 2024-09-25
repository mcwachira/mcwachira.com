import { FC } from 'react';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import {PostTypes} from "@/types/post";

// Define the type for the post prop
interface PostProps {
  post: PostTypes;
}

export const Post = ({ post }:PostProps) => {
  const categorySlug = post.category.replace(/ /g, '-').toLowerCase();

  return (
      <article className="bg-slate-50 shadow-sky-100/50 ring-slate-100 flex flex-col items-start justify-between rounded-2xl shadow-sm ring-1">
        <div className="w-full px-4 pt-4">
          <Link
              href={post.url}
              className="group aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-xl md:aspect-h-2 md:aspect-w-3"
          >
            <Image
                src={post.image}
                alt={post.title}
                fill={true}
                className="bg-slate-100 w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 1280px) 22.5rem, (min-width: 1024px) 33vw, (min-width: 768px) calc(50vw - 2.5rem), (min-width: 640px) 30rem, calc(100vw - 4.5rem)"
            />
            <div className="ring-slate-900/5 absolute inset-0 rounded-xl ring-1 ring-inset"></div>
          </Link>
        </div>

        <div className="group relative flex flex-1 flex-col px-5 pb-10 pt-8 xl:px-7">
          <Link
              href={`/blog/categories/${categorySlug}`}
              className="text-sky-700 hover:text-sky-600 group relative z-10 flex items-center gap-2.5 text-md transition duration-200 ease-in-out"
          >
            {/* <CategoryIcon className="w-4 h-4 text-sky-600" /> */}
            {post.category}
          </Link>
          <div className="flex-1">
            <h3 className="font-display text-slate-900 decoration-slate-400 group-hover:text-sky-900 mt-4 text-xl font-medium leading-normal transition duration-200 ease-in-out">
              <Link href={post.url}>
                <span className="absolute inset-0"></span>
                {post.title}
              </Link>
            </h3>
            <p className="text-slate-700 mt-3.5 line-clamp-3 text-md leading-7">
              {post.description}
            </p>
          </div>
          <div className="text-slate-500 mt-8 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
                className="text-slate-400 h-5 w-5"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'LLL d, yyyy')}
            </time>
          </span>
            <span className="flex items-center gap-1.5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
                className="text-slate-400 h-5 w-5"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
              {`${post.timeToRead} minute read`}
          </span>
          </div>
        </div>
      </article>
  );
};
