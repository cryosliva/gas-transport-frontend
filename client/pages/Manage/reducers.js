/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';
import {append} from 'ramda';

import {STATUS} from '../../constants/status';

import {
    FETCH_USERS,
    FETCH_USERS_COMPLETED,
    FETCH_USERS_FAILED,

    REGISTER_USER,
    REGISTER_USER_COMPLETED,
    REGISTER_USER_FAILED,

    DELETE_USER,
    DELETE_USER_COMPLETED,
    DELETE_USER_FAILED,

    MAKE_ADMIN,
    MAKE_ADMIN_COMPLETED,
    MAKE_ADMIN_FAILED,
    type Actions
} from './actions';
import {join} from 'path';

type User = {
    name: string,
    roles: string[],
}

export type State = {
    status: $Keys<typeof STATUS>,
    users: User[],
};

export default handleActions(({
    [FETCH_USERS]: state => {
        state.status = STATUS.pending;
    },
    [FETCH_USERS_COMPLETED]: (state, {payload}) => {
        state.users = payload;
        state.status = STATUS.done;
    },
    [FETCH_USERS_FAILED]: state => {
        state.status = STATUS.failed;
    },

    [REGISTER_USER]: state => {
        state.status = STATUS.pending;
    },
    [REGISTER_USER_COMPLETED]: (state, {payload}) => {
        state.status = STATUS.done;
        state.users = append(payload, state.users);
    },
    [REGISTER_USER_FAILED]: state => {
        state.status = STATUS.failed;
    },

    [DELETE_USER]: state => {
        state.status = STATUS.pending;
    },
    [DELETE_USER_COMPLETED]: (state, {payload}) => {
        state.status = STATUS.done;
        state.users = state.users.filter(({name}) => name !== payload);
    },
    [DELETE_USER_FAILED]: state => {
        state.status = STATUS.failed;
    },

    [MAKE_ADMIN]: state => {
        state.status = STATUS.pending;
    },
    [MAKE_ADMIN_COMPLETED]: (state, {payload}) => {
        state.status = STATUS.done;
        state.users = state.users.map(({name, roles}) => ({
            name,
            roles: name === payload? [...roles, 'ADMIN'] : roles,
        }));
    },
    [MAKE_ADMIN_FAILED]: state => {
        state.status = STATUS.failed;
    },
}: Handlers<State, Actions>));
