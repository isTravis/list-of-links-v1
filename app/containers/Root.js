import React, { Component } from 'react';

class Root extends Component {

	renderInitialState() {
		if (this.props.initialState) {
			const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
			return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
		}
	}

	renderEnvironment() {
		const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
		return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
	}

	render() {
		const head = this.props.head;
		// In production, we load the CSS file to avoid flicker. In dev, we import it to have HMR work.
		const cssString = process.env.NODE_ENV === 'production' ? <link href="static/style.css" rel="stylesheet" type="text/css" /> : null;

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link rel="shortcut icon" href="/static/favicon.ico" />
					{cssString}
					{head.title.toComponent()}
					{head.meta.toComponent()}
					{head.link.toComponent()}
				</head>
				<body>
					<div id="root" dangerouslySetInnerHTML={{ __html: this.props.content }} />
					{this.renderEnvironment()}
					{this.renderInitialState()}
					{head.script.toComponent()}
					{/* <script src={!process.env.NODE_ENV ? '/app.js' : '/app.min.js'} /> */}
					<script src={!process.env.NODE_ENV ? '/app.js' : '/' + __MAINBUNDLE__} />
				</body>
			</html>
		);
	}
}

export default Root;
