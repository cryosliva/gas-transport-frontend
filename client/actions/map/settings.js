/* @flow */

import {createActions, empty} from 'typed-actions';

export const TOGGLE_MAP_SETTINGS = 'page/map/TOGGLE_MAP_SETTINGS';
export const TOGGLE_NODE_LIST = 'page/map/TOGGLE_NODE_LIST';

let actions;

export const {
    [TOGGLE_MAP_SETTINGS]: toggleMapSettings,
    [TOGGLE_NODE_LIST]: toggleNodeList,
} = actions = createActions({
    [TOGGLE_MAP_SETTINGS]: empty,
    [TOGGLE_NODE_LIST]: empty,
});

export type Actions = typeof actions;
