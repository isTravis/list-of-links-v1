import React from 'react';

let styles;

export const About = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<h2>What is this?</h2>
				<p>Well - clearly this is a place where I describe that.</p>

				<h2>Put other questions here</h2>
				<p>And answer them in this spot as well.</p>
			</div>
		);
	}

});

export default About;

styles = {
	container: {
		maxWidth: '500px',
		margin: '0 auto',
	},
	
};
