import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SignIn from './pages/SignIn';
import Map from './pages/Map';

const Routes = props => (
    <BrowserRouter {...props}>
        <Switch>
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/map" component={Map} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
