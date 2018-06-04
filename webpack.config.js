const fs = require('fs')
const path = require('path')
const process = require('process')

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const DEBUG = process.env.NODE_ENV !== 'production'

const externals = fs.readdirSync('node_modules').reduce((acc, mod) => {
  if (mod === '.bin') return acc

  acc[mod] = 'commonjs ' + mod

  return acc
}, {})

module.exports = {
  mode,
  target: 'node',

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-import-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          cacheDirectory: DEBUG,
          plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: '6.11.1',
                },
                shippedProposals: true,
              },
            ],
          ],
        },
      },
    ],
  },

  externals,

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map',
}
