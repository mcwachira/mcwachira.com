import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

interface MdxLinkProps extends LinkProps,
        DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children: React.ReactNode;
}

export function MdxLink({ href, children, ...props }: MdxLinkProps) {
  return (
      <Link href={href} {...props}>
        {children}
      </Link>
  );
}
