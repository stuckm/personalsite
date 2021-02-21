import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostCard = ({ data }) => (
  <article className="post-card">
    {data.frontmatter.featuredImage ? (
      <Link to={data.frontmatter.slug}>
        <Img
          fluid={data.frontmatter.featuredImage.childImageSharp.fluid}
          alt={data.frontmatter.title + " - Featured image"}
          className="featured-image"
          imgStyle={{ objectFit: "contain" }}
        />
      </Link>
    ) : (
      ""
    )}
    <div class="post-content">
      <h2 className="title">
        <Link to={data.frontmatter.slug}>{data.frontmatter.title}</Link>
      </h2>
      <p className="meta">
        <time>{data.frontmatter.date}</time>
      </p>
    </div>
  </article>
)

export default PostCard
