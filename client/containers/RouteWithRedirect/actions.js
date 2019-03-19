/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const FETCH_USER_INFO = 'app/user/FETCH_USER_INFO';
export const FETCH_USER_INFO_COMPLETED = 'app/user/FETCH_USER_INFO_COMPLETED';
export const FETCH_USER_INFO_FAILED = 'app/user/FETCH_USER_INFO_FAILED';

export const CHANGE_PASSWORD = 'page/userSettings/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_COMPLETED = 'page/userSettings/CHANGE_PASSWORD_COMPLETED';
export const CHANGE_PASSWORD_FAILED = 'page/userSettings/CHANGE_PASSWORD_FAILED';

let actions;

export const {
    [FETCH_USER_INFO]: fetchUserInfo,
    [FETCH_USER_INFO_COMPLETED]: fetchUserInfoCompleted,
    [FETCH_USER_INFO_FAILED]: fetchUserInfoFailed,

    [CHANGE_PASSWORD]: changePassword,
    [CHANGE_PASSWORD_COMPLETED]: changePasswordCompleted,
    [CHANGE_PASSWORD_FAILED]: changePasswordFailed,
} = actions = createActions({
    [FETCH_USER_INFO]: empty,
    [FETCH_USER_INFO_COMPLETED]: (x: *) => action(x),
    [FETCH_USER_INFO_FAILED]: empty,

    [CHANGE_PASSWORD]: empty,
    [CHANGE_PASSWORD_COMPLETED]: (x: *) => action(x),
    [CHANGE_PASSWORD_FAILED]: empty,
});

export type Actions = typeof actions;
