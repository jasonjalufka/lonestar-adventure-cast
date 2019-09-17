import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <div
        className='full-width-image-container margin-top-0'
        style={{
          backgroundImage: `url('/img/404.jpg')`,
          backgroundPosition: `50% 80%`,
          height: `93vh`,
          marginBottom: `0`
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
        <h1
          className='has-text-weight-bold is-size-3-mobile is-size-2-tablet'
          style={{
            color: 'white',
            padding: '1rem',
            fontWeight: '900',
            fontSize: '4.5rem',
            textAlign: 'center',
            textShadow: `#0000004f 0px 0px 5px`
          }}
        >
          404: Page Not Found
        </h1>
      </div>
      </div>
  </Layout>
)

export default NotFoundPage
