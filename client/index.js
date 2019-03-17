import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';

import store from './store';
import Page from './containers/Page';

import './style.css';

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <Page />
        </Provider>
    </CookiesProvider>,
    document.getElementById('app'),
);
