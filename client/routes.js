import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SignIn from './pages/SignIn';

const Routes = props => (
    <BrowserRouter {...props}>
        <Switch>
            <Route exact path="/sign-in" component={SignIn} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
