import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserHeader from '../components/UserHeader';
import LinkList from '../components/LinkList';

export const User = React.createClass({

  render() {
    const following = this.props.appData.following || [];
    const displayedUser = following.reduce((previousVal, current)=> {
      if (String(current.username) === this.props.params.id) {
        return current;
      }
      return previousVal;
    }, {});

    return (
      <div>
        <Helmet title={displayedUser.name} />
        <UserHeader user={displayedUser} />
        <LinkList links={displayedUser.links} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    appData: state.app
  };
}

export default connect(mapStateToProps)(User);
