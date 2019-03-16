/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    TOGGLE_MAP_SETTINGS,
    TOGGLE_NODE_LIST,
    type Actions as MapActions
} from '../../actions/map/settings';

import {
    TOGGLE_NODES,
    TOGGLE_PIPES,
    type Actions as MapSettingsActions
} from './actions';

export type State = {
    showNodes: boolean,
    showPipes: boolean,
    showMapSettings: boolean,
    showNodeList: boolean,
};

type Actions = MapActions & MapSettingsActions;

export default handleActions(({
    [TOGGLE_NODES]: state => {
        state.showNodes = !state.showNodes;
    },
    [TOGGLE_PIPES]: state => {
        state.showPipes = !state.showPipes;
    },
    [TOGGLE_MAP_SETTINGS]: state => {
        if (state.showNodeList) {
            state.showNodeList = false;
        }

        state.showMapSettings = !state.showMapSettings;
    },
    [TOGGLE_NODE_LIST]: state => {
        if (state.showMapSettings) {
            state.showMapSettings = false;
        }

        state.showNodeList = !state.showNodeList;
    },
}: Handlers<State, Actions>));
