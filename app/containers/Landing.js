import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import {getLoginData} from '../actions/app';
import InputHeader from '../components/InputHeader';
import UserPreview from '../components/UserPreview';

import { createLink } from '../actions/link';

let styles;

export const Landing = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	addLink: function(description, link) {
		this.props.dispatch(createLink(description, link));
	},

	calculateLinkCount: function(user) {
		const lastRead = user.Follow && user.Follow.lastRead;
		return user.links.reduce((previousVal, current) => {
			if (current.createdAt > lastRead) {
				return previousVal + 1;	
			}
			return previousVal;
		}, 0);
	},

	render() {
		const user = this.props.appData.loginData || {};
		const following = user.following || [];

		return (
			<div style={styles.container}>
				{user.id
					? <InputHeader loginData={this.props.appData.loginData} handleAddLink={this.addLink} />
					: <div>
						<h1>List of Links</h1>
						<p>Welcome! Please <Link to={'/login'} className={'link'}>Login</Link> or <Link to={'/signup'} className={'link'}>Sign up</Link> to get started</p>

					</div>
				}
				

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
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
					{following.map((followedUser, index)=> {
						return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
					})}
				</div>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		appData: state.app
	};
}

export default connect(mapStateToProps)(Landing);

styles = {

};

