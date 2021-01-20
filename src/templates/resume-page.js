import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { RiDownloadFill } from "react-icons/ri"

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
    allFile(filter: { extension: { eq: "pdf" } }) {
      edges {
        node {
          publicURL
          name
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
      <div className="wrapper">
        {data.allFile.edges.map((file, index) => {
          return (
            <a href={file.node.publicURL} download>
              <h1 style={{ color: "black" }}>Resume</h1>
            </a>
          )
        })}
        <article dangerouslySetInnerHTML={{ __html: html }} />
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

        {data.allFile.edges.map((file, index) => {
          return (
            <p style={{ textAlign: "center" }}>
              <a href={file.node.publicURL} download>
                Download
              </a>
            </p>
          )
        })}
      </div>
    </Layout>
  )
}

export default ResumePage
