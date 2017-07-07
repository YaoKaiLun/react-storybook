const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};