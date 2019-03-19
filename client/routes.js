import React from 'react';
import {
    BrowserRouter, 
    Switch,
} from 'react-router-dom';

import SignIn from './pages/SignIn';
import Map from './pages/Map';
import Manage from './pages/Manage';
import MapData from './pages/MapData';
import UserSettings from './pages/UserSettings';

import RouteWithRedirect from './containers/RouteWithRedirect';

const Routes = props => (
    <BrowserRouter {...props}>
        <Switch>
            <RouteWithRedirect
                path="/sign-in"
                Component={SignIn}
            />
            <RouteWithRedirect
                path="/manage"
                Component={Manage}
            />
            <RouteWithRedirect
                path="/map-data"
                Component={MapData}
            />
            <RouteWithRedirect
                path="/user-settings"
                Component={UserSettings}
            />
            <RouteWithRedirect
                path="/"
                Component={Map}
            />
        </Switch>
    </BrowserRouter>
);

export default Routes;
