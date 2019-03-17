/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    TOGGLE_NODES,
    TOGGLE_PIPES,
    TOGGLE_MAP_SETTINGS,
    TOGGLE_NODE_LIST,
    type Actions
} from '../../actions/map/settings';

export type State = {
    showNodes: boolean,
    showPipes: boolean,
    showMapSettings: boolean,
    showNodeList: boolean,
};

export default handleActions(({
    [TOGGLE_NODES]: state => {
        state.showNodes = !state.showNodes;
    },
    [TOGGLE_PIPES]: state => {
        state.showPipes = !state.showPipes;
    },
    [TOGGLE_MAP_SETTINGS]: state => {
        state.showMapSettings = !state.showMapSettings;
    },
    [TOGGLE_NODE_LIST]: state => {
        state.showNodeList = !state.showNodeList;
    },
}: Handlers<State, Actions>));
