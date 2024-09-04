import { Service } from '@/types/types'
import React from 'react'

const SingleService = ({ service }: { service: Service }) => {
  const { icon, title, paragraph } = service
  return (
    <div className="bg-slate-50  shadow-sky-100/50 ring-slate-100 w-full overflow-hidden rounded-2xl px-4 pb-14 pt-5 shadow-sm ring-1">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md  bg-opacity-10 ">
          {icon}
        </div>
        <h3 className="text-slate-900 dark:text-white mb-5 text-xl font-bold sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="text-slate-700 pr-[10px] text-lg font-medium leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  )
}

export default SingleService
