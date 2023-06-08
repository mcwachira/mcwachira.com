import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { Twitter, LinkedinSquare ,Github, Instagram} from 'styled-icons/boxicons-logos'
import { Blog } from 'styled-icons/icomoon'
import { getAllPosts } from '@/lib/posts'
import {device} from '@/utils/devices'
import ContactMe from '@/components/ContactMe/ContactMe'
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'
//import dynamically

const  ToggleButton  = dynamic(() =>import( '@/components/Button/ToggleButton'),{
  ssr:false
}
)

const TopContainer = styled.div`
display: flex;
height: 80vh;
flex-direction: column;
align-items: left;
justify-content:center ;
margin-right: auto;
margin-left: 3rem;
text-align: center;
margin-top:6rem;

@media ${device.tablet}{
height: 70vh;
}

`
const Title = styled.h1`
margin: 2rem auto;
font-size:1.2rem;
text-align:left;
width: 80%;
color:var(--color-text-primary);

@media ${device.mobileL}{
font-size:1.4rem;
}
@media ${device.tablet}{
  text-align:left;
font-size:1.7rem;

color:#000;
width: 100%;
}



@media ${device.tablet}{
font-size:1.9rem;
color:#000;
}
@media ${device.laptop}{
font-size:2.5rem;
color:#000;
}

`
const TitleSpan = styled.span`
color:#0070f3

`

const Motto = styled.p`
margin: 1.5rem  0;
font-weight: 300;
font-size:1rem;
line-height:2.2rem;
width: 80%;
text-align:left;

color:var(--color-text-primary);

@media ${device.mobileL}{
font-size:1.3rem;
}
@media ${device.tablet}{
font-size:1.5rem;
width: 100%;

}
@media ${device.laptop}{
font-size:1.7rem;

}

`
const HireMeButton = styled(Link)`
outline: none;
border: none;
width:150px;
//background-color: #10B981;
 background-color:transparent;
border:2px solid #fff;
color:#fff;
font-size:1.3rem;
font-weight: bold;
border-radius:10px;
margin:2rem 0;
// margin-left:1rem;
padding:0.6rem;
@media ${device.tablet}{
/* margin:2rem; */
}
`

const MySkills = styled.div`
  display: flex;
  flex-direction: column;



  @media ${device.mobileL}{
font-size:1.2rem;
}
@media ${device.tablet}{
 flex-direction:row
  /* text-align:left;
font-size:1.7rem;

color:#000;
width: 100%; */
}


`

const BasicSkill = styled.div`

display: flex;
  flex-direction: row;
  align-items:center;
  gap:-2rem;

  &>h3{
 font-size:1rem;
  }
    &>p{
     padding-left:1rem;
     /* text-align: center; */
     font-size:1.2rem;
    /* justify-self:flex-start; */
     font-weight: bold;
  }
  @media ${device.mobileL}{
font-size:1.3rem;
}
@media ${device.tablet}{
 flex-direction:column;
 justify-content: start;
 padding:0;
 text-align:left;
&>p{
     padding-left:1rem;
}

  `

const SocialLinks = styled.ul`
list-style: none;
margin: 0;
padding: 0;
display: flex;
gap: 2rem;
font-size: 1.25rem;
line-height: 1.75rem;


`
const BlueBlog = styled(Blog)`
 color: var(--color-social-logo);
`

const BlueTwitter = styled(Twitter)`
 color: var(--color-social-logo);
`
const BlueLinkedIn = styled(LinkedinSquare)`
 color: var(--color-social-logo);
`
const BlueGithub = styled(Github)`
 color: var(--color-social-logo);
`

const BlueInstagram = styled(Instagram)`
 color: var(--color-social-logo);
`
const BodyContainer = styled.div`
width: 100%;
margin:auto;
display:grid;
gap:1rem;
margin:2rem auto;
/* background: #EAEEF4; */

@media ${device.tablet}{
grid-template-columns: repeat(2, 1fr);
margin:1rem auto;
};
@media ${device.laptop}{
grid-template-columns: repeat(3, 1fr);
}
`
const PostHeading = styled.h2`
color:var(--color-text-secondary);
font-size:1.7rem;
margin-left:1rem;
font-weight:bold;
padding-bottom:1rem;
border-bottom:4px solid  var(--color-text-primary);


@media ${device.tablet}{
font-size:3rem;
}


`
const ContactContainer = styled.div`
background: var(--color-bg-tertiary);
width:100%;


@media ${device.tablet}{
  height:100vh;
}

`

//importing the post component dynamically o improve speed
const Post = dynamic(() => import('@/components/Post/Post.component'), {ssr:false});
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
export default function Home({posts}) {


  return (
    <div>
      <Head>
        <title>Mcwachira&#8216;s Blog and Portfolio site</title>
        <meta name="description" content="personal website blog and portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopContainer>
  
          <Motto>
            I am a Fullstack Software developer helping Startup&#8216;s build mobile and web applications that your user&#8216;s will love.
          </Motto>

  
                    <HireMeButton href='#contact-section'>
                      Hire me
                    </HireMeButton>
        
    
          <MySkills>

          <BasicSkill>
          <h3> Experience </h3>
          <p> 3+ Years</p>
          </BasicSkill>
     
          
          <BasicSkill>
          <h3> Core Tech Stack </h3>
          <p> React, Node, Java & Go</p>
          </BasicSkill>
          
          <BasicSkill>
          <h3> Location</h3>
          <p> Nairobi</p>
          </BasicSkill>
      
          <BasicSkill>
      
          <h3> Languages </h3>
          <p> English, Swahili</p>
          </BasicSkill>
          </MySkills>
        
        <SocialLinks>
         
        <li>
            <a href="https://twitter.com/mc_wachira/" target="_blank" rel='noreferrer'>
              <BlueTwitter size='40' />
       </a>
        </li>
          <li>
            <a href="https://www.linkedin.com/in/maina-wachira/" target="_blank" rel='noreferrer'>
              <BlueLinkedIn size='40'/>
            </a>
          </li>
          <li>
            <a href="https://github.com/mcwachira" target="_blank" rel='noreferrer'>
              <BlueGithub size='40' />
            </a>
          </li>
          <li>
            <a href="" target="_blank" rel='noreferrer'>
              <BlueInstagram size='40' />
            </a>
          </li>
        </SocialLinks>
      </TopContainer>
     
 

      <PostHeading>
        Latest Posts
      
      </PostHeading>
      <BodyContainer>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}

      </BodyContainer>

      <ContactContainer>
        <ContactMe />
      </ContactContainer>
      
    </div>
  )
}


export function getStaticProps() {
  const posts = getAllPosts().slice(0, 6)
console.log(posts)
  return {
    props:{
      posts
    }
  }
}