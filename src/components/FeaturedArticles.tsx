import { Container } from '@/components/Common/Container'
import  Article  from '@/components/Article/Article'

const  FeaturedArticles = ({ articles }:any)  => {
  return (
    <section className="overflow-hidden bg-white py-16 sm:pt-24 lg:pt-28">
      <Container className=''>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight">
          <span className="relative whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="249"
              height="22"
              viewBox="0 0 249 22"
              fill="currentColor"
              className="absolute left-0 top-2/3 h-[0.6em] w-full fill-sky-200/75"
            >
              <path d="M247.564 18.5808C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97398 208.996 8.57034 200.846 7.46096C186.542 5.51305 172.169 4.08857 157.79 3.01565C126.033 0.645858 94.0929 0.0338786 62.3387 2.36982C42.1785 3.85419 22.008 5.90888 2.32917 10.8464C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7084C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0808 99.2274 10.6719 118.484 10.9558C142.604 11.3125 166.719 12.8334 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0808 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5808Z" />
            </svg>
            <span className="relative text-sky-700 ">Thoughts</span>
          </span>{' '}
          on design, business and indie-hacking
        </h2>

        <div className="relative mx-auto mt-14 grid max-w-lg gap-8 sm:mt-16 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-6 xl:gap-x-6 xl:gap-y-8">
          <div className="absolute -top-20 hidden gap-6 lg:-left-4 xl:flex 2xl:-left-24">
            <span className="inline-block -rotate-12 transform font-writing text-2xl tracking-wide text-slate-600">
              Read the latest
            </span>

            <svg
              viewBox="0 0 85 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative -left-1 top-2 h-auto w-16 rotate-45 -scale-100 transform text-slate-600"
            >
              <path
                d="M84.1428 1.12604C68.4579 15.0432 48.2728 24.8484 26.7076 22.7737C20.393 22.1662 13.251 19.5041 7.51 16.6647C6.29685 16.0646 5.19832 15.2656 4.08583 14.4969C3.06981 13.7949 4.95423 22.296 5.12047 23.2959C6.89794 33.9863 5.2443 22.4385 4.04146 18.4653C3.10796 15.3818 1.13626 12.2911 0.701068 9.07517C0.350636 6.4856 5.49948 7.02736 7.26614 6.8582C9.08258 6.68426 20.8214 3.77937 19.2507 7.81152C16.4328 15.0458 10.9147 19.889 6.01223 25.5572"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          {articles.slice(0, 3).map((article:any) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FeaturedArticles