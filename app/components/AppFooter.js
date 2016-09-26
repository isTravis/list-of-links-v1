import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;

export const Footer = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<a href={'https://github.com/isTravis/listoflinks'} className={'link'} style={styles.item}>API</a>
				<a href={'https://github.com/isTravis/listoflinks'} className={'link'} style={styles.item}>Github</a>
				<a href={'https://github.com/isTravis/listoflinks'} className={'link'} style={styles.item}>About</a>
			</div>
		);
	}

});

export default Footer;

styles = {
	container: {
		borderTop: '1px solid #888',
		margin: '1em 0em',
		paddingTop: '1em',
		textAlign: 'center',
	},
	item: {
		display: 'inline-block',
		padding: '0em 1em',
		color: '#888',
		fontSize: '0.9em',
	},
};
