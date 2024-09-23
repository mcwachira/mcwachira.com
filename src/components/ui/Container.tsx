import clsx from 'clsx'
import React from "react";


interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;  // Make className optional
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    />
  )
}
