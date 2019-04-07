var path = require('path');

module.exports = {
    entry: {
        main: 'stub.js'
    },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8081
  }
};