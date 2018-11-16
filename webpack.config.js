const path = require('path');

module.exports = {
  entry: './src/marketing.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'marketing.umd.js',
    library: 'marketing',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
