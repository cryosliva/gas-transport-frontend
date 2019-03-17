/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const FETCH_MAP_DATA = 'page/map/FETCH_MAP_DATA';
export const FETCH_MAP_DATA_COMPLETED = 'page/map/FETCH_MAP_DATA_COMPLETED';
export const FETCH_MAP_DATA_FAILED = 'page/map/FETCH_MAP_DATA_FAILED';

let actions;

export const {
    [FETCH_MAP_DATA]: fetchMapData,
    [FETCH_MAP_DATA_COMPLETED]: fetchMapDataCompleted,
    [FETCH_MAP_DATA_FAILED]: fetchMapDataFailed,
} = actions = createActions({
    [FETCH_MAP_DATA]: empty,
    [FETCH_MAP_DATA_COMPLETED]: (x: *) => action(x),
    [FETCH_MAP_DATA_FAILED]: empty,
});

export type Actions = typeof actions;
