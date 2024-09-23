import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

interface CaseStudyData {
  title: string;
  url: string;
  thumbnail: string;
  description: string;
}

interface CaseStudyProps {
  caseStudy: CaseStudyData;
  index: number;
}

function CaseStudy({ caseStudy, index }: CaseStudyProps) {
  return (
      <div
          key={caseStudy.title}
          className={clsx(
              'flex flex-col gap-12 rounded-3xl bg-slate-50 px-7 py-12 sm:gap-14 sm:p-16 lg:px-10 lg:py-14 xl:gap-16 xl:p-16',
              index % 2 === 0
                  ? 'rounded-tl-[64px]'
                  : 'transform rounded-br-[64px] lg:translate-y-24 xl:translate-y-32'
          )}
      >
        <Link
            href={caseStudy.url}
            className={clsx(
                'group aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-xl md:aspect-h-2 md:aspect-w-3',
                index % 2 === 0 ? 'order-1' : 'order-2'
            )}
        >
          <Image
              src={caseStudy.thumbnail}
              alt={caseStudy.title}
              fill
              className="object-cover object-top w-full transition duration-300 rounded-xl bg-slate-100 group-hover:scale-105"
              sizes="(min-width: 1280px) 27rem, (min-width: 1024px) calc(50vw - 8.25rem), (min-width: 640px) 28rem, calc(100vw - 6rem)"
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5"></div>
        </Link>
        <div
            className={clsx(
                'flex flex-col items-center',
                index % 2 === 0 ? 'order-2' : 'order-1'
            )}
        >
          <h3 className="text-center font-display text-[28px] font-medium text-slate-900">
            {caseStudy.title}
          </h3>
          <p className="mt-5 text-base leading-8 text-center text-slate-700">
            {caseStudy.description}
          </p>
          <Link
              href={caseStudy.url}
              className="inline-flex items-center justify-center gap-2 py-3 mt-12 font-medium transition duration-300 rounded-full shadow-sm group px-9 text-md  shadow-sky-100/50 ring-1 ring-slate-100/90 hover:bg-light/60 hover:text-dark hover:shadow-md hover:shadow-sky-100"
          >
            View Project
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 duration-300 ease-in-out text-sky-800 group-hover:text-sky-700"
            >
              <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
  );
}

interface CaseStudiesProps {
  caseStudies: CaseStudyData[];
}

export function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
      <div
          className={clsx(
              'mx-auto mt-12 grid max-w-xl gap-12 sm:mt-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2 lg:gap-10 xl:gap-24',
              caseStudies.length % 2 === 0 && 'lg:pb-32'
          )}
      >
        {caseStudies.map((caseStudy, index) => (
            <CaseStudy key={caseStudy.title} caseStudy={caseStudy} index={index} />
        ))}
      </div>
  );
}
