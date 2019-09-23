const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  console.log('Creating Author Links...')
  const { createNodeField } = actions

  const postsOfAuthors = {}
  // iterate through all markdown nodes to link blogs to author, build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === 'MarkdownRemark')
    .forEach(node => {
      if (node.frontmatter.author) {
        console.log(
          'Found blog post node with *author* field in frontmatter: ',
          node.frontmatter.author
        )
        const authorNode = getNodes().find(
          node2 =>
            node2.internal.type === 'MarkdownRemark' &&
            node2.frontmatter.fullName === node.frontmatter.author
        )

        if (authorNode) {
          console.log('authorNode found for blog post author: ', authorNode)
          createNodeField({
            node,
            name: 'author',
            value: authorNode.id
          })
          console.log(
            'Created authorNode Field author with value: ',
            authorNode.id
          )

          // if it's the first time for this author init empty array for their posts
          if (!(authorNode.id in postsOfAuthors)) {
            console.log("Creating empty array for authors' posts")
            postsOfAuthors[authorNode.id] = []
          }
          // add blog post to this author
          console.log('Adding blog post to author')
          postsOfAuthors[authorNode.id].push(node.id)
        }
      } else {
        console.log('No Authors found on Blog Posts')
      }
    })

  Object.entries(postsOfAuthors).forEach(([authorNodeId, postIds]) => {
    console.log('Extending node field for author: ', authorNodeId)
    createNodeField({
      node: getNode(authorNodeId),
      name: 'posts',
      value: postIds
    })
  })
}
