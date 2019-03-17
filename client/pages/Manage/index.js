/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
    compose,
    lifecycle,
} from 'recompose';

import {Spinner} from '../../components';
import {STATUS} from '../../constants/status';

import User, {type UserProps} from './User';

import {
    fetchUsers,
    fetchUsersCompleted,
} from './actions';
import RegisterUser from './RegisterUser';
import css from './style.css';

type ManageProps = {
    users: UserProps[],
    status: string,
};

const Manage = ({users, status}: ManageProps) => (
    <div className={css.page}>
        <div className={css.content}>
            <Spinner loading={status === STATUS.pending} className={css.spinner}>

                <div className={css.title}>
                    <h2>Управление пользователями</h2>
                </div>
                <RegisterUser />
                <div className={css.subtitle}>Список пользователей</div>
                <div className={css.userList}>
                    <div className={css.head}>
                        <div>Логин</div>
                        <div>Роль</div>
                    </div>
                    {
                        users && users.map((user, key) => <User key={key} {...user} />)
                    }
                </div>
            </Spinner>
        </div>
    </div>
);

const mapStateToProps = state => {
    const {users = [], status} = state.manage;

    return {
        users,
        status,
    };
};

const mapDispatchToProps = {
    fetchUsers,
    fetchUsersCompleted,
};

const fetchUserData = () => {
    const data = fetch('/api/admin/user/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json());

    return data;
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    lifecycle({
        componentWillMount() {
            this.props.fetchUsers();

            fetchUserData().then(users => {
                this.props.fetchUsersCompleted(users);
            });
        },
    }),
);

export default enhance(Manage);
