/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {STATUS} from '../../constants/status';

import {
    GET_ROLES,
    GET_ROLES_COMPLETED,
    GET_ROLES_FAILED,
    type Actions
} from './actions';

export type State = {
    status: $Keys<typeof STATUS>,
};

export default handleActions(({
    [GET_ROLES]: state => {
        state.status = STATUS.pending;
    },
    [GET_ROLES_COMPLETED]: state => {
        state.status = STATUS.done;
    },
    [GET_ROLES_FAILED]: state => {
        state.status = STATUS.failed;
    },
}: Handlers<State, Actions>));
