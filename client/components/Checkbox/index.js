/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type CheckboxProps = {
    checked: boolean,
    theme: string,
    className: string,
    children: Node,
    onClick: () => void,
};

const Checkbox = ({
    checked = false,
    theme,
    className,
    children,
    onClick,
    ...props
}: CheckboxProps) => (
    <label className={css.root}>
        <div className={css.checkbox} onClick={onClick}>
            {checked && <span className={css.checkmark} />}
        </div>
        <div className={css.title}>{children}</div>
    </label>
);

export default Checkbox;
