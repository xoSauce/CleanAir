'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Intro from './components/Intro.jsx';
import SelectLocation from './components/SelectLocation.jsx';
import Map from './components/Map.jsx';

export default (
    <Route component={App} history={history} path="/">
    	<IndexRoute component={Intro}/>
      <Route component={SelectLocation} path="/select-location"/>
      <Route component={Map} path="/map"/>

    </Route>
);