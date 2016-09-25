import React, { PropTypes } from 'react';

export const UserHeader = React.createClass({
  propTypes: {
    user: PropTypes.object,
  },

  render: function() {
    const user = this.props.user;
    return (
      <div>
        <img src={user.image} width="100px" alt="user" />
        <h2>{user.name}</h2>

      </div>
    );
  }

});

export default UserHeader;
