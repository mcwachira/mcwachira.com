// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrism from "@mapbox/rehype-prism";
var computedFields = {
  url: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slug: {
    type: "string",
    resolve: (doc) => `${doc._raw.sourceFileName.replace(".mdx", "")}`
  }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "string", required: true },
    image: { type: "string", required: true },
    description: { type: "string", required: true },
    timeToRead: { type: "number", required: true }
    // in minutes
  },
  computedFields
}));
var CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: `work/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    thumbnail: { type: "string", required: true },
    coverImage: { type: "string", required: true },
    images: { type: "list", of: { type: "string" } },
    projectURL: { type: "string", required: true },
    description: { type: "string", required: true },
    projectDuration: { type: "string", required: true },
    client: { type: "json", required: true },
    testimonial: { type: "json", required: true }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post, CaseStudy],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism]
  }
});
export {
  CaseStudy,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EAZDXGGL.mjs.map
