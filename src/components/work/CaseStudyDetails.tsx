import { Button } from '@/components/Button'
import React from "react";

interface DetailsProps {
  label:string,
  data?:string
}
function Detail({ label, data }:DetailsProps) {
  return (
    <div>
      <dt className="text-lg font-medium font-display text-slate-900">
        {label}
      </dt>
      <dd className="mt-2.5 max-w-sm leading-7 text-slate-700">{data}</dd>
    </div>
  )
}

interface ClientDetails {
  description?: string;
  industry?: string;
  companySize?: string;
  headquarters?: string;
}

interface CaseStudyDetailsProps {
  client?: ClientDetails;
  description: string;
  projectDuration?: string;
  projectURL: string;
  githubLink?: string;
  children?: React.ReactNode;
}

export function CaseStudyDetails({
  client,
  description,
  projectDuration,
  projectURL,
    githubLink,
  children,
}:CaseStudyDetailsProps) {
  return (
    <section className="py-16 overflow-hidden bg-light dark:bg-dark sm:py-20 lg:py-28">
      <div className="grid max-w-lg px-5 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-6xl lg:grid-cols-10 lg:px-8 xl:px-12">
        <div className="order-2 pt-8 mt-8 border-t border-slate-200 lg:order-1 lg:col-span-3 lg:mt-0 lg:border-0 lg:pr-8 lg:pt-0">
          <dl className="space-y-8">
            <Detail label="Client" data={client?.description} />
            <Detail label="Industry" data={client?.industry} />
            <Detail label="Company Size" data={client?.companySize} />
            <Detail label="Headquarters" data={client?.headquarters} />
            <Detail label="Project Duration" data={projectDuration} />
          </dl>
          <Button
            href={projectURL}
            target="_blank"
            className="mt-14 !font-medium"


          >
            Visit Website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 duration-200 ease-in-out text-slate-50 group-hover:text-white"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Button
              href={githubLink}
              target="_blank"
              className="mt-14 !font-medium"
          >
            Visit Github project
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 duration-200 ease-in-out text-slate-50 group-hover:text-white"
            >
              <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-16">
          <h3 className="text-xl font-medium leading-8 font-display text-slate-900 sm:text-2xl sm:leading-10">
            {description}
          </h3>
          <div className="mt-6 prose sm:prose-lg sm:mt-8">{children}</div>
        </div>
      </div>
    </section>
  )
}
