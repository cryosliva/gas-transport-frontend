/* @flow */

import React from 'react';

import {Link} from '../../components';

import css from './style.css';

const UserSettingsLink = () => (
    <Link href="/user-settings">
        <div className={css.icon} />
    </Link>
);

export default UserSettingsLink;
