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

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-inline-import-loader',
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: false,
              plugins: [
                ['@babel/plugin-proposal-class-properties', {loose: true}],
                [
                  'inline-import',
                  {
                    extensions: ['.gql', '.graphql'],
                  },
                ],
              ],
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
