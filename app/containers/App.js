import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import {getLoginData} from '../actions/app';

export const App = React.createClass({

  statics: {
    readyOnActions: function(dispatch) {
      return Promise.all([
        dispatch(getLoginData())
      ]);
    }
  },

  componentDidMount() {
    // Need to check here so that getLoginData doesn't make a fetch twice
    App.readyOnActions(this.props.dispatch);
  },

  render() {
    return (
      <div>
        <Helmet
          title='MyApp'/>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    appData: state.app
  };
}

export default connect(mapStateToProps)(App);

