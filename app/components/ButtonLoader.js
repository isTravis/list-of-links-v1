import React, { PropTypes } from 'react';

let styles;

export const ButtonLoader = React.createClass({
	propTypes: {
		isLoading: PropTypes.bool,
	},

	render: function() {
		const wrapperStyle = {
			...styles.wrapper,
			opacity: this.props.isLoading ? 1 : 0
		};
		return (
			<div style={wrapperStyle}>
				<div className={'horizontal-progress'} style={styles.bar} />
			</div>
		);
	}
});

export default ButtonLoader;

styles = {
	wrapper: {
		position: 'absolute',
		bottom: '1px',
		left: 0,
		width: '100%',
		height: '2px',
		transition: '.1s linear opacity',
		// opacity: 0,
		overflow: 'hidden',
	},
	bar: {
		width: '100%',
		height: '100%',
		backgroundColor: '#F5F5F5',
	},
};
