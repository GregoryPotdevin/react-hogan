import React from 'react'
import {render} from 'react-dom'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/twig/twig'
import "codemirror/lib/codemirror.css"
import '../styles/style.css'

import ReactHogan from '../../src'
import Hogan from 'hogan.js'

const defaultTemplate =  
`<h2>{{name}}</h2>

<h3>Description</h3>
{{description}}

<h3>Props</h3>
<table style="font-family: monospace;">
  {{#props}}
    <tr>
      <td width="100">{{name}}</td>
      <td>{{description}}</td>
    </tr>
  {{/props}}
</table>`

const defaultContext = {
	name: "React Hogan",
  description: "React component wrapping Hogan.js. Can be used to render client-provided templates.",
  author: "Gregory Potdevin",
  props: [
    {name: "template", description: "Mustache template"},
    {name: "context", description: "Values to inject"}
  ]
}

let Demo = React.createClass({
  
  getInitialState(){
    return {
      templateString: defaultTemplate,
      template: defaultTemplate,
      templateError: null,
      contextString: JSON.stringify(defaultContext, null, 2),
      context: defaultContext,
      contextError: null
    }
  },
  
  onChangeTemplate(templateString){
    try {
      const test = Hogan.parse(Hogan.scan(templateString));
      this.setState({templateString, template: templateString, templateError: null})
    } catch(err){
      console.log('err', err)
      this.setState({templateString, templateError: err.message})
    }
  },
  
  onChangeContext(contextString){
    try {
      const context = JSON.parse(contextString)
      this.setState({contextString, context, contextError: null})
    } catch(err){
      console.log('err', err)
      this.setState({contextString, contextError: err.message})
    }
  },
  
  render() {
    const { template, templateString, templateError, context, contextString, contextError } = this.state
    const options = {
			lineNumbers: true,
      lineWrapping: true,
			readOnly: false,
			mode: 'twig',
		};
    return <div>
      <h2 style={{float: 'right'}}>
        <a href="http://github.com/gregoryPotdevin/react-hogan">View project on GitHub</a>
      </h2>
      <h1>React Hogan</h1>
      <div style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
        <div style={{display: 'table-cell', padding: 8, width: '55%'}}>
          <h3>Template</h3>
          <Codemirror value={templateString} onChange={this.onChangeTemplate} options={options} />
          {templateError && <pre className="error">{templateError}</pre>}
          
          <h3>Context</h3>
          <Codemirror value={contextString} onChange={this.onChangeContext} options={options} />
          {contextError && <pre className="error">{contextError}</pre>}
        </div>
        <div style={{display: 'table-cell', padding: 8, width: '45%'}}>
          <h3>Result</h3>
          <div className="result">
            <ReactHogan template={template} context={context}/>
          </div>
        </div>
      </div>
      <hr />
      <div className="copyright">Copyright © Gregory Potdevin, <a href="http://www.appcraft.fr/" target="__blank">Appcraft</a>, 2016. MIT Licensed.</div>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
