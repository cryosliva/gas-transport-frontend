/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {STATUS} from '../../constants/status';

import {
    FETCH_MAP_DATA,
    FETCH_MAP_DATA_COMPLETED,
    FETCH_MAP_DATA_FAILED,
    type Actions
} from './actions';

export type State = {
    status: $Keys<typeof STATUS>,
};

export default handleActions(({
    [FETCH_MAP_DATA]: state => {
        state.status = STATUS.pending;
    },
    [FETCH_MAP_DATA_COMPLETED]: (state, {payload}) => {
        const {nodes, pipes, unrelatedPipes} = payload;

        state.nodes = nodes;
        state.pipes = pipes;
        state.unrelatedPipes = unrelatedPipes;
        state.status = STATUS.done;
    },
    [FETCH_MAP_DATA_FAILED]: state => {
        state.status = STATUS.failed;
    },
}: Handlers<State, Actions>));
