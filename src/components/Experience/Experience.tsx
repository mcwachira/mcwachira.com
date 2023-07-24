import React from 'react'
import SectionTitle from '../Common/SectionTitle'

const Experience = () => {
  return (
<div className="mt-20 container bg-gray-200 mx-auto w-full h-full">


<div className='text-center'>


<SectionTitle

  title=" Experience"
  paragraph="Work Experience"
/>
</div>
  <div className="relative wrap overflow-hidden p-10 h-full">
    <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: "  50%"}}></div>
    {/* <!-- right timeline --> */}
    <div className="mb-8 flex justify-between items-center w-full right-timeline">
      <div className="order-1 w-5/12"></div>
      
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h2 className="mb-3 font-bold text-black text-xl">Front End Developer</h2>
        <h3 className="mb-3 font-bold text-gray-800 text-xl">Fundi Kipusa Cbo</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">I was responsible for redesigning and rebuilding their website. I used React and Gatsby to build a responsive website that had fast loading times and was beautiful. I was tasked with installing and managing their Internet Infrastructure</p>
      </div>
    </div>

    {/* <!-- left timeline --> */}
    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
      </div>
      <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h2 className="mb-3 font-bold text-black text-xl">Front End Developer</h2>
        <h3 className="mb-3 font-bold text-gray-800 text-xl">Topspin Estate</h3>
        <p className="text-sm font-medium leading-snug tracking-wide text-gray-900 text-opacity-100">I work as Front End web developer tasked with creating and maintaining their website and managing their IT infrastructure. Worked with React and Gatsby to build a responsive website that had fast loading times and was beautiful. This brought more traffic to their website and this lead to more guest coming to the hotel. Implemented the analytics framework for the website using Google Analytics. This enabled them to monitor traffic coming to their site and enabled to create and run targeted adds.</p>
      </div>
    </div>
    
    {/* <!-- right timeline --> */}
    <div className="mb-8 flex justify-between items-center w-full right-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h2 className="mb-3 font-bold text-black text-xl">Full Stack Developer</h2>
        <h3 className="mb-3 font-bold text-gray-800 text-xl">Hoosteers Design Lab</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">I have been working remotely as a software developer for Hosteers design lab where I Design and develope websites and web applications for clients using front end technologies like react . Working for the company has helped it grow and get more clients as I was bale to implement agile software development practices which has increased our efficiencies and enabled us to get more client work</p>
      </div>
    </div>

    {/* <!-- left timeline --> */}
    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
      </div>
      <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h2 className="mb-3 font-bold text-black text-xl">Fullstack Developer</h2>
        <h3 className="mb-3 font-bold text-gray-800 text-xl">Ample Plus Kenya</h3>
        <p className="text-sm font-medium leading-snug tracking-wide  text-gray-900 text-opacity-100">Tasked with building their fullstack Ecommerce website for selling house Hold  Items</p>
      </div>
    </div>

        {/* <!-- right timeline --> */}
        <div className="mb-8 flex justify-between items-center w-full right-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h2 className="mb-3 font-bold text-black text-xl">Full Stack Developer</h2>
        <h3 className="mb-3 font-bold text-gray-800 text-xl">Hasiera Enterprises</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">I have been working remotely as a software developer for Hosteers design lab where I Design and develope websites and web applications for clients using front end technologies like react . Working for the company has helped it grow and get more clients as I was bale to implement agile software development practices which has increased our efficiencies and enabled us to get more client work</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Experience