import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link, withPrefix } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Background from '../img/background-pattern.svg'
import LocationPin from '../img/location.svg'

export const ContributorTemplate = ({
  name,
  firstName,
  lastName,
  image,
  role,
  location,
  bio,
  helmet
}) => {
  return (
    <section className='section'>
      {helmet || ''}
      <div
        className='container content'
        style={{
          backgroundImage: `url(${Background})`,
          minHeight: '80vh'
        }}
      >
        <div className='columns'>
          <div className='column is-3'>
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
              <PreviewCompatibleImage
                profilePic
                imageInfo={{
                  image: image,
                  alt: `profile picture for ${name}`
                }}
              />
            </div>
          </div>
          <div className='column' style={{ alignSelf: 'center' }}>
            <div className='columns is-multiline has-text-centered-touch'>
              <div className='column is-12'>
                <h1
                  className='has-text-weight-bold'
                  style={{ marginBottom: '0' }}
                >
                  {name}
                </h1>
              </div>
              <div
                className='column is-12'
                style={{ paddingTop: '0', fontSize: '18px' }}
              >
                <i>{role}</i>
              </div>
              <div className='column is-12' style={{ paddingTop: '0' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9B9B9B',
                    fontSize: '16px'
                  }}
                >
                  <p
                    className='has-text-centered-touch'
                    style={{ width: '100%' }}
                  >
                    <span>
                      <img
                        src={LocationPin}
                        alt='location pin'
                        style={{
                          width: '16px',
                          marginRight: '6px'
                        }}
                      />
                    </span>
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <article
              style={{
                borderLeft: '3px solid #ff4400',
                margin: '0 1rem 0 1rem',
                padding: '1rem 0 1rem 1rem',
                backgroundColor: 'white',
                fontSize: '18px'
              }}
            >
              {bio}
            </article>
          </div>
        </div>
      </div>
    </section>
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
