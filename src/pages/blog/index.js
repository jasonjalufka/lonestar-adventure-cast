import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className='full-width-image-container margin-top-0'
          style={{
            backgroundImage: `url('/img/404.jpg')`
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
                className='has-text-weight-bold is-size-1 title'
                style={{
                  color: 'white',
                  lineHeight: '1',
                  padding: '0.25em',
                  textAlign: 'center',
                  textShadow: '#0000004f 0px 0px 3px'
                }}
              >
                Latest Stories
              </h1>
            </div>
          </div>
        </div>
        <section className='section'>
          <div className='container'>
            <div className='content'>
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
