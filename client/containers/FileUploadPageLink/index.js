/* @flow */

import React from 'react';

import {Link} from '../../components';

import css from './style.css';

const FileUploadPageLink = () => (
    <Link href="/map-data">
        <div className={css.icon} />
    </Link>
);

export default FileUploadPageLink;
