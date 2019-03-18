/* @flow */

import {handleActions, type Handlers} from 'typed-actions/immer';

import {
    FETCH_MAP_FILTERS_COMPLETED,
    SET_FILTERS,
    type Actions
} from '../../actions/map/filters';

export type State = {
    years: string[],
    types: string[],
    regions: string[],
    snapshots: string[],
};

export default handleActions(({
    [FETCH_MAP_FILTERS_COMPLETED]: (state, {payload}) => {
        const {years, types, regions, snapshots} = payload;

        state.years = years;
        state.types = types;
        state.regions = regions.filter(Boolean);
        state.snapshots = snapshots;
    },
    [SET_FILTERS]: (state, {payload}) => {
        const {checkedYear, checkedTypes, checkedRegions} = payload;

        state.checkedYear = checkedYear;
        state.checkedTypes = checkedTypes;
        state.checkedRegions = checkedRegions;
    },
}: Handlers<State, Actions>));
