/* @flow */

import {createActions} from 'typed-actions';
import {action} from 'typed-actions/actions';

export const FETCH_MAP_FILTERS_COMPLETED = 'page/map/FETCH_MAP_FILTERS_COMPLETED';

let actions;

export const {
    [FETCH_MAP_FILTERS_COMPLETED]: fetchMapFiltersCompleted,
} = actions = createActions({
    [FETCH_MAP_FILTERS_COMPLETED]: (x: *) => action(x),
});

export type Actions = typeof actions;
