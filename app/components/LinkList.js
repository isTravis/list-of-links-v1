import React, { PropTypes } from 'react';

export const LinkList = React.createClass({
  propTypes: {
    links: PropTypes.array,
  },

  render: function() {
    const links = this.props.links;
    return (
      <div>
        <hr/>
        All the links here!
        {JSON.stringify(links)}
      </div>
    );
  }

});

export default LinkList;
