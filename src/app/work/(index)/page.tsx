import { allCaseStudies } from 'contentlayer/generated'
import {CaseStudies} from "../../../components/work/CaseStudies";


export default function WorkPage() {
  return <CaseStudies caseStudies={allCaseStudies} />
}
