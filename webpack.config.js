var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

  var webpack = require('webpack');
  var path = require('path');
  var fs = require('fs');

  var nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  module.exports = {
    entry: './client/javascripts/app.js',
    target: 'node',
    output: {
      path: path.join(__dirname, 'client'),
      filename: 'bundle.js'
    },
    externals: nodeModules,
    module:{
      loaders: [
        {loader: 'babel'}
      ]
    }
  }
// module.exports = {
//   entry: "./javascripts/typingGame.js",
//   output: {
//     path: "",
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.js?$/],
//         exclude: /(node_modules)/,
//         loader: 'babel',
//         query: {
//           presets: ['es2015']
//         }
//       }
//     ]
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['', '.js']
//   }
// };
