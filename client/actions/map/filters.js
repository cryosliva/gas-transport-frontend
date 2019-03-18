/* @flow */

import {createActions} from 'typed-actions';
import {action} from 'typed-actions/actions';

export const FETCH_MAP_FILTERS_COMPLETED = 'page/map/FETCH_MAP_FILTERS_COMPLETED';
export const SET_FILTERS = 'page/map/SET_FILTERS';

let actions;

export const {
    [FETCH_MAP_FILTERS_COMPLETED]: fetchMapFiltersCompleted,
    [SET_FILTERS]: setFilters,
} = actions = createActions({
    [FETCH_MAP_FILTERS_COMPLETED]: (x: *) => action(x),
    [SET_FILTERS]: (x: *) => action(x),
});

export type Actions = typeof actions;
