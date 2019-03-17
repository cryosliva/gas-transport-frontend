/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const FETCH_USER_INFO = 'app/user/FETCH_USER_INFO';
export const FETCH_USER_INFO_COMPLETED = 'app/user/FETCH_USER_INFO_COMPLETED';
export const FETCH_USER_INFO_FAILED = 'app/user/FETCH_USER_INFO_FAILED';

let actions;

export const {
    [FETCH_USER_INFO]: fetchUserInfo,
    [FETCH_USER_INFO_COMPLETED]: fetchUserInfoCompleted,
    [FETCH_USER_INFO_FAILED]: fetchUserInfoFailed,
} = actions = createActions({
    [FETCH_USER_INFO]: empty,
    [FETCH_USER_INFO_COMPLETED]: (x: *) => action(x),
    [FETCH_USER_INFO_FAILED]: empty,
});

export type Actions = typeof actions;
