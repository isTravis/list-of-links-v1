import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserHeader from '../components/UserHeader';
import LinkList from '../components/LinkList';
import NoMatch from '../containers/NoMatch';
import Loader from '../components/Loader';
import { getUser } from '../actions/user';
import { createFollow, updateLastRead, destroyFollow } from '../actions/follow';

let styles;

export const User = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		userData: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	statics: {
		readyOnActions: function(dispatch, params) {
			return Promise.all([
				dispatch(getUser(params.id))
			]);
		}
	},

	componentDidMount() {
		// Need to check here so that getUser doesn't make a fetch twice
		const user = this.props.userData.userData || {};
		const params = this.props.params || {};
		if (this.props.userData.userData !== null && user.username !== params.id) {
			User.readyOnActions(this.props.dispatch, this.props.params);	
		}
	},

	componentWillReceiveProps(nextProps) {
		const thisUserData = (this.props.userData && this.props.userData.userData) || {};
		const nextUserData = (nextProps.userData && nextProps.userData.userData) || {};
		if (!thisUserData.id && nextUserData.id) {
			this.props.dispatch(updateLastRead(nextProps.userData.userData.id));
		}
	},

	handleFollowCreate: function() {
		const followeeID = this.props.userData.userData.id;
		this.props.dispatch(createFollow(followeeID, Date.now()));
	},

	handleFollowDestroy: function() {
		const followeeID = this.props.userData.userData.id;
		this.props.dispatch(destroyFollow(followeeID));
	},
	
	render() {
		const following = this.props.appData.loginData.following || [];
		const user = this.props.userData.userData;
		const isFollowed = following.reduce((previousVal, current) => {
			if (current.username === this.props.params.id) {
				return true;
			}
			return false || previousVal;
		}, false);

		if (!user) {
			return <NoMatch />;
		}

		if (!user.id) {
			return <Loader />;
		}

		return (
			<div>
				<Helmet title={user.name || this.props.params.id} />
				<UserHeader user={user} />

				<div>Follow Status: {isFollowed ? 'Following' : 'Not Following'}</div>

				{isFollowed
					? <div onClick={this.handleFollowDestroy}>Click to Unfollow</div>
					: <div onClick={this.handleFollowCreate}>Click to Follow</div>
				}
				

				<LinkList links={user.links} />
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app,
		userData: state.user
	};
}

export default connect(mapStateToProps)(User);

styles = {
	container: {
		display: 'none',
	},
};
