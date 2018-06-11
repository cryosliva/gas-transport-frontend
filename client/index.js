import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from ‘react-redux’;

import store from ‘./store’;
import Users from './users';

ReactDOM.render(
  <Provider store={store}>
    <Users />
  </Provider>, document.getElementById('app')
);
