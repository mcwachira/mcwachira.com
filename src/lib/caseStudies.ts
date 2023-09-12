import glob from 'fast-glob'
import path from 'path'

async function importCaseStudy(caseStudyFilename:string) {
  let { data } = await import(`../pages/work/${caseStudyFilename}`)

  return {
    slug: caseStudyFilename.replace(/(\/index)?\.mdx$/, ''),
    ...data,
  }
}

export async function getAllCaseStudies() {
  let caseStudyFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/work'),
  })

  let caseStudies = await Promise.all(
    caseStudyFilenames.map((caseStudyFilename) =>
      importCaseStudy(caseStudyFilename)
    )
  )

  return caseStudies.sort((a1, a2) => new Date(a2.date).getTime() - new Date(a1.date).getTime())
}

export async function getAllTags() {
  let caseStudies = await getAllCaseStudies()
  let repeatingTags = caseStudies.map((caseStudy) => caseStudy.tags).flat()

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

export async function getCaseStudiesWithTag(tag:any) {
  const caseStudies = await getAllCaseStudies()

  const caseStudiesWithTag = caseStudies.filter((caseStudy) => {
    return caseStudy.tags.some((t:any) => {
      console.log(tag)
      return t === tag
    })
  })

  return caseStudiesWithTag
}
