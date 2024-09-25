import { useMDXComponent } from 'next-contentlayer/hooks'
import { MdxLink } from './MdxLink'
import { MdxImage } from './MdxImage'
import { UnderLink } from '@/components/under-link'
import CodeBlock from '@/components/code-block'
import React, { ReactNode } from 'react'

interface MdxContentProps {
  code: string;
}

// Type for the MDX components mapping
type MDXComponents = {
  [key: string]: React.ElementType;
};

const mdxComponents: MDXComponents = {
  Link: MdxLink,
  Image: MdxImage,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props} className='bg-light dark:bg-dark dark:text-light text-base  [&:not(:first-child)]:mt-6' />
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props} className='bg-light dark:bg-dark dark:text-light text-3xl leading-9 mb-4 break-words' />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
          {...props}
          className='bg-light dark:bg-dark dark:text-light scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors break-words first:mt-0 mt-16'
      />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
          {...props}
          className='bg-light dark:bg-dark dark:text-light scroll-m-20 text-2xl font-semibold tracking-tight break-words first:mt-0 mt-16'
      />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
          {...props}
          className='bg-light dark:bg-dark dark:text-light scroll-m-20 text-xl font-semibold tracking-tight break-words first:mt-0 mt-16'
      />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5
          {...props}
          className='bg-light dark:bg-dark dark:text-light text-md leading-5 break-words mb-4 first:mt-0 mt-16'
      />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
          {...props}
          className='bg-light dark:bg-dark dark:text-light text-sm leading-4 break-words mb-4 first:mt-0 mt-16'
      />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} className='bg-light dark:bg-dark dark:text-light my-6 ml-6 list-disc [&>li]:mt-2' />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} className='bg-light dark:bg-dark dark:text-light list-decimal pl-6 my-6' />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} className='bg-light dark:bg-dark dark:text-light my-3 text-md' />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong {...props} className='bg-light dark:bg-dark dark:text-[#F0F8FF] font-bold my-3 leading-1' />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <UnderLink href={props.href as string} target='_blank' {...props}>
        {props.children}
      </UnderLink>
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
      <blockquote {...props} className='bg-light dark:bg-dark dark:text-light mt-6 border-l-2 pl-6 italic' />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr {...props} className='bg-light dark:bg-dark dark:text-light border-gray-300 my-6' />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <table {...props} className='bg-light dark:bg-dark dark:text-light table-auto w-full' />,
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => <th {...props} className='bg-light dark:bg-dark dark:text-light border border-gray-300 px-4 py-2' />,
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => <td {...props} className='bg-light dark:bg-dark dark:text-light border border-gray-300 px-4 py-2' />,
  pre: (props: any) => (
      <CodeBlock
          code={props.children}
          language={props['data-language']}
          {...props}
      />
  ),
  code: (props: any) => (
      <code {...props} />
  ),
};

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);

  return <Component components={mdxComponents} />;
}
