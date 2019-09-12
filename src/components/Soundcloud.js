import React from 'react'
import rehypeReact from 'rehype-react'
import { Link } from 'gatsby'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Link
  }
}).Compiler

const Soundcloud = ({ title, html }) => <>{renderAst(html)}</>

export default Soundcloud
