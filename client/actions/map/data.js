/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const FETCH_MAP_DATA = 'page/map/FETCH_MAP_DATA';
export const FETCH_MAP_DATA_COMPLETED = 'page/map/FETCH_MAP_DATA_COMPLETED';
export const FETCH_MAP_DATA_FAILED = 'page/map/FETCH_MAP_DATA_FAILED';

export const UPLOAD_FILE = 'page/map/UPLOAD_FILE';
export const UPLOAD_FILE_COMPLETED = 'page/map/UPLOAD_FILE_COMPLETED';
export const UPLOAD_FILE_FAILED = 'page/map/UPLOAD_FILE_FAILED';

let actions;

export const {
    [FETCH_MAP_DATA]: fetchMapData,
    [FETCH_MAP_DATA_COMPLETED]: fetchMapDataCompleted,
    [FETCH_MAP_DATA_FAILED]: fetchMapDataFailed,

    [UPLOAD_FILE]: uploadFile,
    [UPLOAD_FILE_COMPLETED]: uploadFileCompleted,
    [UPLOAD_FILE_FAILED]: uploadFileFailed,
} = actions = createActions({
    [FETCH_MAP_DATA]: empty,
    [FETCH_MAP_DATA_COMPLETED]: (x: *) => action(x),
    [FETCH_MAP_DATA_FAILED]: empty,

    [UPLOAD_FILE]: empty,
    [UPLOAD_FILE_COMPLETED]: (x: *) => action(x),
    [UPLOAD_FILE_FAILED]: empty,
});

export type Actions = typeof actions;
