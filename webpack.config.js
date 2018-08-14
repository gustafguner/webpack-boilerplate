const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: ['babel-polyfill', './src/app.js']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
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
				'css-loader',
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
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
      filename: "styles.bundle.css"
    })
	]
}