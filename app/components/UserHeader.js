import React, { PropTypes } from 'react';

export const UserHeader = React.createClass({
  propTypes: {
    user: PropTypes.object,
  },

  render: function() {
    const user = this.props.user;
    return (
      <div>
        {JSON.stringify(user)}
      </div>
    );
  }

});

export default UserHeader;
