import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Soundcloud from '../components/Soundcloud'

export const PodcastPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  html
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className='section'>
      {helmet || ''}
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
              {title}
            </h1>
            <Soundcloud title={title} html={html} />
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className='taglist'>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

PodcastPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
}

const PodcastPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PodcastPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        html={post.htmlAst}
        helmet={
          <Helmet titleTemplate='%s | Blog'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

PodcastPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default PodcastPost

export const pageQuery = graphql`
  query PodcastPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      fields {
        slug
      }
      frontmatter {
        templateKey
        podcastlink
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
