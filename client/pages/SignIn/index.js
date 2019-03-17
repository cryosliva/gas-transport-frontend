/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
    compose,
    withStateHandlers,
    withHandlers,
} from 'recompose';

import {STATUS} from '../../constants/status';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';

import {
    fetchUserInfo,
    fetchUserInfoCompleted,
    fetchUserInfoFailed,
} from '../../containers/RouteWithRedirect/actions';

import css from './style.css';

const AuthorizationError = () => (
    <div className={css.error}>
        Ошибка авторизации. Для получения доступа свяжитесь с администраторами.
    </div>
);

const SignIn = ({status, onClick, onEmailChange, onPasswordChange}: SignInProps) => (
    <div className={css.root}>
        {
            status === STATUS.failed && (
                <AuthorizationError />
            )
        }
        <div className={css.pane}>
            <Spinner loading={status === STATUS.pending}>
                <form className={css.form}>
                    <Input
                        className={css.input}
                        placeholder="example@hse.ru"
                        name="email"
                        onChange={onEmailChange}
                    />
                    <Input
                        className={css.input}
                        placeholder="********"
                        type="password"
                        name="password"
                        onChange={onPasswordChange}
                    />
                    <Button
                        theme="active" 
                        onClick={onClick}
                        className={css.button}
                    >
                        ВОЙТИ
                    </Button>
                </form>
            </Spinner>
        </div>
    </div>
);

const mapStateToProps = state => ({
    status: state.user.status,
});

const mapDispatchToProps = {
    fetchUserInfo,
    fetchUserInfoCompleted,
    fetchUserInfoFailed,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        () => ({email: '', password: ''}),
        {
            onEmailChange: ({email}) => event => ({email: event.target.value}),
            onPasswordChange: ({password}) => event => ({password: event.target.value}),
        },
    ),
    withHandlers({
        onClick: ({
            email,
            password,
            fetchUserInfo,
            fetchUserInfoCompleted,
            fetchUserInfoFailed,
        }) => event => {
            event.preventDefault();
            fetchUserInfo();

            fetch('/api/sign-in', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            })
                .then(res => res.json())
                .then(roles => roles.length > 0 ? fetchUserInfoCompleted(roles) : fetchUserInfoFailed());
        },
    })
);

export default enhance(SignIn);
