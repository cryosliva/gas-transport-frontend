/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    TOGGLE_NODES,
    TOGGLE_TUBES,
    type Actions
} from './actions';

export type State = {
    showNodes: boolean,
    showTubes: boolean,
};

export default handleActions(({
    [TOGGLE_NODES]: state => {
        state.map.settings.showNodes = !state.map.settings.showNodes;
    },
    [TOGGLE_TUBES]: state => {
        state.map.settings.showTubes = !state.map.settings.showTubes;
    },
}: Handlers<State, Actions>));
