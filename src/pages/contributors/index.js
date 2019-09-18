import React from 'react'
// This file displays all of the contributors at /contributors
import Layout from '../../components/Layout'
import Contributors from '../../components/Contributors'

export default class ContributorsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className='section section--gradient'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-10 is-offset-1'>
                <div className='section'>
                  <h2 className='title is-size-3 has-text-weight-bold is-bold-light'>
                    Contributors
                  </h2>
                </div>
              </div>
            </div>
            <div className='content'>
              <Contributors />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
