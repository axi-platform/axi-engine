const fs = require('fs')
const path = require('path')
const process = require('process')

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const externals = fs.readdirSync('node_modules').reduce((acc, mod) => {
  if (mod === '.bin') return acc

  acc[mod] = 'commonjs ' + mod

  return acc
}, {})

module.exports = {
  mode,
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals,
}
