import expect from 'expect'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import ReactHogan from 'src/'

describe('ReactHogan', () => {

  it('renders a basic template', () => {
    expect(renderToStaticMarkup(<ReactHogan template="Hello {{name}}" data={{name: 'Gregory'}}/>))
      .toEqual('<div>Hello Gregory</div>')
  })

  it('renders html', () => {
    expect(renderToStaticMarkup(<ReactHogan template="<h1>Hello {{name}}</h1>" data={{name: 'Ash'}}/>))
      .toEqual('<div><h1>Hello Ash</h1></div>')
  })

  it('handles the Component prop', () => {
    expect(renderToStaticMarkup(<ReactHogan Component="span" template="Hello {{name}}" data={{name: 'Joseph'}}/>))
      .toEqual('<span>Hello Joseph</span>')
  })

  it('passes other props', () => {
    expect(renderToStaticMarkup(<ReactHogan style={{color: 'red'}} template="Hello {{name}}" data={{name: 'Ethan'}}/>))
      .toEqual('<div style="color:red;">Hello Ethan</div>')
  })
})
