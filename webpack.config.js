const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: '#source-map',
	// devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./app/index.js',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js?/,
				loader: 'babel',
				include: [
					path.join(__dirname, 'app')
				],
				query: {
					plugins: [
						['react-transform', {
							transforms: [{
								transform: 'react-transform-hmr',
								// If you use React Native, pass 'react-native' instead:
								imports: ['react'],
								// This is important for Webpack HMR:
								locals: ['module']
							}]
						}],
						['transform-object-assign']
					]
				}
			},
			{ test: /\.css$/, loader: 'style!css!sass' },
			{ test: /\.svg$/, loader: 'file-loader' },
			{ test: /\.png$/, loader: 'file-loader' },
			{ test: /\.jpg$/, loader: 'file-loader' },
		]
	}
};
