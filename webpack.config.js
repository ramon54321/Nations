module.exports = {
  entry: "./src/core/main.js",
  output: {
    filename: "./bundle.js"
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}