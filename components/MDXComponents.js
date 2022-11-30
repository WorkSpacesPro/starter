/* eslint-disable react/display-name */
import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import Image from "./Image"
import CustomLink from "./Link"
import TOCInline from "./TOCInline"
import Pre from "./Pre"
import { BlogNewsletterForm } from "./NewsletterForm"
import CTABanner from "./CTABanner/templateBanner"
import AddToSlack from "./CTABanner/addToSlack"
import { ImageContainer } from "./utils/image-article"
import { NoFollowLink } from "./utils/nofollow-link"
import EnterpriseEmailInput from "./EnterpriseEmailInput"
import { SubImageText } from "./utils/subimage-text"

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
  EnterpriseEmailInput,
  CTABanner,
  AddToSlack,
  ImageContainer,
  SubImageText,
  NoFollowLink,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
