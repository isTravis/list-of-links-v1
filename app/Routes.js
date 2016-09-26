import React from 'react';
import { Route } from 'react-router';
import About from './components/About';
import App from './containers/App';
import Landing from './containers/Landing';
import User from './containers/User';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NoMatch from './containers/NoMatch';

export default (
  <Route component={App}>
    <Route path="/" component={Landing} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/:id" component={User} />
    <Route path="*" component={NoMatch} />
  </Route>
);
