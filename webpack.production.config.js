const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, './app/index.ts')
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: "/",
    filename: '[id].[hash].bundle.js',
    chunkFilename: "[id].[hash].bundle.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // Drop console statements
            drop_console: true
          },
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                ]
              }
            }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'hash=sha512&digest=hex&name=[hash].[ext]',
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: {
              caseSensitive: true,
              collapseWhitespace: true,
              conservativeCollapse: true,
              keepClosingSlash: true,
              minifyCSS: false,
              minifyJS: true,
              removeAttributeQuotes: false,
              removeComments: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(otf|eot|svg|ttf|woff2|woff)/,
        use: 'url-loader?limit=8192',
        exclude: /img/
      }
    ]

  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      hash: true
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      HASH: JSON.stringify(new Date().getTime().toString('16'))
    })
  ]
}
