import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const FilmPageTemplate = ({
  image,
  title
}) => (
  <div>
    <div style={{
      backgroundImage: `url(${
        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
      })`,
      backgroundPosition: `50% 80%`,
      height: `400px`
    }}
    >
      <h1>{title}</h1>
    </div>
  </div>
  // <div>
  //   <div
  //     className='full-width-image margin-top-0'
  //     style={{
  //       backgroundImage: `url(${
  //         !!image.childImageSharp ? image.childImageSharp.fluid.src : image
  //       })`,
  //       backgroundPosition: `50% 80%`,
  //       height: `400px`
  //     }}
  //   >
  //     <div
  //       className='image-overlay'
  //       style={{
  //         width: `100%`,
  //         height: `100%`,
  //         backgroundColor: `rgba(0, 0, 0, 0.4)`,
  //         display: `flex`,
  //         fexDirection: `column`,
  //         justifyContent: `space-around`
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: 'flex',
  //           height: '150px',
  //           lineHeight: '1',
  //           justifyContent: 'space-around',
  //           alignItems: 'center',
  //           flexDirection: 'column'
  //         }}
  //       >
  //         <h1
  //           className='has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen'
  //           style={{
  //             color: 'white',
  //             lineHeight: '1',
  //             padding: '0.25em',
  //             textAlign: 'center',
  //             textShadow: `#0000004f 0px 0px 3px`
  //           }}
  //         >
  //           {title}
  //         </h1>
  //       </div>
  //     </div>
  //   </div>
  //   <section className='section'>
  //     <div className='container'>
  //       <p>Hello this is film page container</p>
  //     </div>
  //   </section>
  // </div>
)

FilmPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string
}

const FilmPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <FilmPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
      />
    </Layout>
  )
}

FilmPage.propTypes = {
  data : PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
}

export default FilmPage

export const pageQuery = graphql`
  query FilmPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "film-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`