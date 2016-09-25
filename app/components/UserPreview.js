import React, { PropTypes } from 'react';
import { Link } from 'react-router';

let styles;

export const UserPreview = React.createClass({
	propTypes: {
		user: PropTypes.object,
	},

	render: function() {
		const user = this.props.user || {};
		const lastRead = user.Follow && user.Follow.lastRead;
		const newLinkCount = user.links.reduce((previousVal, current) => {
			if (current.createdAt > lastRead) {
				return previousVal + 1;	
			}
			return previousVal;
		}, 0);

		return (
			<div style={styles.container}>
				<Link to={'/' + user.username}>
					<img style={styles.image} src={user.image} alt={'user'} />
					<div style={styles.name}>{user.name}</div>
					<div style={styles.count}>{newLinkCount}</div>

				</Link>
			</div>
		);
	}

});

export default UserPreview;

styles = {
	container: {
		position: 'relative',
		display: 'inline-block',
		margin: '0em .5em .5em 0em',
	},
	image: {
		width: '150px',
		display: 'block',
	},
	name: {
		position: 'absolute',
		width: 'calc(100% - 1em)',
		padding: '0em .5em',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		backgroundColor: 'rgba(0,0,0,0.6)',
		bottom: '0',
		left: '0',
		color: 'white',
	},
	count: {
		position: 'absolute',
		backgroundColor: 'purple',
		color: 'white',
		padding: '.25em .5em',
		borderRadius: '10em',
		lineHeight: '1em',
		fontSize: '0.85em',
		top: '-0.25em',
		right: '-0.25em',
	},
};
