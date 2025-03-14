  
const path = require('path');
const webpack = require('webpack');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.join(__dirname, './dist/main.js'),
});
const TerserPlugin = require('terser-webpack-plugin');


// webpack.config.js
module.exports = 
  {
    mode: 'development',
    entry: './main/index.ts',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.node$/,
          loader: 'node-loader',
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    externals: {
        sqlite3: 'commonjs sqlite3'
    },
    plugins: [
        ElectronReloadPlugin()
    ]
  };
