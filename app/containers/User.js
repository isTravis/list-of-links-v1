import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
		const isSelf = this.props.appData.loginData.username === this.props.params.id;
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
				
				<div style={styles.header} className={'user-header'}>
					<div style={styles.imageWrapper}>
						<img style={styles.image} src={user.image} alt="user" />
					</div>
					<div style={styles.userDetails}>
						<div style={styles.name} className={'user-name'}>{user.name}</div>
					</div>

					{!isSelf &&
						<div style={styles.followWrapper} className={'user-follow'}>
							{isFollowed
								? <div className={'button'} onClick={this.handleFollowDestroy} style={styles.followButton}>Following</div>
								: <div className={'button'} onClick={this.handleFollowCreate} style={styles.followButton}>Follow</div>
							}
						</div>
					}
					
				</div>
				
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
	header: {
		display: 'table',
		paddingBottom: '1em',
		marginBottom: '1em',
		borderBottom: '1px solid #555',
		width: '100%',
		overflow: 'hidden',
	},
	imageWrapper: {
		display: 'table-cell',
		width: '1%',
	},
	image: {
		width: '100px',
	},
	userDetails: {
		display: 'table-cell',
		verticalAlign: 'middle',
	},
	name: {
		fontSize: '4em',
		fontWeight: 'bold',
		paddingLeft: '.25em',
	},
	followWrapper: {
		display: 'table-cell',
		verticalAlign: 'middle',	
		width: '1%',
		textAlign: 'center',
	},
	followButton: {
		whiteSpace: 'nowrap',
		padding: '.25em .5em',
	},

};
