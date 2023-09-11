import glob from 'fast-glob'
import path from 'path'


const importantCaseStudy = async (caseStudyFileName:string) => {
    let {data} = await  import(`../pages/work/${caseStudyFileName}`)

    console.log(data)

    return {
        slug: caseStudyFileName.replace(/(\/index)?\.mdx$/, ''),
        ...data,
    }
}

export const getAllCaseStudies =async() => {
    let caseStudyFilenames = await glob(['*.mdx', '*/index.mdx'], {
        cwd: path.join(process.cwd(), 'src/pages/work'),
      })

      //Promise.all() static method takes an iterable of promises as input and returns a single Promise. 
      let caseStudies = await Promise.all(
        caseStudyFilenames.map((caseStudyFilename) => {
            importantCaseStudy(caseStudyFilename)
        })
      )
    //   console.log(caseStudies)

      return caseStudies.sort((a1, a2) => new Date(a2.date) - new Date(a1.date))
}






export const getAllTags = async() => {

    let caseStudies = await getAllCaseStudies();
    //flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
    let repeatingTags = caseStudies.map((caseStudy) => caseStudy?.tags).flat()

    const tagCount = new Map()

    repeatingTags.forEach((tag) => {
      if (tagCount.has(tag)) {
        tagCount.set(tag, tagCount.get(tag) + 1)
      } else {
        tagCount.set(tag, 1) // Map to capture Count of elements
      }
    })
  
    const uniqueTags = [...new Set(repeatingTags)]
  
    const tags = uniqueTags.sort((tag1, tag2) => {
      let freq1 = tagCount.get(tag1)
      let freq2 = tagCount.get(tag2)
  
      return freq2 - freq1
    })
  
    return tags.slice(0, 4)
}

export async function getFeaturedTags() {
    const tags = await getAllTags()
  
    return tags.slice(0, 4)
  }
  
  export async function getCaseStudiesWithTag(tag) {
    const caseStudies = await getAllCaseStudies()
  
    const caseStudiesWithTag = caseStudies.filter((caseStudy) => {
      return caseStudy.tags.some((t) => {
        console.log(tag)
        return t === tag
      })
    })
  
    return caseStudiesWithTag
  }
  