/* @flow */

import React from 'react';

import {Link} from '../../components';

import css from './style.css';

const AdminPageLink = () => (
    <Link href="/manage">
        <div className={css.icon} />
    </Link>
);

export default AdminPageLink;
