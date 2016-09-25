import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
			<div>
				<Link to={'/' + user.username}>
					<img src={user.image} width="100px" alt={'user'} />
					<div>{user.links.length} | {newLinkCount}</div>

				</Link>
			</div>
		);
	}

});

export default UserPreview;
