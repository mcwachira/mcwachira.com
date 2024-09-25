import { getAllTags } from "@/lib/caseStudies";
import { CaseStudies } from "@/components/work/CaseStudies";
import { allCaseStudies } from "contentlayer/generated";

// Define the interface for params
interface Params {
  tagSlug: string;
}

// Function to format tag slug into a readable format
const parseTag = (tagSlug: string) => {
  return tagSlug
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
};

// Generate static params based on tags
export const generateStaticParams = async () => {
  const tags = await getAllTags();

  // Filter undefined tags and ensure proper string type
  return (tags || []).filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => ({
        tagSlug: tag.replace(/ /g, '-').toLowerCase(),
      }));
};

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Params }) {
  const tag = parseTag(params.tagSlug);
  return { title: tag };
}

// Default export for the Work Category Page
export default async function WorkCategoryPage({ params }: { params: Params }) {
  const caseStudies = allCaseStudies.filter((caseStudy) =>
      caseStudy?.tags?.includes(parseTag(params.tagSlug))
  );

  return <CaseStudies caseStudies={caseStudies} />;
}

// Static params configuration
export const dynamicParams = false;
