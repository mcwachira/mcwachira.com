import { getAllTags } from "@/lib/caseStudies";
import { CaseStudies } from "@/components/work/CaseStudies";
import { allCaseStudies } from "contentlayer/generated";

// Define the interface for params
interface Params {
  tagSlug: string;
}

const parseTag = (tagSlug: string) => {
  const tag = tagSlug
      .replace(/-/g, ' ')
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');
  return tag;
};

export const generateStaticParams = async () => {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tagSlug: tag.replace(/ /g, '-').toLowerCase() }));
};

export async function generateMetadata({ params }: { params: Params }) {
  const tag = parseTag(params.tagSlug);
  return { title: tag };
}

export default async function WorkCategoryPage({ params }: { params: Params }) {
  const caseStudies = allCaseStudies.filter((caseStudy) =>
      caseStudy?.tags?.includes(parseTag(params.tagSlug))
  );

  return <CaseStudies caseStudies={caseStudies} />;
}

export const dynamicParams = false;
