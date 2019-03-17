import React from 'react';
import {
    BrowserRouter, 
    Route, 
    Switch,
    Redirect,
} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';

import SignIn from './pages/SignIn';
import Map from './pages/Map';

const RouteWithRedirect = ({path, Component, auth}: *) => (
    <Route
        exact 
        path={path} 
        render={() => auth
            ? <Component /> 
            : (
                <Redirect to={{pathname: '/sign-in'}} />
            )} 
    />
);

const Routes = ({auth, ...props}: *) => (
    <BrowserRouter {...props}>
        <Switch>
            <Route
                exact 
                path="/sign-in" 
                render={() => auth
                    ? (
                        <Redirect to={{pathname: '/'}} />
                    ) 
                    : <SignIn />
                } 
            />
            <RouteWithRedirect
                path="/"
                Component={Map}
                auth={auth}
            />
        </Switch>
    </BrowserRouter>
);

const mapStateToProps = (state, {cookies}) => {
    const auth = cookies.get('auth');

    return {        
        auth,
        actions: state.signIn.actions,
    };
};

const enhance = connect(mapStateToProps);

export default withCookies(enhance(Routes));
