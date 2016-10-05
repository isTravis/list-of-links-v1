import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import {getLoginData} from '../actions/app';
import InputHeader from '../components/InputHeader';
import UserPreview from '../components/UserPreview';

import { createLink, editLink, destroyLink } from '../actions/link';
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

	handleLinkEdit: function(linkID, description, url) {
		this.props.dispatch(editLink(linkID, description, url));
	},

	handleLinkDelete: function(linkID) {
		this.props.dispatch(destroyLink(linkID));
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
		const follower = this.props.appData.loginData.id;
		this.props.dispatch(createFollow(follower, followeeID, undefined));
	},

	handleFollowDestroy: function(followeeID) {
		const follower = this.props.appData.loginData.id;
		this.props.dispatch(destroyFollow(follower, followeeID));
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
					? <InputHeader loginData={this.props.appData.loginData} handleAddLink={this.addLink} handleLinkEdit={this.handleLinkEdit} handleLinkDelete={this.handleLinkDelete} addedLink={this.props.linkData.addedLink} isLoading={this.props.linkData.loading} error={this.props.linkData.error} />
					: <div>
						<div style={styles.topHeader}>
							<h1 style={styles.topHeaderTitle}>List of Links</h1>
							<p style={styles.topHeaderText}>A simple tool for collecting and sharing a list of links</p>

							<p><Link to={'/login'} className={'link'}><button className={'button'} style={styles.button}>Login</button></Link> <span style={styles.separator}>or</span> <Link to={'/signup'} className={'link'}><button className={'button'} style={styles.button}>Sign up</button></Link></p>
						</div>
						
						<div style={styles.about}>
							<h2 style={styles.sectionHeader}>Function over Fluff</h2>
							<p>Committed to an ad-free, socially sane, and functionally useful internet, List of Links features no follower counts, no likes, no contrived social games to play.</p>

							<h2 style={styles.sectionHeader}>Pull over Push</h2>
							<p>List of Links avoids scattering your attention with a feed and instead encourages you to focus on a certain person, their perspective, and what links they've been sharing. </p>
							
							<h2 style={styles.sectionHeader}>Open</h2>
							<p>The project is <a href={'https://github.com/isTravis/list-of-links'}>open source</a> and contributions, bug reports, and feature requests are welcome! List of Links provides an <a href={'http://docs.listoflinks.co'}>API</a> enabling you to build browser extensions, desktop clients, or visualization tools.</p>
						</div>
						

						<h2 style={styles.sectionHeader}>Explore</h2>
						
						<div className={'previews-container'} style={styles.defaultPreviews}>
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
	topHeader: {
		textAlign: 'center',
		borderBottom: '1px solid #ccc',
		padding: '2em 0em 3em',
		margin: '0em 0em 3em',
	},
	topHeaderTitle: {
		fontSize: '4em',
		margin: '0em',
	},
	topHeaderText: {
		margin: '0em',
		padding: '0em 0em 2em',
	},
	about: {
		lineHeight: '1.6em',
	},
	sectionHeader: {
		margin: '1.5em 0em 0em',
	},
	defaultPreviews: {
		paddingTop: '0em',
	},
	button: {
		padding: '.5em 2em',
		fontSize: '1em',
		// marginRight: '1em',
	},
	separator: {
		padding: '0em 2em',
	},
};

