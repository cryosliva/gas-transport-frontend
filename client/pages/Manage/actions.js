/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const FETCH_USERS = 'page/manage/FETCH_USERS';
export const FETCH_USERS_COMPLETED = 'page/manage/FETCH_USERS_COMPLETED';
export const FETCH_USERS_FAILED = 'page/manage/FETCH_USERS_FAILED';

export const REGISTER_USER = 'page/manage/REGISTER_USER';
export const REGISTER_USER_COMPLETED = 'page/manage/REGISTER_USER_COMPLETED';
export const REGISTER_USER_FAILED = 'page/manage/REGISTER_USER_FAILED';

export const DELETE_USER = 'page/manage/DELETE_USER';
export const DELETE_USER_COMPLETED = 'page/manage/DELETE_USER_COMPLETED';
export const DELETE_USER_FAILED = 'page/manage/DELETE_USER_FAILED';

export const MAKE_ADMIN = 'page/manage/MAKE_ADMIN';
export const MAKE_ADMIN_COMPLETED = 'page/manage/MAKE_ADMIN_COMPLETED';
export const MAKE_ADMIN_FAILED = 'page/manage/MAKE_ADMIN_FAILED';

let actions;

export const {
    [FETCH_USERS]: fetchUsers,
    [FETCH_USERS_COMPLETED]: fetchUsersCompleted,
    [FETCH_USERS_FAILED]: fetchUsersFailed,

    [REGISTER_USER]: registerUser,
    [REGISTER_USER_COMPLETED]: registerUserCompleted,
    [REGISTER_USER_FAILED]: registerUserFailed,

    [DELETE_USER]: deleteUser,
    [DELETE_USER_COMPLETED]: deleteUserCompleted,
    [DELETE_USER_FAILED]: deleteUserFailed,

    [MAKE_ADMIN]: makeAdmin,
    [MAKE_ADMIN_COMPLETED]: makeAdminCompleted,
    [MAKE_ADMIN_FAILED]: makeAdminFailed,
} = actions = createActions({
    [FETCH_USERS]: empty,
    [FETCH_USERS_COMPLETED]: (x: *) => action(x),
    [FETCH_USERS_FAILED]: empty,

    [REGISTER_USER]: empty,
    [REGISTER_USER_COMPLETED]: (x: *) => action(x),
    [REGISTER_USER_FAILED]: empty,

    [DELETE_USER]: empty,
    [DELETE_USER_COMPLETED]: (x: *) => action(x),
    [DELETE_USER_FAILED]: empty,

    [MAKE_ADMIN]: empty,
    [MAKE_ADMIN_COMPLETED]: (x: *) => action(x),
    [MAKE_ADMIN_FAILED]: empty,
});

export type Actions = typeof actions;
