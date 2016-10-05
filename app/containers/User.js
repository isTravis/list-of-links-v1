import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import LinkList from '../components/LinkList';
import NoMatch from '../containers/NoMatch';
import Loader from '../components/Loader';
import UserPreview from '../components/UserPreview';
import { getUser } from '../actions/user';
import { editLink, destroyLink } from '../actions/link';
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
		if (this.props.params.id !== nextProps.params.id) {
			User.readyOnActions(nextProps.dispatch, nextProps.params);	
		}
		// const thisUserData = (this.props.userData && this.props.userData.userData) || {};
		const nextUserData = (nextProps.userData && nextProps.userData.userData) || {};

		const loginData = nextProps.appData.loginData || {};
		const following = loginData.following || [];
		const followingIDs = following.map((followee)=> {
			return followee.id;
		});
		if (!nextProps.userData.setLastRead && nextUserData.id && followingIDs.includes(nextUserData.id)) {
			const follower = nextProps.appData.loginData.id;
			this.props.dispatch(updateLastRead(follower, nextProps.userData.userData.id));
		}
	},

	handleFollowCreate: function() {
		const loginData = this.props.appData.loginData || {};
		if (!loginData.id) { return browserHistory.push('/login'); }

		const follower = this.props.appData.loginData.id;
		const followeeID = this.props.userData.userData.id;
		return this.props.dispatch(createFollow(follower, followeeID, Date.now()));
	},

	handleFollowDestroy: function() {
		const followeeID = this.props.userData.userData.id;
		const follower = this.props.appData.loginData.id;

		this.props.dispatch(destroyFollow(follower, followeeID));
	},

	handleLinkEdit: function(linkID, description, url) {
		this.props.dispatch(editLink(linkID, description, url));
	},

	handleLinkDelete: function(linkID) {
		this.props.dispatch(destroyLink(linkID));
	},
	
	render() {
		const isSelf = this.props.appData.loginData.username === this.props.params.id;
		const following = this.props.appData.loginData.following || [];
		const username = this.props.params.id;
		const user = (isSelf ? this.props.appData.loginData : this.props.userData.userData) || {};
		const userFollowers = user.followers || [];
		const userFollowing = user.following || [];

		const meta = this.props.params.meta;
		
		const isFollowed = following.reduce((previousVal, current) => {
			if (current.username === this.props.params.id) {
				return true;
			}
			return false || previousVal;
		}, false);

		if (this.props.userData.loading) {
			return <Loader />;
		}

		if (!user.id || (meta && meta !== 'followers' && meta !== 'following')) {
			return <NoMatch />;
		}

		return (
			<div>
				<Helmet 
					title={user.name || this.props.params.id} 
					meta={[
						{ property: 'og:title', content: user.name || this.props.params.id },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:description', content: 'List of Links by ' + user.name || this.props.params.id },
						{ property: 'og:url', content: 'https://www.listoflinks.co/' + this.props.params.id },
						{ property: 'og:image', content: user.image },
						{ property: 'og:image:url', content: user.image },
						{ property: 'og:image:width', content: '500' },
						{ name: 'twitter:card', content: 'summary' },
						{ name: 'twitter:site', content: '@listoflinks' },
						{ name: 'twitter:title', content: user.name || this.props.params.id },
						{ name: 'twitter:description', content: 'List of Links by ' + user.name || this.props.params.id },
						{ name: 'twitter:image', content: user.image },
						{ name: 'twitter:image:alt', content: 'Preview image for ' + user.name || this.props.params.id }
					]} />
				
				<div style={styles.header} className={'user-header'}>
					<div style={styles.imageWrapper}>
						<Link to={'/' + username}>
							<img style={styles.image} src={user.image} alt="user" />
						</Link>
						
					</div>
					<div style={styles.userDetails}>
						<div style={styles.name} className={'user-name'}>
							<Link className={'link'} to={'/' + username}>{user.name}</Link>
						</div>
						<div style={styles.links}>
							<Link className={'link'} style={styles.link} to={'/' + username + '/following'}>Following</Link>
							<Link className={'link'} style={styles.link} to={'/' + username + '/followers'}>Followers</Link>
						</div>
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
				
				{!meta &&
					<div>
						{isSelf
							? <LinkList links={user.links} handleLinkEdit={this.handleLinkEdit} handleLinkDelete={this.handleLinkDelete} />
							: <LinkList links={user.links} />
						}
					</div>
					
				}

				{meta === 'following' &&
					<div>
						<h2>Following</h2>
						<div className={'previews-container'}>
							{userFollowing.map((thisUser, index)=> {
								return <UserPreview key={'follwedUser-' + index} user={thisUser} noBadge={true} />;
							})}
						</div>

						{userFollowing.length === 0 && 
							<div style={styles.noLinks}>
								Not following anyone yet
							</div>
						}
					</div>
					
				}

				{meta === 'followers' &&
					<div>
						<h2>Followers</h2>
						<div className={'previews-container'}>
							{userFollowers.map((thisUser, index)=> {
								return <UserPreview key={'follwerUser-' + index} user={thisUser} noBadge={true} />;
							})}
						</div>

						{userFollowers.length === 0 && 
							<div style={styles.noLinks}>
								No followers yet
							</div>
						}
					</div>
					
				}
				
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
		borderBottom: '1px solid #CCC',
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
	links: {
		paddingLeft: '1em',
	},
	link: {
		paddingRight: '1em',
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
	noLinks: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
		textAlign: 'center',
		padding: '3em 0em',
	},

};
