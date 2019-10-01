import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import '../components/all.sass'

const ProfileArticles = ({ posts }) => (
  <div className='section'>
    <div className='columns is-multiline'>
      <h2 className='column is-10 is-offset-1 is-size-2 is-serif'>Articles</h2>

      {posts &&
        posts.length >= 1 &&
        posts.map((post, index) => (
          <>
            <div className='column is-1'></div>
            <div className='column is-10 is-offset-1'>
              <Link key={index} to={post.fields.slug}>
                <strong>{post.frontmatter.title}</strong>
                <p>{post.frontmatter.date}</p>
              </Link>
            </div>
          </>
        ))}
    </div>
  </div>
)

export default ProfileArticles
