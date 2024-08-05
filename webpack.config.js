// webpack.config.js
module.exports = {
    // ... your existing configuration ...
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/lord-icon-element/
          ]
        }
      ]
    }
  };
  