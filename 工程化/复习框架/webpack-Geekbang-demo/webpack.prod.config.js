'use strict'

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMesaureWebpackPlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const smp = new SpeedMesaureWebpackPlugin();

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

module.exports = smp.wrap({
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
				/** use: [
					{
						loader: 'thread-loader',
						options: {
							Workers: 3
						}
					},
					'babel-loader'
				]*/
				use: 'happypack/loader',
				// include: path.resolve('src')
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
			/** 
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]_[hash:8].[ext]'
					}
				}
			},*/
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 102400
						}
					},
					/*{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
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
					}*/
				]
			},
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
		}),
		new FriendlyErrorsWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
		// new webpack.DllReferencePlugin({
		// 	manifest: require('./build/library/library.json')
		// }),
		new HappyPack({
			loaders: ['babel-loader?cacheDirectory=true']
		}),
		// new HardSourceWebpackPlugin(),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: false
		})
	].concat(htmlWebpackPlugin),
	// devtool: 'cheap-source-map',
	// stats: 'errors-only',
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: 4,
			})
		]
	},
	// resolve: {
	// 	alias: {
	// 		'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
	// 		'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
	// 	},
	// 	extensions: ['.js'],
	// 	mainFields: ['main']
	// }
});