import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Soundcloud from '../../components/Soundcloud'
import calendar from '../../img/calendar.svg'
import clock from '../../img/clock.svg'

const PodcastIndexPage = ({ data }) => {
  const { edges: podcasts } = data.allMarkdownRemark
  return (
    <Layout>
      <div
        className='full-width-image-container margin-top-0'
        style={{
          backgroundImage: `url('/img/img_1102.jpg')`
        }}
      >
        <div
        className='image-overlay'
        style={{
          width: `100%`,
          height: `100%`,
          backgroundColor: `rgba(0, 0, 0, 0.4)`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-around`
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '150px',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
        <h1
          className='has-text-weight-bold is-size-1'
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
            textAlign: 'center',
            textShadow: '#0000004f 0px 0px 3px'
          }}
        >
          Latest Podcasts
        </h1>
        </div>
      </div>
      </div>
      <section className='section'>
        <div className='container'>
          <div className='content'>
              {podcasts &&
                podcasts.map(({ node: post }) => (
                  <div className='columns' style={{ paddingBottom: '40px' }}>
                    <div className='column is-10 is-offset-1 box' key={post.id}>
                      <div className='columns'>
                        <div className='column is-4'>
                          <Soundcloud html={post.htmlAst} />
                        </div>
                        <div className='column'>
                          <h3>{post.frontmatter.title}</h3>
                          <p
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#9B9B9B',
                              fontSize: '15px'
                            }}
                          >
                            <img
                              src={calendar}
                              alt='calendar'
                              style={{
                                width: '15px',
                                marginRight: '6px',
                                marginLeft: '10px'
                              }}
                            />
                            {post.frontmatter.date}
                            <img
                              src={clock}
                              alt='clock'
                              style={{
                                width: '15px',
                                marginRight: '6px',
                                marginLeft: '20px'
                              }}
                            />
                            {post.frontmatter.runtime}
                          </p>
                          <p>{post.frontmatter.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query PodcastList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "podcast-post" } } }
    ) {
      edges {
        node {
          htmlAst
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            runtime
            date(formatString: "MMMM Do, YYYY")
            featuredpost
            description
          }
        }
      }
    }
  }
`

export default PodcastIndexPage
