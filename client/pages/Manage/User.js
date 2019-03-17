/* @flow */

import React from 'react';
import {head} from 'ramda';
import {connect} from 'react-redux';
import {compose, withHandlers} from 'recompose';

import {ROLES} from '../../constants/user';
import {Button} from '../../components';

import {
    makeAdmin,
    makeAdminCompleted,
    makeAdminFailed,

    deleteUser,
    deleteUserCompleted,
    deleteUserFailed,
} from './actions';
import css from './style.css';

export type UserProps = {
    name: string,
    roles: string[],
    deleteUser: () => void,
    makeAdmin: () => void,
};

type RoleProps = {
    children: string,
};

const Role = ({children}: RoleProps) => (
    <div>
        {ROLES[children].name}
    </div>
);

const User = ({
    name,
    roles,
    deleteUser,
    makeAdmin,
}: UserProps) => {
    const sorted = roles.sort((a, b) => ROLES[a].priority - ROLES[b].priority);
    const role = head(sorted);

    return (
        <div className={css.user}>
            <div>
                {name}
            </div>
            <div>
                <Role>{role}</Role>
            </div>
            <div className={css.edit}>
                {
                    role !== ROLES.ADMIN.id && (
                        <Button
                            size="s"
                            theme="normal"
                            className={css.button}
                            onClick={makeAdmin}
                        >
                            Сделать администратором
                        </Button>
                    )
                }
                <div
                    className={css.deleteIcon} 
                    onClick={deleteUser} 
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    deleteUser,
    deleteUserCompleted,
    deleteUserFailed,
    makeAdmin,
    makeAdminCompleted,
    makeAdminFailed,
};

const enhance = compose(
    connect(null, mapDispatchToProps),
    withHandlers({
        makeAdmin: ({
            name,
            makeAdmin,
            makeAdminCompleted,
            makeAdminFailed,
        }) => () => {
            makeAdmin();

            fetch('/api/admin/user/make-admin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name}),
            })
                .then(res => res.json())
                .then(() => makeAdminCompleted(name))
                .catch(makeAdminFailed)
        },
        deleteUser: ({
            name,
            deleteUser,
            deleteUserCompleted,
            deleteUserFailed,
        }) => () => {
            deleteUser();

            fetch('/api/admin/user/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name}),
            })
                .then(res => res.json())
                .then(() => deleteUserCompleted(name))
                .catch(deleteUserFailed)
        },
    }),
);

export default enhance(User);