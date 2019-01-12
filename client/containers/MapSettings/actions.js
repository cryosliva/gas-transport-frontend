/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const TOGGLE_NODES = 'page/map/TOGGLE_NODES';
export const TOGGLE_TUBES = 'page/map/TOGGLE_TUBES';

let actions;

export const {
    [TOGGLE_NODES]: toggleNodes,
    [TOGGLE_TUBES]: toggleTubes,
} = actions = createActions({
    [TOGGLE_NODES]: empty,
    [TOGGLE_TUBES]: empty,
});

export type Actions = typeof actions;
