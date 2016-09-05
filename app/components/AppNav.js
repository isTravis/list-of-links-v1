import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './style.scss';

export const AppNav = React.createClass({
  propTypes: {
    loginData: PropTypes.object,
  },

  render: function() {
    const user = this.props.user;
    return (
      <div className="appnav-container">
        <Link to='/'>Home</Link>
      </div>
    );
  }

});

export default AppNav;
