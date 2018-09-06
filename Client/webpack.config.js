const webpack = require('webpack')

module.exports = {
  entry: './src/core/main.js',
  output: {
    filename: './bundle.js',
  },
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(.*)-TARGET_ENV(\.*)/, function(resource) {
      resource.request = resource.request.replace(/-TARGET_ENV/, `-development`)
    }),
  ],
}
