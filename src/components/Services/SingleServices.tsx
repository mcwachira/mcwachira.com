
import { Service } from '@/types/types'
import React from 'react'

const SingleService = ({service}:{service :Service}) => {

const {icon, title, paragraph} = service
  return (
    <div className="w-full  overflow-hidden rounded-2xl bg-slate-50 px-4 pb-14 pt-5 shadow-sm shadow-sky-100/50 ring-1 ring-slate-100">
    <div className="wow fadeInUp" data-wow-delay=".15s">
      <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md  bg-opacity-10 ">
        {icon}
      </div>
      <h3 className="mb-5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="pr-[10px] text-xl font-medium leading-relaxed text-slate-700">
        {paragraph}
      </p>
    </div>
  </div>
  )
}

export default SingleService

