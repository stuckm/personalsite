import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiGithubFill,
  RiComputerLine,
} from "react-icons/ri"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Pagination = props => (
  <div className="pagination -post">
    <ul>
      {props.previous && props.previous.frontmatter.template === "blog-post" && (
        <li>
          <Link to={props.previous.frontmatter.slug} rel="prev">
            <p>
              <span className="icon -left">
                <RiArrowLeftLine />
              </span>{" "}
              Previous
            </p>
            <span className="page-title">
              {props.previous.frontmatter.title}
            </span>
          </Link>
        </li>
      )}
      {props.next && props.next.frontmatter.template === "blog-post" && (
        <li>
          <Link to={props.next.frontmatter.slug} rel="next">
            <p>
              Next{" "}
              <span className="icon -right">
                <RiArrowRightLine />
              </span>
            </p>
            <span className="page-title">{props.next.frontmatter.title}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : ""
  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  return (
    <Layout className="page">
      <SEO
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        image={Image}
        article={true}
      />
      <article className="blog-post">
        <header className="featured-banner">
          <section className="article-header">
            <h1>{frontmatter.title}</h1>
            <time>{frontmatter.date}</time>
          </section>
          {Image ? (
            <Img
              fluid={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
              imgStyle={{ objectFit: "contain" }}
            />
          ) : (
            ""
          )}
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="blog-post-deets">
          <Link to={frontmatter.site}>
            <RiComputerLine style={{ fontSize: "50px" }} /> <br />
            <span>Demo</span>
          </Link>
          <Link to={frontmatter.code}>
            <RiGithubFill style={{ fontSize: "50px" }} />
            <br />
            Code
          </Link>
        </div>
      </article>
      {(previous || next) && <Pagination {...props} />}
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        tech
        site
        code
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 1750
              maxHeight: 1050
              quality: 100
              srcSetBreakpoints: [350, 700, 1050, 1400]
            ) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
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
