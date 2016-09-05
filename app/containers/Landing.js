import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {getLoginData} from '../actions/app';
import UserPreview from '../components/UserPreview';

export const Landing = React.createClass({

  statics: {
    readyOnActions: function(dispatch) {
      return Promise.all([
        dispatch(getLoginData())
      ]);
    }
  },

  componentDidMount() {
    // Need to check here so that getLoginData doesn't make a fetch twice
    Landing.readyOnActions(this.props.dispatch);
  },

  render() {
    const user = this.props.appData.user || {};
    const following = user.following || [];
    return (
      <div>
        <Helmet title='Landing' />
        <h2>{user.username}</h2>
        <hr/>

        <h5>Users:</h5>
        {following.map((followedUser, index)=> {
          return <UserPreview key={'follwedUser-' + index} user={followedUser} />
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
