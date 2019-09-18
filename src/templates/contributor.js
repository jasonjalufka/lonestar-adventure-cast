import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ContributorTemplate = ({
  name,
  firstName,
  lastName,
  image,
  helmet
}) => {
  return (
    <section className='section'>
      {helmet || ''}
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold'>{name}</h1>
            <h2>{firstName}</h2>
            <h2>{lastName}</h2>
            <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: `profile picture for ${name}`
              }}
            />
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
        helmet={
          <Helmet titleTemplate='%s | Profile'>
            <title>{`${contributor.frontmatter.fullName}`}</title>
            <meta
              name='description'
              content={`Profile page for ${contributor.frontmatter.fullName}`}
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
