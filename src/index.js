import React from 'react'
import hogan from 'hogan.js'
import shallowCompare from 'react-addons-shallow-compare'

export default class ReactHogan extends React.Component {
  

  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  
  compileTemplate(template){
    // lazy template compiling
    if (this.compiledTemplate == template){
      return this.compilationResult
    }
    this.compilationResult = hogan.compile(template)
    this.compiledTemplate = template
    return this.compilationResult
  }
  
  render() {
    const { template, data, Component, ...props } = this.props
    if (!template) return false
    
    const compiledTemplate = this.compileTemplate(template)
    const __html = compiledTemplate.render(data)
    return (
      <Component dangerouslySetInnerHTML={{__html}} {...props}/>
    )
  }
}

ReactHogan.defaultProps = {
  data: {},
  Component: 'div'
}