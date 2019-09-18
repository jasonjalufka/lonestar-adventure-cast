import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class Contributors extends React.Component {
  render() {
    const { data } = this.props
    const { edges: contributors } = data.allMarkdownRemark

    return (
      <div className='columns is-multiline'>
        {contributors &&
          contributors.map(({ node: contributor }) => (
            <div>
              <PreviewCompatibleImage
                imageInfo={{
                  image: contributor.frontmatter.image,
                  alt: `profile picture for ${contributor.frontmatter.fullName}`
                }}
              />
              <h3>{contributor.frontmatter.fullName} - Profile</h3>
              <h4>{contributor.frontmatter.contributorName.firstName}</h4>
              <p>{contributor.fields.slug}</p>
            </div>
          ))}
      </div>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query ContributorsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "contributor" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                fullName
                contributorName {
                  firstName
                  lastName
                }
                image {
                  childImageSharp {
                    fluid(maxWidth: 360, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Contributors data={data} count={count} />}
  />
)
