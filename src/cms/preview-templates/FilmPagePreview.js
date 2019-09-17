import React from 'react'
// import PropTypes from 'prop-types'
import { FilmPageTemplate } from '../../templates/film-page'

const FilmPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  const title = entry.getIn(['data', 'title'])
  const image = entry.getIn(['data', 'image'])

  if (data) {
    return (
      <FilmPageTemplate
        image={image}
        title={title}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default FilmPagePreview
