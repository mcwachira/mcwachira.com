import { allCaseStudies } from "contentlayer/generated";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { CaseStudyDetails } from "@/components/work/CaseStudyDetails";
import { MdxContent } from "@/components/mdx/MdxContent";
import { CaseStudyNavigation } from "@/components/work/CaseStudyNavigation";
import Footer from "../../../components/ui/Footer";

// Define the CaseStudy interface
interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    tags: string[];
    coverImage: string;
    client: string;
    description: string;
    projectDuration: string;
    projectURL: string;
    githubLink?: string; // Optional property
    body: {
        code: string; // Assuming body has a code property
    };
}

// Define the Params interface for generateMetadata
interface MetadataParams {
    params: {
        slug: string;
    };
}

export const generateStaticParams = async () =>
    allCaseStudies.map((caseStudy: CaseStudy) => ({ slug: caseStudy.slug }));

export async function generateMetadata({ params }: MetadataParams) {
    const caseStudy = allCaseStudies.find(
        (caseStudy: CaseStudy) => caseStudy.slug === params.slug
    );

    if (!caseStudy) {
        throw new Error('Case study not found');
    }

    return { title: caseStudy.title, description: caseStudy.description };
}

export default function CaseStudyPage({ params }: MetadataParams) {
    const caseStudy = allCaseStudies.find(
        (caseStudy: CaseStudy) => caseStudy.slug === params.slug
    );

    if (!caseStudy) {
        return <div>Case study not found</div>; // Handle case study not found
    }

    return (
        <>
            <CaseStudyHero
                title={caseStudy.title}
                subtitle={caseStudy.subtitle}
                tags={caseStudy.tags}
                coverImage={caseStudy.coverImage}
            />
            <CaseStudyDetails
                client={caseStudy.client}
                description={caseStudy.description}
                projectDuration={caseStudy.projectDuration}
                projectURL={caseStudy.projectURL}
                githubLink={caseStudy.githubLink}
            >
                <MdxContent code={caseStudy.body.code} />
            </CaseStudyDetails>
            {/*<CaseStudyGallery images={caseStudy.images} />*/}
            {/*<CaseStudyTestimonial*/}
            {/*  clientName={caseStudy.client.name}*/}
            {/*  testimonial={caseStudy.testimonial}*/}
            {/*/>*/}
            <CaseStudyNavigation caseStudySlug={caseStudy.slug} />
            <Footer newsletter={false} />
        </>
    );
}

export const dynamicParams = false;