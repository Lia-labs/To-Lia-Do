  
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = [{
  entry: './Renderer/index.ts',
  devtool: 'inline-source-map',
  devServer:{
    hot: "only",
    watchFiles:["./**/*.ts", "./**/*.html", "../Server/**/*.ts"],
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './assets/')
    },
    port:7473
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { 
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        type: 'asset/resource',
      },    
      {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: {
                    caseSensitive: true,
                    collapseWhitespace : false,
                    removeComments: true
                }
                }
            },
      {
        test: /\.s(a|c)ss|css$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" , options: {
            modules: false,         
            importLoaders: 1,
            sourceMap: true}},
          { loader: "sass-loader" , options: {
            sassOptions: {
              silenceDeprecations: ['legacy-js-api', 'import']
            },
            sourceMap: true}}
        ],
      },
    ],
  },
  mode: "development",
  resolve: {
	  extensions: ['.ts', '.tsx',  '.js', '.scss'],
  },
  output: {
    filename: 'bundle.js'
    //path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({   
        filename: 'index.html',
        inject: true,
        template: 'Renderer/index.html'
    }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })]
},
  
  {
    mode: 'development',
    entry: './preload/preload.ts',
    target: 'electron-preload',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'preload.js'
    } 
  }


];
