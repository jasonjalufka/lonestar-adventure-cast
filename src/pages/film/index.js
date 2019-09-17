import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import calendar from '../../img/calendar.svg'
import Video from '../../components/Video'

const FilmIndexPage = ({ data }) => {
  const { edges: films } = data.allMarkdownRemark
  return (
    <Layout>
      <div
        className='full-width-image-container margin-top-0 title'
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
              Latest Videos
            </h1>
          </div>
        </div>
      </div>
      <section className='section'>
        <div className='container'>
          <div className='content'>
            {films &&
              films.map(({ node: post }) => (
                <div className='columns' style={{ paddingBottom: '40px' }}>
                  <div
                    className='column is-10 is-offset-1'
                    key={post.id}
                    style={{
                      borderLeft: '2px solid #FD461E'
                    }}
                  >
                    <div className='columns'>
                      <div
                        style={{
                          paddingBottom: '0'
                        }}
                        className='column is-10 is-offset-1'
                      >
                        <h2
                          style={{
                            marginBottom: '0'
                          }}
                        >
                          {post.frontmatter.title}
                        </h2>
                      </div>
                    </div>
                    <div className='columns'>
                      <div
                        className='column is-10 is-offset-1'
                        style={{
                          paddingTop: '0',
                          paddingBottom: '0'
                        }}
                      >
                        <Video html={post.htmlAst} />
                      </div>
                    </div>
                    <div className='columns'>
                      <div className='column is-10 is-offset-1'>
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
  query FilmList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "film-post" } } }
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
            date(formatString: "MMMM Do, YYYY")
            featuredpost
            description
          }
        }
      }
    }
  }
`

export default FilmIndexPage
