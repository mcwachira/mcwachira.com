// import Link from 'next/link'
// import Image from 'next/image'
// import Head from 'next/head'

// import { Button } from '@/components/Button'


// import image from '@/images/contact.jpg'
// import Footer from '@/components/ui/Footer'
// import Navbar from '@/components/ui/Header/Navbar'

// export default function  Contact(){

//   const handelSubmit = async(e) => {

//     e.preventDefault();
    
//     const formData = new FormData(e.target);

//     const data  = Object.fromEntries(formData.entries())

//     const response = await fetch('/api/contact', {

//       method:'POST',
//       headers:{

//         'Content-Type':'application/json',
//       }
//     });

//     if(response.ok){
//       alert ('Message sent Successfully')
//     }else alert('Failed to send Message')
//   }
//   return (
//     <>
//       <Head>
//         <title>Contact me - Mcwachira </title>
//         <meta
//           name="description"
//           content="Hi, I&apos;m Mcwachira , a passionate developer, entrepreneur, and general technology enthusiast living in San Francisco."
//         />
//       </Head>

//       <section className="relative overflow-hidden bg-light dark:bg-dark">
//         <div className="mx-auto max-w-screen-xl">
//           <div className="lg:columns-2 lg:gap-8">
//             <div className="relative bg-light dark:bg-dark px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:rounded-br-[64px] lg:px-8 lg:pt-32 2xl:pl-0">
//               <div className="absolute inset-y-0 left-0 hidden w-full -translate-x-full bg-slate-50 lg:block" />
//               <div className="relative mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
//                 <h2 className="font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-[40px] lg:leading-tight xl:text-5xl xl:leading-tight">
//                   How can I help you? Let’s get in touch
//                   <span className="ml-4 sm:ml-6">👋</span>
//                 </h2>

//                 <div className="aspect-h-2 aspect-w-3 mt-12 sm:mt-16">
//                   <Image
//                     src={image}
//                     alt=""
//                     className="h-full w-full rounded-3xl object-cover xl:translate-x-16"
//                   />
//                 </div>
//                 <div className="relative mt-14 h-fit w-fit font-writing text-2xl tracking-wide text-slate-600 sm:mt-20 sm:text-[27px]">
//                   <span className="inline-block w-52 max-w-[220px] transform sm:w-auto sm:-rotate-6">
//                     You can <span className="text-sky-700">reach me</span> at
//                     the following
//                   </span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="124"
//                     height="121"
//                     viewBox="0 0 124 121"
//                     fill="none"
//                     className="absolute -right-16 top-4 h-24 w-auto -rotate-90 transform text-slate-600 sm:-right-20 sm:-top-1 sm:translate-y-2 sm:rotate-[-100deg]"
//                   >
//                     <g clipPath="url(#clip0_257_335)">
//                       <path
//                         d="M101.672 26.3321C96.8237 38.134 92.186 44.0573 79.0339 44.4141C70.6979 44.6403 60.8529 42.694 53.4527 38.7688C49.1632 36.4936 56.8633 35.9887 58.3238 36.046C75.2213 36.7084 91.469 47.7751 94.8076 64.9225C96.9834 76.0979 88.4245 81.9067 78.6041 84.1752C63.6278 87.6349 47.752 81.2525 36.0397 72.0991C32.1436 69.0541 19.8172 60.5149 22.0934 54.2698C23.9793 49.0954 31.7507 55.0061 34.018 56.9118C37.2506 59.6288 44.0244 65.7437 43.9149 70.3449C43.7576 76.9438 32.7995 78.0771 28.2217 77.7848C19.5283 77.2298 10.3327 73.6012 2.05876 71.0225C1.4496 70.8325 5.37871 69.9759 6.06477 69.8198C8.02976 69.3721 9.72632 68.1441 11.7325 67.8657C13.2208 67.6592 21.2769 68.287 16.2554 69.947C14.4855 70.532 2.71379 69.3189 2.58655 69.7453C2.06535 71.4868 10.2182 79.8642 11.7371 81.4008C15.3955 85.1003 14.5874 73.4626 14.2296 71.9325"
//                         stroke="currentColor"
//                         strokeWidth="1.75"
//                         strokeLinecap="round"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_257_335">
//                         <rect
//                           width="106"
//                           height="67"
//                           fill="white"
//                           transform="matrix(-0.748497 0.663138 0.663138 0.748497 79.3407 0)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </div>
//                 <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 sm:gap-6 xl:gap-8">
//                   <div className="flex gap-[18px]">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.75"
//                       stroke="currentColor"
//                       className="h-6 w-6 shrink-0 text-sky-600"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//                       />
//                     </svg>
//                     <div className="sm:pt-0.5">
//                       <p className="font-display text-lg text-slate-900">
//                         Email me
//                       </p>
//                       <p className="mt-1.5 text-base text-slate-600 sm:mt-2">
//                         I will usually email you back within an hour
//                       </p>
//                       <Link
//                         href="mailto:mcwachira@gmail.com
//                         className="mt-5 inline-block text-sky-700 duration-200 ease-in-out hover:text-sky-600 sm:mt-6"
//                       >
//                         mcwachira@gmail.com
//                       </Link>
//                     </div>
//                   </div>
//                   <div className="flex gap-[18px]">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.75"
//                       stroke="currentColor"
//                       className="h-6 w-6 shrink-0 text-sky-600"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
//                       />
//                     </svg>

//                     <div className="sm:pt-0.5">
//                       <p className="font-display text-lg text-slate-900">
//                         Call me
//                       </p>
//                       <p className="mt-2 text-base text-slate-600">
//                         I’m available weekdays from 8AM to 6PM
//                       </p>
//                       <Link
//                         href="tel:+13234567891"
//                         className="mt-6 inline-block text-sky-700 duration-200 ease-in-out hover:text-sky-600"
//                       >
//                         +254726601941
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:pl-0 lg:pr-8 lg:pt-32 xl:col-span-5 xl:col-start-8 2xl:pr-0">
//               <div className="mx-auto max-w-lg lg:mr-0">
//                 <h3 className="font-display text-3xl font-semibold text-slate-900">
//                   Fill out the form below to get started
//                 </h3>
//                 <p className="mt-4 text-lg text-slate-600">
//                   Reach out for web development, design, consulting, and more. We&#39;re here to help!
//                 </p>
//                 <form action="#" onSubmit={handelSubmit} className="mt-10">
//                   <div className="space-y-7">
//                     <div>
//                       <label
//                         htmlFor="name"
//                         className="block text-md font-medium leading-6 text-slate-900"
//                       >
//                         Name
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           name="name"
//                           id="name"
//                           autoComplete="name"
//                           placeholder="Mcwachira "
//                           className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="block text-md font-medium leading-6 text-slate-900"
//                       >
//                         Email
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="email"
//                           name="email"
//                           type="email"
//                           autoComplete="email"
//                           placeholder="foobar@email.com"
//                           className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-md leading-6">
//                         <label
//                           htmlFor="phone"
//                           className="block font-medium text-slate-900"
//                         >
//                           Phone
//                         </label>
//                         <p id="phone-description" className="text-slate-500/80">
//                           Optional
//                         </p>
//                       </div>
//                       <div className="mt-2">
//                         <input
//                           type="tel"
//                           name="phone"
//                           id="phone"
//                           autoComplete="tel"
//                           aria-describedby="phone-description"
//                           placeholder="+254726601941"
//                           className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-4 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between text-md leading-6">
//                         <label
//                           htmlFor="message"
//                           className="block font-medium text-slate-900"
//                         >
//                           How can I help you?
//                         </label>
//                         <p
//                           id="message-description"
//                           className="text-slate-500/80"
//                         >
//                           Max 500 characters
//                         </p>
//                       </div>
//                       <div className="mt-2">
//                         <textarea
//                           id="message"
//                           name="message"
//                           rows={5}
//                           aria-describedby="message-description"
//                           placeholder="Tell me a little bit about your project..."
//                           className="block w-full rounded-xl border-0 bg-slate-50 px-4 py-4 text-md leading-6 text-slate-900 shadow-sm shadow-sky-100/50 ring-1 ring-inset ring-slate-200 transition-colors duration-200 ease-in-out placeholder:text-slate-400 hover:bg-light focus:border-0 focus:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600/60"
//                         />
//                       </div>
//                     </div>
//                     <fieldset>
//                       <legend className="block text-md font-medium leading-6 text-slate-900">
//                         Expected services
//                       </legend>
//                       <div className="mt-4 space-y-3">
//                         <div className="flex items-start">
//                           <div className="flex h-6 items-center">
//                             <input
//                               id="web-development"
//                               name="web-development"
//                               type="checkbox"
//                               className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
//                             />
//                           </div>
//                           <div className="ml-3 text-sm leading-6">
//                             <label
//                               htmlFor="web-development"
//                               className="text-slate-700"
//                             >
//                               Web development
//                             </label>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex items-start">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="web-design"
//                                 name="web-design"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
//                               />
//                             </div>
//                             <div className="ml-3 text-sm leading-6">
//                               <label
//                                 htmlFor="web-design"
//                                 className="text-slate-700"
//                               >
//                                 Web design
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex items-start">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="consulting"
//                                 name="consulting"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
//                               />
//                             </div>
//                             <div className="ml-3 text-sm leading-6">
//                               <label
//                                 htmlFor="consulting"
//                                 className="text-slate-700"
//                               >
//                                 Consulting
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="flex items-start">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="other"
//                                 name="other"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-sky-600 shadow-sm shadow-sky-100/50 focus:outline-none focus:ring-transparent"
//                               />
//                             </div>
//                             <div className="ml-3 text-sm leading-6">
//                               <label htmlFor="other" className="text-slate-700">
//                                 Other
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </fieldset>
//                   </div>
//                   <div className="mt-10 border-t border-slate-200 pt-8">
//                     <Button
//                       type="submit"
//                       className="w-full !text-base sm:!text-lg"
//                     >
//                       Get started
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//     </div>
//       </section>
//       <Footer/>
//     </>
//   )
// }


//reusable component for form fields
const FormField = ({label, name, type="text", ...rest}) => {

  <div>


    <label htmlFor={name} className="block text-sm font-semibold  text-slate-800">

      {label}
    </label>

<div className="mt-1">
  
</div>
  </div>

}