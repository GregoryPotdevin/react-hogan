import React from 'react'
import hogan from 'hogan.js'
import shallowCompare from 'react-addons-shallow-compare'

export default class ReactHogan extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  render() {
    const { template, context, ...props } = this.props
    const compiledTemplate = hogan.compile(template)
    const __html = compiledTemplate.render(context)
    return (
      <div dangerouslySetInnerHTML={{__html}} {...props}/>
    )
  }
}
