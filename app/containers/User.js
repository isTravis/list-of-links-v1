import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserHeader from '../components/UserHeader';
import LinkList from '../components/LinkList';
import { getUser } from '../actions/user';

export const User = React.createClass({
	propTypes: {
		userData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	statics: {
		readyOnActions: function(dispatch, params) {
			return Promise.all([
				dispatch(getUser(params.id))
			]);
		}
	},
	
	render() {
		// const following = this.props.appData.following || [];
		const user = this.props.userData.userData || {};

		return (
			<div>
				<Helmet title={user.name} />
				<UserHeader user={user} />
				<LinkList links={user.links} />
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		userData: state.user
	};
}

export default connect(mapStateToProps)(User);
