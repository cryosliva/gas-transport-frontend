/* @flow */

import React from 'react';

import css from './style.css';

type LineProps = {
    title: string,
    value: string,
};

const Line = ({title, value}: LineProps) => (
    <div>
        <span className={css.title}>{title}</span>
        {value && <span>: {value}</span>}
    </div>
);

export default Line;
