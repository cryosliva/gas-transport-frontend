/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const TOGGLE_NODES = 'page/map/TOGGLE_NODES';
export const TOGGLE_PIPES = 'page/map/TOGGLE_PIPES';

let actions;

export const {
    [TOGGLE_NODES]: toggleNodes,
    [TOGGLE_PIPES]: togglePipes,
} = actions = createActions({
    [TOGGLE_NODES]: empty,
    [TOGGLE_PIPES]: empty,
});

export type Actions = typeof actions;
