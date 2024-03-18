import Head from "next/head";

import CaseStudies from "@/components/CaseStudy/CaseStudies";
import { getAllCaseStudies, getFeaturedTags } from "@/lib/caseStudies";

const Work = ({ caseStudies, tags }) => {
  console.log(caseStudies);
  return (
    <>
      <Head>
        <title>Work - Mcwachira</title>
        <meta
          name="description"
          content="Explore an impressive collection of case studies showcasing a my diverse skill set, innovative solutions, and successful projects."
        />
      </Head>

      <CaseStudies caseStudies={caseStudies} tags={tags} />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      caseStudies: await getAllCaseStudies(),
      tags: await getFeaturedTags(),
    },
  };
}

export default Work;
