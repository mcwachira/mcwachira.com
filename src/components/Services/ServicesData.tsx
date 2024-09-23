import { Service } from '@/types/types'
import Image from 'next/image'
import appLight from '@/images/services/app-light.png'
import appDark from '@/images/services/app-dark.png'
import appDarkLight from '@/images/services/app-light-dark.png'
import aws from '@/images/services/aws.png'
import blockchain from '@/images/services/blockchain.png'
import nodejs  from '@/images/services/nodejs.png'
import react from '@/images/services/react.png'
import webLight from '@/images/services/web-light.png'
const ServicesData: Service[] = [
  {
    id: 1,
    icon: <Image src={appLight} alt="" className="h-auto w-40" priority />,
    title: 'Custom Application Development',
    paragraph:
      'I specialize in building custom web and mobile applications tailored to the specific requirement of the user while considering user experience,scalability,and security.',
  },
  {
    id: 2,

    icon: <Image src={webLight} alt="" className="w-50 h-auto" priority />,
    title: 'Website Development',
    paragraph:
      'Build beautiful and fast loading websites while incorporating search engine optimization (SEO) best practices.',
  },
  {
    id: 3,
    icon: <Image src={react} alt="" className="w-50 h-auto" priority />,
    title: 'React Development',
    paragraph:
      'Using React I focus on delivering tailored web applications with a strong emphasis on user experience, functionality, and maintainability. ',
  },
  {
    id: 4,
    icon: <Image src={blockchain} alt="" className="w-50 h-auto" priority />,
    title: 'Blockchain & Cryptocurrency Development',
    paragraph:
      'Designing and coding smart contracts and decentralized applications(Dapps)',
  },
  {
    id: 5,
    icon: <Image src={aws} alt="" className="w-50 h-auto" priority />,
    title: 'Maintain Cloud Infrastructure',
    paragraph:
      ' I provides expertise in leveraging cloud computing services from major providers by carrying out Cloud architecture design and setup for optimal performance and cost efficiency while also offering migration services to move existing applications to the cloud.',
  },
  {
    id: 6,
    icon: <Image src={nodejs} alt="" className="w-50 h-auto" priority />,
    title: 'Node.JS Development',
    paragraph:
      "Offer end-to-end application development using Node.js, encompassing both server-side and client-side development while building robust and secure RESTful API's.",
  },
]
export default ServicesData
