// @flow

import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route  
} from 'react-router-dom';
import SearchScreen from 'screens/Search';
import Profile from 'screens/Profile';
import RepoDetails from 'screens/RepoDetails';
import DefaultLayout from 'screens/Default';

import 'css/global.css';

export default function App() {
  return (
    <Router>
      <Switch>        
        <DefaultLayout exact={true} path="/search" component={SearchScreen} />
        <DefaultLayout exact={true} path="/:username" component={Profile} />        
        <DefaultLayout exact={true} path="/:username/:repo" component={RepoDetails} />
        <Redirect to="/search" />
      </Switch>
    </Router>
  );
}
