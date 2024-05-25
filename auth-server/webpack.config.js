const path = require('path');

module.exports = {
  entry: '/handler.js',
  target: 'node',
  mode: 'production',
  externals: ['aws-sdk'], // Exclude AWS SDK from the bundle as it is available in the Lambda environment
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
