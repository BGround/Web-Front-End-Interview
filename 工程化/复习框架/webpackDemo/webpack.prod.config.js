'use strict'

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const setMPA = () => {
	const entry = {};
	const htmlWebpackPlugin = [];
	
	const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
	Object.keys(entryFiles)
		.map((index) => {
			const entryFile = entryFiles[index];
			const match = entryFile.match(/src\/(.*)\/index\.js/);
			
			const pageName = match && match[1];
			entry[pageName] = entryFile;
			
			htmlWebpackPlugin.push(
				new HtmlWebpackPlugin({
					template: path.join(__dirname, `src/${pageName}/index.html`),
					filename: `${pageName}.html`,
					chunks: [pageName],
					inject: true,
					minify: {
						html5: true,
						collapsWhitespace: true,
						preserveLineBreaks: false,
						minifyCSS: true,
						minifyJS: true,
						removeComments: false
					}
				})
			)
			
		})

	return {
		entry,
		htmlWebpackPlugin
	}
}

const {entry, htmlWebpackPlugin} = setMPA();

module.exports = {
	mode: 'production',
	entry: entry,
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name]_[chunkhash:8].js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'autoprefixer'
								]
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									'autoprefixer'
								]
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]_[hash:8].[ext]'
					}
				}
			},
			// {
			// 	test: /\.(png|jpg|jpeg|gif)$/,
			// 	use: [{
			// 		loader: 'url-loader',
			// 		options: {
			// 			limit: 102400
			// 		}
			// 	}]
			// },
			{
				test: /\.(woff|woff2|ttf|eot|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]_[hash:8]'
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name]_[contenthash:8].css'
		})
	].concat(htmlWebpackPlugin),
	// devtool: 'cheap-source-map',
	
}