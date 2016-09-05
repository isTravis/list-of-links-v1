import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const InputHeader = React.createClass({
  propTypes: {
    loginData: PropTypes.object,
  },

  render: function() {
    const user = this.props.loginData;
    return (
      <div>
        <Link to={'/' + user.username}>
          <img src={user.image} width="100px"/>
        </Link>
        <input placeholder={'Description'} type={'text'}/>
        <input placeholder={'link'} type={'url'}/>
      </div>
    );
  }

});

export default InputHeader;
