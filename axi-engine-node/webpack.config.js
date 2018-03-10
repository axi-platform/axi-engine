const path = require('path')
const process = require('process')

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  target: 'node',
  mode,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
}
