import React from 'react'
import {render} from 'react-dom'
import Codemirror from 'react-codemirror'
import CodeMirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/mode/overlay'

import "codemirror/lib/codemirror.css"
import '../styles/style.css'

import ReactHogan from '../../src'
import Hogan from 'hogan.js'

CodeMirror.defineMode("mustache", function(config, parserConfig) {
  var mustacheOverlay = {
    token: function(stream, state) {
      var ch;
      if (stream.match("{{")) {
        while ((ch = stream.next()) != null)
          if (ch == "}" && stream.next() == "}") {
            stream.eat("}");
            return "mustache";
          }
      }
      while (stream.next() != null && !stream.match("{{", false)) {}
      return null;
    }
  };
  return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), mustacheOverlay);
});

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

const defaultData = {
	name: "React Hogan",
  description: "React component wrapping Hogan.js. Can be used to render client-provided templates.",
  author: "Gregory Potdevin",
  props: [
    {name: "template", description: "Mustache template"},
    {name: "data", description: "Values to inject"}
  ]
}

let Demo = React.createClass({
  
  getInitialState(){
    return {
      templateString: defaultTemplate,
      template: defaultTemplate,
      templateError: null,
      dataString: JSON.stringify(defaultData, null, 2),
      data: defaultData,
      dataError: null
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
  
  onChangeData(dataString){
    try {
      const data = JSON.parse(dataString)
      this.setState({dataString, data, dataError: null})
    } catch(err){
      console.log('err', err)
      this.setState({dataString, dataError: err.message})
    }
  },
  
  render() {
    const { template, templateString, templateError, data, dataString, dataError } = this.state
    const options = {
			lineNumbers: true,
      lineWrapping: true,
			readOnly: false,
			mode: 'mustache',
		};
    return <div>
      <h2 style={{float: 'right'}}>
        <a href="http://github.com/gregoryPotdevin/react-hogan">View on GitHub</a>
      </h2>
      <h1>React Hogan</h1>
      <div style={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
        <div style={{display: 'table-cell', padding: 8, width: '55%'}}>
          <h3>Template</h3>
          <Codemirror value={templateString} onChange={this.onChangeTemplate} options={options} />
          {templateError && <pre className="error">{templateError}</pre>}
          
          <h3>Data</h3>
          <Codemirror value={dataString} onChange={this.onChangeData} options={{...options, mode: 'javascript'}} />
          {dataError && <pre className="error">{dataError}</pre>}
        </div>
        <div style={{display: 'table-cell', padding: 8, width: '45%'}}>
          <h3>Result</h3>
          <Codemirror value="<Hogan template={template} data={data} />" options={{
            lineNumbers: false,
            lineWrapping: true,
            readOnly: true,
            mode: 'jsx',
          }} />
          <br />
          <div className="result">
            <ReactHogan template={template} data={data}/>
          </div>
        </div>
      </div>
      <hr />
      <div className="copyright">Copyright © Gregory Potdevin, <a href="http://www.appcraft.fr/" target="__blank">AppCraft.fr</a>, 2016. MIT Licensed.</div>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
