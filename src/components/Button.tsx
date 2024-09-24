import Link from 'next/link'
import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'

// Define the possible variants
type Variant = 'primary' | 'secondary' | 'primaryOnDark';

// Ensure variantStyles has keys that match the Variant union
const variantStyles: Record<`${Variant}ClassName`, string> = {
  primaryClassName: '',
  secondaryClassName:
      'text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100 hover:bg-slate-200/60 hover:shadow-sky-100/50 bg-slate-100/80',
  primaryOnDarkClassName: '',
}

interface ButtonProps {
  variant?: Variant; // Make variant optional and restrict it to valid values
  href?: Url;
  className?: string;
}

export function Button({ variant = 'primary', className, href, ...props }: ButtonProps) {
  className = clsx(
      'inline-flex items-center rounded-full gap-2.5 justify-center px-7 py-3 text-md font-semibold leading-none outline-offset-2 transition-all duration-200 ease-in-out active:transition-none',
      variantStyles[`${variant}ClassName`], // Type-safe key lookup
      className
  )

  return href ? (
      <Link href={href} className={className} {...props} />
  ) : (
      <button className={className} {...props} />
  )
}
