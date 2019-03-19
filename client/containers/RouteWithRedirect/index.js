import React from 'react';
import {
    Route, 
    Redirect,
} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {
    compose,
    lifecycle,
    branch,
    renderNothing,
} from 'recompose';

import {
    fetchUserInfo,
    fetchUserInfoCompleted,
    fetchUserInfoFailed,
} from './actions';

const PAGES = {
    '/manage': {
        role: 'ADMIN',
        redirectTo: '/',
        path: '/manage',
    },
    '/': {
        role: 'USER',
        redirectTo: '/sign-in',
        path: '/',
    },
    '/sign-in': {
        redirectTo: '/',
        path: '/sign-in',
    },
    '/settings': {
        role: 'USER',
        redirectTo: '/sign-in',
        path: '/settings',
    },
    '/map-data': {
        role: 'ADMIN',
        redirectTo: '/',
        path: '/map-data',
    },
    '/user-settings': {
        role: 'USER',
        redirectTo: '/sign-in',
        path: '/user-settings',
    },
};

const RouteWithRedirect = ({path, Component, auth, actions}: *) => {
    const pageData = PAGES[path];
    const pathname = pageData.redirectTo;

    let hasAccess = false;

    if (path === PAGES['/sign-in'].path) {
        hasAccess = !auth;
    } else {
        hasAccess = auth && actions.includes(pageData.role);
    }

    return (
        <Route
            exact 
            path={path} 
            render={() => hasAccess ? <Component /> : <Redirect to={{pathname}} />} 
        />
    );
};

const mapStateToProps = (state, {cookies}) => {
    const auth = cookies.get('auth');

    return {        
        auth,
        actions: state.user.actions,
    };
};

const mapDispatchToProps = {
    fetchUserInfo,
    fetchUserInfoCompleted,
    fetchUserInfoFailed,
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    lifecycle({
        componentWillMount() {
            this.props.fetchUserInfo();

            fetch('/api/user/info', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(actions => this.props.fetchUserInfoCompleted(actions))
                .catch(() => this.props.fetchUserInfoFailed());
        },
    }),
    branch(
        ({actions}) => !actions,
        renderNothing,
    ),
);

export default withCookies(enhance(RouteWithRedirect));
