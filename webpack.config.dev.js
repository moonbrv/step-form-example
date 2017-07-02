const path = require('path')

module.exports = {
  target: 'web',
  entry: {
    step1: path.join(__dirname, 'src', 'js', 'step-1'),
    step2: path.join(__dirname, 'src', 'js', 'step-2'),
    step3: path.join(__dirname, 'src', 'js', 'step-3')
  },
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      }
    ]
  }
}
