/* @flow */

import React, {type Node} from 'react';

import css from './style.css';

type BlockProps = {
    children: Node,
};

const Block = ({children}: BlockProps) => (
    <div className={css.block}>
        {children}
    </div>
);

export default Block;