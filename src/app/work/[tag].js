import Head from "next/head";

import CaseStudies from "@/components/CaseStudy/CaseStudies";
import {
  getCaseStudiesWithTag,
  getFeaturedTags,
  getAllTags,
} from "@/lib/caseStudies";

export default function Work({ caseStudies, tags, tag }) {
  return (
    <>
      <Head>
        <title>Work - {tag} - Jane Doe</title>
        <meta
          name="description"
          content="Explore an impressive collection of case studies showcasing a my diverse skill set, innovative solutions, and successful projects."
        />
      </Head>

      <CaseStudies caseStudies={caseStudies} tags={tags} />
    </>
  );
}

export async function getStaticPaths() {
  const tags = await getAllTags();
  return {
    paths: tags.map((tag) => ({
      params: { tag: tag.replace(/ /g, "-").toLowerCase() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag } }) {
  tag = tag
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");

  return {
    props: {
      caseStudies: await getCaseStudiesWithTag(tag),
      tags: await getFeaturedTags(),
      tag,
    },
  };
}
