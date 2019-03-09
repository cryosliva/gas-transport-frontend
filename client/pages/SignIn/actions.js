/* @flow */

import {createActions, action, empty} from 'typed-actions';

export const GET_ROLES = 'page/signIn/GET_ROLES';
export const GET_ROLES_COMPLETED = 'page/signIn/GET_ROLES_COMPLETED';
export const GET_ROLES_FAILED = 'page/signIn/GET_ROLES_FAILED';

let actions;

export const {
    [GET_ROLES]: getRoles,
    [GET_ROLES_COMPLETED]: getRolesCompleted,
    [GET_ROLES_FAILED]: getRolesFailed,
} = actions = createActions({
    [GET_ROLES]: empty,
    [GET_ROLES_COMPLETED]: empty,
    [GET_ROLES_FAILED]: empty,
});

export type Actions = typeof actions;
