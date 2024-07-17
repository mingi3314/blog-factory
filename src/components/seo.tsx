import React from "react"

import { Helmet } from "react-helmet"
import {
  type Graph,
  type ImageObject,
  type Organization,
  type Thing,
  type WebPage,
  type WebSite,
} from "schema-dts"

import useSiteMetadata from "~/src/hooks/useSiteMetadata"

import defaultOpenGraphImage from "../images/og-thumbnail.png"

const DEFAULT_LANG = "en-US"

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[]

interface SEOProperties {
  title?: Queries.Maybe<string>
  desc?: Queries.Maybe<string>
  slug?: Queries.Maybe<string>
  image?: Queries.Maybe<string>
  dateModified?: Queries.Maybe<string>
  meta?: Meta
  jsonLds?: Thing[]
}

const SEO: React.FC<SEOProperties> = ({
  title = "",
  desc = "",
  slug = "",
  image,
  jsonLds = [],
}) => {
  const site = useSiteMetadata()
  const pageTitle = title || site.title!
  const description = (desc || site.description || "").slice(0, 160)
  const ogImageUrl = image || (defaultOpenGraphImage as string)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...jsonLds,
      {
        "@type": "Organization",
        "@id": `${site.siteUrl}/#organization`,
        name: site.title,
        url: site.siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${site.siteUrl}/#/schema/logo/image/`,
          url: `${site.siteUrl}${defaultOpenGraphImage}`,
          contentUrl: `${site.siteUrl}${defaultOpenGraphImage}`,
          caption: `${site.title} logo`,
        },
        image: {
          "@id": `${site.siteUrl}/#/schema/logo/image/`,
        },
        sameAs: [],
      } as Organization,
      {
        "@type": "WebSite",
        "@id": `${site.siteUrl}/#website`,
        name: site.title,
        alternateName: site.title,
        url: site.siteUrl,
        description: site.description,
        publisher: { "@id": `${site.siteUrl}/#organization` },
        inLanguage: site.lang ?? DEFAULT_LANG,
      } as WebSite,
      {
        "@type": "WebPage",
        "@id": `${site.siteUrl}${slug}`,
        url: `${site.siteUrl}${slug}`,
        name: pageTitle,
        isPartOf: { "@id": `${site.siteUrl}/#website` },
        primaryImageOfPage: { "@id": `${site.siteUrl}${slug}#primaryImage` },
        image: { "@id": `${site.siteUrl}${slug}#primaryImage` },
        thumbnailUrl: ogImageUrl,
        description: description,
        inLanguage: site.lang ?? DEFAULT_LANG,
        potentialAction: {
          "@type": "ReadAction",
          target: [`${site.siteUrl}${slug}`],
        },
      } as WebPage,
      {
        "@type": "ImageObject",
        "@id": `${site.siteUrl}${slug}#primaryImage`,
        url: ogImageUrl,
        contentUrl: ogImageUrl,
      } as ImageObject,
    ],
  } as Graph

  return (
    <Helmet
      htmlAttributes={{ lang: site.lang ?? DEFAULT_LANG }}
      title={pageTitle}
      titleTemplate={pageTitle}
      meta={
        [
          {
            name: "description",
            content: description,
          },
          {
            property: "og:title",
            content: title,
          },
          {
            property: "og:description",
            content: description,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary",
          },
          {
            name: "twitter:creator",
            content: site.author,
          },
          {
            name: "twitter:title",
            content: title,
          },
          {
            name: "twitter:description",
            content: description,
          },
          {
            property: "image",
            content: ogImageUrl,
          },
          {
            property: "og:image",
            content: ogImageUrl,
          },
          {
            property: "twitter:image",
            content: ogImageUrl,
          },
        ] as Meta
      }
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default SEO
