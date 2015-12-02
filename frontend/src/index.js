import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes.jsx';

const history = createHashHistory({queryKey:false});
ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'))

