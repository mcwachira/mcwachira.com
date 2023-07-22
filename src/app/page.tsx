'use client'

import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import styled from 'styled-components'
import { Twitter, LinkedinSquare ,Github, Instagram} from 'styled-icons/boxicons-logos'
import { Blog } from 'styled-icons/icomoon'

import Link from 'next/link'
//import dynamically

// const  ToggleButton  = dynamic(() =>import( '@/components/Button/ToggleButton'),{
//         ssr:false
//     }
// )

// const TopContainer = styled.div`
// display: flex;
// height: 80vh;
// flex-direction: column;
// align-items: left;
// justify-content:center ;
// margin-right: auto;
// margin-left: 3rem;
// text-align: center;
// margin-top:6rem;

// @media ${device.tablet}{
// height: 70vh;
// }

// `

// const TitleSpan = styled.span`
// color:#0070f3

// `


//importing the post component dynamically o improve speed
//const Post = dynamic(() => import('@/components/Post/Post.component'), {ssr:false});
/* const ContactMe = dynamic(() => import('@/components/ContactMe/ContactMe'), {
  ssr:false,

    loading: () => (
    <p className="loadingText subtitle-4">
      Contact us Loading, please wait...
    </p>
  ),

        / <Title>
          Hi I&#8216;m  <TitleSpan>Charles Wachira</TitleSpan>
          </Title>
});  */
export default function Home() {


    return (
        <>
        <div>
            <Head>
                <h1 className='my-8 mx-auto text-sm w-10/12 text-warmGay-800 sm:text-2xl md:text-left md:text-3xl md:text-black md:w-full lg:text-4xl'>
                Mcwachira&#8216;s Blog and Portfolio site</h1>
                <meta name="description" content="personal website blog and portfolio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

              <div className='flex flex-col justify-center mr-auto ml-12 mt-20 text-center h-5/6'>


            <p className='my-6 mx-0 font-light leading-9 text-base w-10/12 text-left text-warmGay-800 md:text-2xl md:w-full lg:text-3xl'>
                    I am a Fullstack Software developer helping Startup&#8216;s build mobile and web applications that your user&#8216;s will love.
                </p>


                <Link className='outline-none w-40 bg-transparent text-white text-xl font-bold p-2 my-8 mx-0 border-2 border-cyan-100 md:m-8 ' href='#contact-section'>
                    Hire me
                </Link>





                <div className='flex flex-col text-xl md:flex-row md:flex-start md:padding-0 md:text'>

                    <div className='flex flex-row text-center'>
                        <h3 className='text-base'> Experience </h3>
                        <p className='text-xl font-bold pl-4 md:pl-4'> 3+ Years</p>
                    </div>


                    <div className='flex flex-row text-center'>
                        <h3 className='text-base'> Core Tech Stack </h3>
                        <p className='text-xl font-bold pl-4 md:pl-4'> React, Node, Java & Go</p>
                    </div>

                    <div className='flex flex-row text-center'>
                        <h3 className='text-base'> Location</h3>
                        <p className='text-xl font-bold pl-4 md:pl-4'> Nairobi</p>
                    </div>

                    <div className='flex flex-row text-center'>

                        <h3 className='text-base'> Languages </h3>
                        <p className='text-xl font-bold pl-4 md:pl-4'> English, Swahili</p>
                    </div>
                </div> 





                <ul className='list-none p-0 m-0 flex gap-8 text-x leading-7'>

                    <li>
                        <a href="https://twitter.com/mc_wachira/" target="_blank" rel='noreferrer'>
                            <Twitter className='text-black-100' size='40' />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/maina-wachira/" target="_blank" rel='noreferrer'>
                            <LinkedinSquare className='text-black-100'size='40'/>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/mcwachira" target="_blank" rel='noreferrer'>
                            <Github className='text-black-100' size='40' />
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" rel='noreferrer'>
                            <Instagram className='text-black-100' size='40' />
                        </a>
                    </li>
                </ul>
            </div>



            <h2 className='text-2xl font-bold border-4 border-warmGay-800 ml-4 pb-4 md:text-4xl'>
                Latest Posts

            </h2>
            <div className='w-full  grid gap-4 my-8 mx-auto md:grid-cols-2 md:my-4 md:mx-auto lg:grid-cols-3'>


                hello world

            </div>

      
        </div>
        </>
    )
}

/* 
export function getStaticProps() {
    const posts = getAllPosts().slice(0, 6)
    console.log(posts)
    return {
        props:{
            posts
        }
    }
} */