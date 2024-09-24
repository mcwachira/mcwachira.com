export type Service = {
    id: number;
    icon: JSX.Element;
    title: string;
    paragraph: string;
  };
  

  export type MetaTypes = {

    date:string;
    title: string;
    category: string;
    image: string;
    description:string;
  timeToRead:string;

  }

export type CaseStudy = {
    slug: string;
    title: string;
    tags?: string[]; // tags can be string[] or undefined
    // other fields...
};