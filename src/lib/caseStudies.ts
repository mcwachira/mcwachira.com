import { allCaseStudies } from 'contentlayer/generated'

export function getAllTags() {
  let repeatingTags = allCaseStudies.map((caseStudy) => caseStudy.tags).flat()

  const tagCount = new Map()

  repeatingTags.forEach((tag) => {
    if (tagCount.has(tag)) {
      tagCount.set(tag, tagCount.get(tag) + 1)
    } else {
      tagCount.set(tag, 1) // Map to capture Count of elements
    }
  })



  // const uniqueTags = [...new Set(repeatingTags)]


  const uniqueTags = Array.from(new Set(repeatingTags));
  const tags = uniqueTags.sort((tag1, tag2) => {
    let freq1 = tagCount.get(tag1)
    let freq2 = tagCount.get(tag2)

    return freq2 - freq1
  })

  return tags
}


export function getFeaturedTags(): string[] {
  const tags = getAllTags();

  // Filter out any undefined values and slice the first 4 valid tags
  return tags.filter((tag): tag is string => tag !== undefined).slice(0, 4);
}

