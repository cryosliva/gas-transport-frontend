/* @flow */

import React, {type Node} from 'react';
import cn from 'classnames';

import css from './style.css';

type CheckboxProps = {
    checked: boolean,
    theme?: string,
    className?: string,
    children: Node,
    onChange: () => void,
    value: string,
};

const Checkbox = ({
    checked = false,
    // theme,
    // className,
    children,
    onChange,
    value,
}: CheckboxProps) => (
    <label className={css.root}>
        <input type="checkbox" value={value} checked={checked} onChange={onChange} />
        {/* <div className={css.checkbox} onClick={onClick} value={value}>
            {checked && <span className={css.checkmark} />}
        </div> */}
        <div className={css.title}>{children}</div>
    </label>
);

export default Checkbox;
