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
        <Link to={'/' + user.username}>
          <img src={user.image} width="100px"/>
          <div>{user.links.length}</div>
        </Link>
      </div>
    );
  }

});

export default UserPreview;
