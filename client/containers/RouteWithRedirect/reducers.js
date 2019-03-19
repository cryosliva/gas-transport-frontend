/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {STATUS} from '../../constants/status';

import {
    FETCH_USER_INFO,
    FETCH_USER_INFO_COMPLETED,
    FETCH_USER_INFO_FAILED,

    CHANGE_PASSWORD,
    CHANGE_PASSWORD_COMPLETED,
    CHANGE_PASSWORD_FAILED,
    type Actions
} from './actions';

export type State = {
    status: $Keys<typeof STATUS>,
    actions: string[],
};

export default handleActions(({
    [FETCH_USER_INFO]: state => {
        state.status = STATUS.pending;
    },
    [FETCH_USER_INFO_COMPLETED]: (state, {payload}) => {
        state.actions = payload;
        state.status = STATUS.done;
    },
    [FETCH_USER_INFO_FAILED]: state => {
        state.status = STATUS.failed;
    },

    [CHANGE_PASSWORD]: state => {
        state.status = STATUS.pending;
    },
    [CHANGE_PASSWORD_COMPLETED]: (state, {payload}) => {
        state.status = STATUS.done;
    },
    [CHANGE_PASSWORD_FAILED]: state => {
        state.status = STATUS.failed;
    },
}: Handlers<State, Actions>));
