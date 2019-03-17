/* @flow */

import React from 'react';
import cn from 'classnames';
import {
    compose,
    withHandlers
} from 'recompose';

import {Button, Input} from '../../components';

import css from './style.css';
import button from '../../components/Button/style.css';

type FileUploadProps = {
    uploadFile: () => void,
};

const FileUpload = ({fileValue = '', uploadFile}: FileUploadProps) => (
    <div className={css.page}>
        <div className={css.content}>
            <div className={css.title}>
                <h2>Данные для карты</h2>
            </div>
            <div className={css.grid}>
                <div className={css.container}>
                    <div className={cn(css.grid, css.centered)}>
                        <div>
                            <label htmlFor="file-upload">
                                <div className={cn(button.root, button.normal)}>Выбрать файл</div>
                            </label>
                            <input
                                id="file-upload" 
                                type="file" 
                                accept=".xlsx" 
                                onChange={uploadFile}
                                className={css.input}
                            />
                        </div>
                        <div>{fileValue || 'Файл не выбран'}</div>
                    </div>
                    <div className={cn(css.grid, css.centered)}>
                        <div className={css.subtitle}>Укажите год</div>
                        <Input
                            type="text"
                            placeholder="2019"
                        />
                    </div>
                    <Button className={css.upload}>Загрузить данные</Button>
                </div>
            </div>
        </div>
    </div>
);

const enhance = withHandlers({
    uploadFile: () => () => {

    },
});

export default FileUpload;
