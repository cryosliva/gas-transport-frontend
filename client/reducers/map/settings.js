/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    TOGGLE_MAP_SETTINGS,
    TOGGLE_NODE_LIST,
    type Actions
} from '../../actions/map/settings';

export type State = {
    showMapSettings: boolean,
    showNodeList: boolean,
};

export default handleActions(({
    [TOGGLE_MAP_SETTINGS]: state => {
        state.showMapSettings = !state.showMapSettings;
    },
    [TOGGLE_NODE_LIST]: state => {
        state.showNodeList = !state.showNodeList;
    },
}: Handlers<State, Actions>));
