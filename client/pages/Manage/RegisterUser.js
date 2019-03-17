/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
    compose,
    withStateHandlers,
    withHandlers,
} from 'recompose';

import {Button, Input, Spinner} from '../../components';
import {STATUS} from '../../constants/status';

import {
    registerUser,
    registerUserCompleted,
    registerUserFailed,
} from './actions';
import css from './style.css';

type RegisterUserProps = {
    onUsernameChange: () => void,
    onPasswordChange: () => void,
    registerUser: () => void,
};

const RegisterUser = ({
    onUsernameChange,
    onPasswordChange,
    registerUser,
}: RegisterUserProps) => (
    <div>
        <div className={css.subtitle}>Добавить нового пользователя</div>
        <Spinner loading={status === STATUS.pending}>
            <div className={css.form}>
                <Input 
                    size="s"
                    placeholder="example@hse.ru"
                    name="username"
                    onChange={onUsernameChange}
                />
                <Input
                    size="s"
                    placeholder="********"
                    type="password"
                    name="password"
                    onChange={onPasswordChange}
                />
                <Button
                    onClick={registerUser}
                >
                    Зарегистрировать
                </Button>
            </div>
        </Spinner>
    </div>
);

const mapStateToProps = state => {
    const {status} = state.manage;

    return {
        status,
    };
};

const mapDispatchToProps = {
    registerUser,
    registerUserCompleted,
    registerUserFailed,
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withStateHandlers(
        () => ({username: '', password: ''}),
        {
            onUsernameChange: () => event => ({username: event.target.value}),
            onPasswordChange: () => event => ({password: event.target.value}),
        },
    ),
    withHandlers({
        registerUser: ({
            username,
            password,
            registerUser,
            registerUserCompleted,
            registerUserFailed,
        }) => event => {
            event.preventDefault();

            registerUser();

            fetch('/api/admin/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            })
                .then(res => res.json())
                .then(registerUserCompleted)
                .catch(registerUserFailed)
        },
    })
);

export default enhance(RegisterUser);