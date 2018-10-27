/* @flow */

import React from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import css from './style.css';

const SignIn = () => (
    <div className={css.root}>
        <Input placeholder="example@hse.ru" />
        <Input placeholder="********" />
        <Button theme="active">ВОЙТИ</Button>
    </div>
);

export default SignIn;
