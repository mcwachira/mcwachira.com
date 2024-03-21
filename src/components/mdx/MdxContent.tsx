import { useMDXComponent } from 'next-contentlayer/hooks'
// import '../mdx.css'
import { MdxLink } from './MdxLink'
import { MdxImage } from './MdxImage'
import { UnderLink } from '@/components/under-link'
import CodeBlock from '@/components/code-block'
const mdxComponents = {
  Link: MdxLink,
  Image: MdxImage,
  p: (props) => (
      <p {...props} className='bg-light dark:bg-dark dark:text-light text-base  [&:not(:first-child)]:mt-6' />
  ),
  h1: (props) => (
      <h1 {...props} className='bg-light dark:bg-dark dark:text-light k text-3xl leading-9 mb-4 break-words' />
  ),
  h2: (props) => (
      <h2
          {...props}
          className=' bg-light dark:bg-dark dark:text-light scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors break-words first:mt-0 mt-16'
      />
  ),
  h3: (props) => (
      <h3
          {...props}
          className=' bg-light dark:bg-dark dark:text-light scroll-m-20 text-2xl font-semibold tracking-tight break-words first:mt-0 mt-16'
      />
  ),
  h4: (props) => (
      <h4
          {...props}
          className=' bg-light dark:bg-dark dark:text-light  scroll-m-20 text-xl font-semibold tracking-tight break-words first:mt-0 mt-16'
      />
  ),
  h5: (props) => (
      <h5
          {...props}
          className=' bg-light dark:bg-dark dark:text-light text-md leading-5 break-words mb-4 first:mt-0 mt-16'
      />
  ),
  h6: (props) => (
      <h6
          {...props}
          className='bg-light dark:bg-dark dark:text-light  text-sm leading-4 break-words mb-4 first:mt-0 mt-16'
      />
  ),
  ul: (props) => <ul {...props} className='bg-light dark:bg-dark dark:text-light  my-6 ml-6 list-disc [&>li]:mt-2' />,
  ol: (props) => <ol {...props} className='bg-light dark:bg-dark dark:text-light  list-decimal pl-6 my-6' />,
  li: (props) => <li {...props} className='bg-light dark:bg-dark dark:text-light  my-3 text-md' />,

    strong: (props) => <strong {...props} className='bg-light dark:bg-dark dark:text-[#F0F8FF] font-bold my-3 leading-1' />,
  a: (props) => (
      <UnderLink href={props.href as string} target='_blank' {...props}>
        {props.children}
      </UnderLink>
  ),
  blockquote: (props) => (
      <blockquote {...props} className='bg-light dark:bg-dark dark:text-light  mt-6 border-l-2 pl-6 italic' />
  ),
  hr: (props) => <hr {...props} className='bg-light dark:bg-dark dark:text-light  border-gray-300 my-6' />,
  table: (props) => <table {...props} className='bg-light dark:bg-dark dark:text-light  table-auto w-full' />,
  th: (props) => <th {...props} className='bg-light dark:bg-dark dark:text-light  border border-gray-300 px-4 py-2' />,
  td: (props) => <td {...props} className='bg-light dark:bg-dark dark:text-light  border border-gray-300 px-4 py-2' />,
  pre: (props: any) => (
      <CodeBlock
          code={props.children}
          language={props['data-language']}
          {...props}
      />
  ),
  code: (props: any) => (
      <code
          {...props}
          // className={
          //   !props['data-theme']
          //       ? 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold'
          //       : ''
          // }
      />
  ),
}

export function MdxContent({ code }) {
  const Component = useMDXComponent(code)

  return <Component components={{ ...mdxComponents }} />
}
