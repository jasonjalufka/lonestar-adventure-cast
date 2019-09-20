import React from 'react'
// This file displays all of the contributors at /contributors
import Layout from '../../components/Layout'
import Contributors from '../../components/Contributors'
import Background from '../../img/background-pattern.svg'

export default class ContributorsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className='section section--gradient'>
          <div
            className='container'
            style={{
              background: `url(${Background})`,
              backgroundSize: `cover`
            }}
          >
            <div className='columns'>
              <div className='column is-6'>
                <div className='section'>
                  <h2 className='title is-size-1 has-text-weight-bold white-blur'>
                    Contributors
                  </h2>
                </div>
              </div>
            </div>
            <Contributors />
          </div>
        </section>
      </Layout>
    )
  }
}
