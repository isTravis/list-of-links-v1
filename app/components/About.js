import React from 'react';

let styles;

export const About = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<h1>About List of Links</h1>
				<p>A simple tool for collecting and sharing a list of links</p>
				
				<h2 style={styles.sectionHeader}>Function over Fluff</h2>
				<p>Committed to an ad-free, socially sane, and functionally useful internet, List of Links features no follower counts, no likes, no contrived social games to play.</p>

				<h2 style={styles.sectionHeader}>Pull over Push</h2>
				<p>List of Links avoids scattering your attention with a feed and instead encourages you to focus on a certain person, their perspective, and what links they've been sharing. </p>
				
				<h2 style={styles.sectionHeader}>Open</h2>
				<p>The project is <a href={'https://github.com/isTravis/list-of-links'}>open source</a> and contributions, bug reports, and feature requests are welcome! List of Links provides an <a href={'http://docs.listoflinks.co'}>API</a> enabling you to build browser extensions, desktop clients, or visualization tools.</p>

				<h2 style={styles.sectionHeader}>Inspiration</h2>
				<p>List of Links is inspired and modeled after Jorn Barger's Robot Wisdom weblog.</p>
				<img src="/static/jorn.png" alt="robot wisdom" width="100%" />
			</div>
		);
	}

});

export default About;

styles = {
	container: {
		maxWidth: '650px',
		margin: '0 auto',
		lineHeight: '1.6em'
	},
};
