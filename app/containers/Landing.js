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

	// statics: {
	//   readyOnActions: function(dispatch) {
	//     return Promise.all([
	//       dispatch(getLoginData())
	//     ]);
	//   }
	// },

	// componentDidMount() {
	//   // Need to check here so that getLoginData doesn't make a fetch twice
	//   Landing.readyOnActions(this.props.dispatch);
	// },

	addLink: function(description, link) {
		this.props.dispatch(createLink(description, link));
	},

	render() {
		const user = this.props.appData.loginData || {};
		const following = user.following || [];

		return (
			<div>
				{user.id
					? <InputHeader loginData={this.props.appData.loginData} handleAddLink={this.addLink} />
					: <div>
						<h1>List of Links</h1>
						<p>Welcome! Please <Link to={'/login'} className={'link'}>Login</Link> or <Link to={'/signup'} className={'link'}>Sign up</Link> to get started</p>

					</div>
				}
				

				<div className={'previews-container'}>
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
	previewsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingTop: '1em',
		width: 'calc(100% + 2em)',
		position: 'relative',
		left: '-1em',
	},
};

