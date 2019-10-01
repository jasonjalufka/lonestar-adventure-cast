import React from 'react'
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
            <div className='column is-3' style={{ paddingBottom: '2rem' }}>
              <div
                className='image-cropper profile-pic'
                style={{
                  width: '175px',
                  height: '175px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  margin: 'auto',
                  border: '1px solid #fe4400'
                }}
              >
                <Link to={contributor.fields.slug}>
                  <PreviewCompatibleImage
                    profilePic
                    imageInfo={{
                      image: contributor.frontmatter.image,
                      alt: `profile picture for ${contributor.frontmatter.fullName}`
                    }}
                  />
                </Link>
              </div>
              <div className='container has-text-centered'>
                <h3
                  style={{
                    fontWeight: '700',
                    padding: '15px 0 0 0',
                    fontSize: '26px'
                  }}
                >
                  <span style={{ backgroundColor: 'white' }}>
                    {contributor.frontmatter.fullName}
                  </span>
                </h3>
                <p>
                  <i style={{ backgroundColor: 'white' }}>
                    {contributor.frontmatter.role}
                  </i>
                </p>
              </div>
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
                location
                role
                bio
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
