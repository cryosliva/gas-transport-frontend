/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    TOGGLE_NODES,
    TOGGLE_TUBES,
    type Actions
} from './actions';

export type State = {
    settings: {
        showNodes: boolean,
        showTubes: boolean,
    },
};

export default handleActions(({
    [TOGGLE_NODES]: state => {
        state.settings.showNodes = !state.settings.showNodes;
    },
    [TOGGLE_TUBES]: state => {
        state.settings.showTubes = !state.settings.showTubes;
    },
}: Handlers<State, Actions>));
