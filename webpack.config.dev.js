const path = require('path')

module.exports = {
  target: "web",

  entry: {
    step1: path.join(__dirname, 'src', 'js', 'step-1', 'step-1.js'),
    step2: path.join(__dirname, 'src', 'js', 'step-2', 'step-2.js'),
    step3: path.join(__dirname, 'src', 'js', 'step-3', 'step-3.js'),
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
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      },
    ]
  }
}
