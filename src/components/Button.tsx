import Link from 'next/link'
import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'

const variantStyles = {
  primaryClassName: 'bg-slate-900 text-white hover:bg-sky-800',
  secondaryClassName:
    'text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100 hover:bg-slate-200/60 hover:shadow-sky-100/50 bg-slate-100/80',
  primaryOnDarkClassName: 'bg-white hover:bg-sky-50 text-slate-700',
}

interface buttonTypes {
  variant:string,
  href:Url,
  className:string,
  // [key: string]:string
  variantStyles:{
    primaryClassName:string,
    secondaryClassName:string,
    primaryOnDarkClassName:string

  }

}

export function Button({ variant = 'primary', className, href, ...props }:buttonTypes) {
  className = clsx(
    'inline-flex items-center rounded-full gap-2.5 justify-center px-7 py-3 text-md font-semibold leading-none outline-offset-2 transition-all duration-200 ease-in-out active:transition-none',
    // variantStyles[`${variant}ClassName`],
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}


// Element implicitly has an 'any' type because expression of type '`${string}ClassName`' can't be used to index type '{ primaryClassName: string; secondaryClassName: string; primaryOnDarkClassName: string; }'.ts(7053)