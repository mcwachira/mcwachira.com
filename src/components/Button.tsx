import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';

type Variant = 'primary' | 'secondary' | 'primaryOnDark';

const variantStyles: Record<`${Variant}ClassName`, string> = {
  primaryClassName: '',
  secondaryClassName:
      'text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100 hover:bg-slate-200/60 hover:shadow-sky-100/50 bg-slate-100/80',
  primaryOnDarkClassName: '',
}

interface ButtonProps {
  variant?: Variant;
  href?: Url;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // Add type for HTML button types
  children?: ReactNode; // Add children prop
}

export function Button({ variant = 'primary', className, href, type = 'button', children, ...props }: ButtonProps) {
  className = clsx(
      'inline-flex items-center rounded-full gap-2.5 justify-center px-7 py-3 text-md font-semibold leading-none outline-offset-2 transition-all duration-200 ease-in-out active:transition-none',
      variantStyles[`${variant}ClassName`],
      className
  );

  return href ? (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
  ) : (
      <button type={type} className={className} {...props}>
        {children}
      </button>
  );
}
