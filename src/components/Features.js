import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { Link } from 'gatsby'

const FeatureGrid = ({ gridItems }) => (
  <div className='columns is-multiline'>
    {gridItems.map(item => (
      <div key={item.text} className='column is-6'>
        <section className='is-paddingless' style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
          <div className='has-text-centered'>
            <div
              style={{
                width: '300px',
                display: 'inline-block'
              }}
            >
              <Link to={item.pagelink}>
                <PreviewCompatibleImage imageInfo={item} />
              </Link>
            </div>
          </div>
          <p 
            style={{
              maxWidth: '400px',
              margin: 'auto'
            }}
          >
            {item.text}
          </p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string
    })
  )
}

export default FeatureGrid
