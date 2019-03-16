/* @flow */

import React, {type Node} from 'react';
import {PulseLoader} from 'react-spinners';

import css from './style.css';

type SpinnerProps = {
    children: Node,
    loading: boolean,
};

const Spinner = ({children, loading}: SpinnerProps) => (
    <div>
        <div className={css.pendable}>
            <PulseLoader loading={loading} color="#36D7B7" />
        </div>
        <div className={loading && css.loading || undefined}>
            {children}
        </div>
    </div>
);

export default Spinner;
