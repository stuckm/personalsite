import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query theQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 1200
              maxHeight: 768
              quality: 100
              srcSetBreakpoints: [350, 700, 1050, 1400]
            ) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              src
            }
          }
        }
      }
    }
  }
`
const ResumePage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : ""

  return (
    <Layout className="page">
      <SEO title={frontmatter.title} description={excerpt} />
      <section className="article-header">
        <h1>{frontmatter.title}</h1>
      </section>

      {Image ? (
        <Img
          fluid={Image}
          objectFit="cover"
          objectPosition="50% 50%"
          alt={frontmatter.title + " - Featured image"}
          className="featured-image"
        />
      ) : (
        ""
      )}
      <div className="wrapper">
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export default ResumePage
