'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import LocalStorage from './components/LocalStorage.jsx';

export default (
  <Route component={App} history={history} path="/">
  	<IndexRoute component={Home}/>
  </Route>
);