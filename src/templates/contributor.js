import React from 'react'
import Helmet from 'react-helmet'
import { graphql, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import ProfileArticles from '../components/ProfileArticles'
import '../components/all.sass'

export const ContributorTemplate = ({
  name,
  firstName,
  lastName,
  image,
  role,
  social,
  location,
  bio,
  posts,
  helmet
}) => {
  return (
    <>
      <div
        className='full-width-image-container margin-top-0 contributor-background-image'
        style={{
          backgroundImage: `url('/img/img_1156.jpg')`,
          backgroundPositionY: '50%'
        }}
      />

      <section className='section' style={{ marginTop: '-140px' }}>
        {helmet || ''}
        <div className='columns'>
          <div className='column is-4'>
            <div className='image-cropper profile-pic contributor-image'>
              <PreviewCompatibleImage
                profilePic
                imageInfo={{
                  image: image,
                  alt: `profile picture for ${name}`
                }}
              />
            </div>
          </div>
          <div className='column contributor-details-column'>
            <div className='columns is-multiline contributor-details'>
              <div className='column is-12 contributor-name'>
                <h1 className='is-serif' style={{ marginBottom: '0' }}>
                  {name}
                </h1>
              </div>
              <div className='column is-12 contributor-role is-regular'>
                {role}
              </div>
              {social && (
                <div
                  className='column is-12 contributor-role is-regular'
                  style={{ paddingTop: '5px' }}
                >
                  {social.map((app, key) => (
                    <a key={key} title={app.appName} href={app.link}>
                      <img
                        src={app.appName}
                        alt={app.appName}
                        style={{
                          width: '1em',
                          height: '1em',
                          marginRight: '15px'
                        }}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='columns'>
          <div className='column contributor-bio'>
            <article
              style={{
                fontSize: '18px'
              }}
            >
              {bio}
            </article>
          </div>
        </div>
        <ProfileArticles posts={posts} />
      </section>
    </>
  )
}

const ContributorProfile = ({ data }) => {
  const { markdownRemark: contributor } = data

  return (
    <Layout>
      <ContributorTemplate
        name={contributor.frontmatter.fullName}
        image={contributor.frontmatter.image}
        firstName={contributor.frontmatter.contributorName.firstName}
        lastName={contributor.frontmatter.contributorName.lastName}
        location={contributor.frontmatter.location}
        role={contributor.frontmatter.role}
        bio={contributor.frontmatter.bio}
        posts={contributor.fields.posts ? contributor.fields.posts : ''}
        helmet={
          <Helmet titleTemplate='%s | Profile'>
            <title>{`${contributor.frontmatter.fullName}`}</title>
            <meta
              name='description'
              content={`Profile page for ${contributor.frontmatter.fullName}`}
            />
            <meta
              property='og:title'
              content={contributor.frontmatter.fullName}
            />
            <meta
              property='og:url'
              content={`/contributor${contributor.fields.slug}`}
            />
            <meta
              property='og:image'
              content={`${withPrefix('/')}img/404.jpg`}
            />
          </Helmet>
        }
      />
    </Layout>
  )
}

export default ContributorProfile

export const pageQuery = graphql`
  query ContributorByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
        posts {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 360, quality: 30) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
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
`
