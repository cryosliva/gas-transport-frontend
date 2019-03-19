/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
    compose,
    withStateHandlers,
    withHandlers,
} from 'recompose';

import {Spinner, Input, Button} from '../../components';
import {STATUS} from '../../constants/status';

import {
    changePassword,
    changePasswordCompleted,
    changePasswordFailed,
} from '../../containers/RouteWithRedirect/actions';
import css from './style.css';

type ManageProps = {
    status: string,
    onPasswordChange: () => void,
    changePassword: () => void,
};

const UserSettings = ({status, onPasswordChange, changePassword}: ManageProps) => (
    <div className={css.page}>
        <div className={css.content}>
            <Spinner loading={status === STATUS.pending} className={css.spinner}>
                <div className={css.title}>
                    <h2>Пользовательские настройки</h2>
                </div>
                <div className={css.container}>
                    <div className={css.subtitle}>Изменение данных для входа</div>
                    <div className={css.head}>
                        <div />
                        <div />
                    </div>
                    <div className={css.line}>
                        <Input
                            type="password"
                            placeholder="********"
                            onChange={onPasswordChange}
                        />
                        <Button
                            onClick={changePassword}
                        >
                            Поменять пароль
                        </Button>
                    </div>
                </div>
            </Spinner>
        </div>
    </div>
);

const mapStateToProps = state => {
    const {user} = state;

    return {
        status: user.status,
    };
};

const mapDispatchToProps = {
    changePassword,
    changePasswordCompleted,
    changePasswordFailed,
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withStateHandlers(
        () => ({
            password: '',
        }),
        {
            onPasswordChange: () => event => ({password: event.target.value}),
        },
    ),
    withHandlers({
        changePassword: ({
            password,
            changePassword,
            changePasswordCompleted,
            changePasswordFailed,
        }) => () => {
            changePassword();

            fetch('/api/user/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password}),
            })
                .then(res => res.json())
                .then(changePasswordCompleted)
                .catch(changePasswordFailed);
        },
    }),
);

export default enhance(UserSettings);
