'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Intro from './components/Intro.jsx';
import SelectLocation from './components/SelectLocation.jsx';
import Map from './components/Map.jsx';
import PropertyModal from './components/PropertyModal.jsx';
import UserModal from './components/UserModal.jsx';
import InfoModal from './components/InfoModal.jsx';
import WarningModal from './components/WarningModal.jsx';
import Loading from './components/Loading.jsx';

export default (
    <Route component={App} history={history} path="/">
    	<IndexRoute component={Intro}/>
      <Route component={SelectLocation} path="/select-location"/>
      <Route component={Map} path="/map">
        <Route component={Loading} path="/map/loading"/>
        <Route component={UserModal} path="/map/user-modal"/>
        <Route component={PropertyModal} path="/map/property-modal"/>
        <Route component={InfoModal} path="/map/info-modal"/>
        <Route component={WarningModal} path="/map/warning-modal"/>
      </Route>

    </Route>
);
