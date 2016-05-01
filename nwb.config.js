module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'ReactHogan',
    jsNext: true,
    umd: true
  }
}
