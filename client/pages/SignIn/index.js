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
    getRoles,
    getRolesCompleted,
    getRolesFailed,
} from './actions.js';
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
                        placeholder="example@hse.ru"
                        name="email"
                        onChange={onEmailChange}
                    />
                    <Input
                        placeholder="********"
                        type="password"
                        name="password"
                        onChange={onPasswordChange}
                    />
                    <Button theme="active" onClick={onClick}>ВОЙТИ</Button>
                </form>
            </Spinner>
        </div>
    </div>
);

const mapStateToProps = state => ({
    status: state.signIn.status,
});

const mapDispatchToProps = {
    fetchRoles: getRoles,
    fetchRolesCompleted: getRolesCompleted,
    fetchRolesFailed: getRolesFailed,
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
            fetchRoles,
            fetchRolesCompleted,
            fetchRolesFailed,
        }) => event => {
            event.preventDefault();
            fetchRoles();

            fetch('/api/sign-in', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, password}),
                })
                .then(res => res.json())
                .then(roles => (
                    roles.length > 0
                        ? fetchRolesCompleted()
                        : fetchRolesFailed()
                ))
        },
    })
);

export default enhance(SignIn);
