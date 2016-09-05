import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const UserPreview = React.createClass({
  propTypes: {
    user: PropTypes.object,
  },

  render: function() {
    const user = this.props.user;
    return (
      <div>
        <Link to={'/' + user.age}><h2>{user.username}</h2></Link>
        <p>{user.location}</p>
      </div>
    );
  }

});

export default UserPreview;
