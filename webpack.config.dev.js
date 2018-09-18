const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: ['babel-polyfill', './src/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
		{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env', 'stage-0']
			}
		}, 
		{
			test: /\.s[a|c]ss?$/, 
			use: [
				MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
				{
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ];
            }
          }
        },
				'sass-loader'
			]
		},
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      include: [
        path.resolve(__dirname, 'src/assets/images')
      ],
      use: [
        {
          loader: 'file-loader', 
          options: { 
            name: '[name].[ext]', 
            outputPath: './assets/images/' 
          } 
        }
      ]
    },
    {
      test: /\.(png|ico)$/,
      include: [
        path.resolve(__dirname, 'src/assets/favicons')
      ],
      use: [
        {
          loader: 'file-loader', 
          options: { 
            name: '[name].[ext]', 
            outputPath: './assets/favicons/' 
          } 
        }
      ]
    },
    {
      test: /.(ttf|svg|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      include: [
        path.resolve(__dirname, 'src/assets/fonts')
      ],
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/fonts/'
        }
      }
    }]
	},
	plugins: [
    new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
      filename: 'styles.bundle.css'
    })
	],
  devServer: {
    port: 3000
  }
}