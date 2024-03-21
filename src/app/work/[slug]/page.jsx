import {allCaseStudies} from "contentlayer/generated";
import {CaseStudyHero} from "../../../components/work/CaseStudyHero";
import {CaseStudyDetails} from "../../../components/work/CaseStudyDetails";
import {MdxContent} from "../../../components/mdx/MdxContent";
import {CaseStudyGallery} from "../../../components/work/CaseStudyGallery";
import {CaseStudyNavigation} from "../../../components/work/CaseStudyNavigation";
import Footer from "../../../components/ui/Footer";


export const generateStaticParams = async () =>
  allCaseStudies.map((caseStudy) => ({ slug: caseStudy.slug }))

export async function generateMetadata({ params }) {
  const caseStudy = allCaseStudies.find(
    (caseStudy) => caseStudy.slug === params.slug
  )
    console.log(caseStudy)
  return { title: caseStudy.title, description: caseStudy.description }
}

export default function CaseStudyPage({ params }) {
  const caseStudy = allCaseStudies.find(
    (caseStudy) => caseStudy.slug === params.slug
  )

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
  )
}

export const dynamicParams = false
