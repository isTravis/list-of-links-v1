import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import {getLoginData} from '../actions/app';
import InputHeader from '../components/InputHeader';
import UserPreview from '../components/UserPreview';

import { createLink } from '../actions/link';
import { createFollow, destroyFollow } from '../actions/follow';

let styles;

export const Landing = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		linkData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			recentUsers: '',
		};
	},

	componentWillMount() {
		// So that recentUsers don't hop between the following and 'more to follow'
		// section, store them in the state, so they can be followed and unfollowed sanely
		const user = this.props.appData.loginData || {};
		const following = user.following || [];
		const followingIDs = following.map((followee)=> {
			return followee.id;
		});

		const recentUsers = this.props.appData.recentUsers || [];
		const uniqueRecent = recentUsers.filter((recentUser)=> {
			return !followingIDs.includes(recentUser.id) && recentUser.id !== user.id;
		});
		this.setState({ recentUsers: uniqueRecent });
	},

	addLink: function(description, link) {
		this.props.dispatch(createLink(description, link));
	},

	calculateLinkCount: function(user) {
		const lastRead = (user.Follow && user.Follow.lastRead) || new Date(1970).toISOString();
		return user.links.reduce((previousVal, current) => {
			if (current.createdAt > lastRead) {
				return previousVal + 1;	
			}
			return previousVal;
		}, 0);
	},

	handleFollowCreate: function(followeeID) {
		this.props.dispatch(createFollow(followeeID, undefined));
	},

	handleFollowDestroy: function(followeeID) {
		this.props.dispatch(destroyFollow(followeeID));
	},

	render() {
		const user = this.props.appData.loginData || {};
		const following = user.following || [];
		const followingIDs = following.map((followee)=> {
			return followee.id;
		});

		return (
			<div style={styles.container}>
				{user.id
					? <InputHeader loginData={this.props.appData.loginData} handleAddLink={this.addLink} isLoading={this.props.linkData.loading} />
					: <div>
						<h1>List of Links</h1>
						<p>A simple tool for collecting and sharing a list of links</p>

						<p><Link to={'/login'} className={'link'}>Login</Link> or <Link to={'/signup'} className={'link'}>Sign up</Link></p>
						
						<div className={'previews-container'}>
							{this.state.recentUsers.map((recentUser, index)=> {
								return (
									<UserPreview 
										key={'recentUser-' + index} 
										user={recentUser} 
										noBadge={true} />
								);
							})}
						</div>

					</div>
				}
				

				{user.id && 
					<div className={'previews-container'}>
						{following.sort((foo, bar)=> {
							const fooCount = this.calculateLinkCount(foo);
							const barCount = this.calculateLinkCount(bar);
							if (fooCount > barCount) { return -1; }
							if (fooCount < barCount) { return 1; }
							return 0;
						}).map((followedUser, index)=> {
							return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
						})}
					</div>
				}

				{user.id && following.length === 0 &&
					<div style={styles.noLinks}>
						Not following anyone yet
					</div>
				}

				{user.id && !!this.state.recentUsers.length &&
					<div style={styles.recentSection}>
						<h2>More to Follow</h2>
						<div className={'previews-container'}>
							{this.state.recentUsers.map((recentUser, index)=> {
								return (
									<UserPreview 
										key={'recentUser-' + index} 
										user={recentUser} 
										noBadge={true} 
										handleFollowCreate={this.handleFollowCreate} 
										handleFollowDestroy={this.handleFollowDestroy} 
										isFollowing={followingIDs.includes(recentUser.id)} />
								);
							})}
						</div>
					</div>
				}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app,
		linkData: state.link,
	};
}

export default connect(mapStateToProps)(Landing);

styles = {
	noLinks: {
		fontSize: '1.25em',
		fontWeight: 'bold',
		color: '#555',
		textAlign: 'center',
		padding: '3em 0em',
	},
	recentSection: {
		borderTop: '1px solid #CCC',
	},
};

