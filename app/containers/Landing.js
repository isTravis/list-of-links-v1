import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import {getLoginData} from '../actions/app';
import InputHeader from '../components/InputHeader';
import UserPreview from '../components/UserPreview';

import { createLink } from '../actions/link';

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
				<Helmet title="Landing" />
				<InputHeader loginData={this.props.appData.loginData} handleAddLink={this.addLink} />
				{following.map((followedUser, index)=> {
					return <UserPreview key={'follwedUser-' + index} user={followedUser} />;
				})}
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
