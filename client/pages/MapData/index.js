/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {
    compose,
    withStateHandlers,
    withHandlers,
} from 'recompose';

import {Button, Input, Spinner} from '../../components';

import css from './style.css';
import button from '../../components/Button/style.css';

import {
    uploadFile,
    uploadFileCompleted,
    uploadFileFailed,
} from '../../actions/map/data';

type FileUploadProps = {
    filename: string,
    onFileChange: () => void,
    onYearChange: () => void,
    uploadFile: () => void,
};

const FileUpload = ({
    filename, 
    onFileChange, 
    onYearChange,
    uploadFile,
    status,
}: FileUploadProps) => (
    <div className={css.page}>
        <div className={css.content}>
            <div className={css.title}>
                <h2>Данные для карты</h2>
            </div>
            <div className={css.grid}>
                <Spinner loading={status === 'pending'}>
                    <div className={css.container}>
                        <div className={cn(css.grid, css.centered, css.line)}>
                            <div className={css.subtitle}>
                                <div className={css.filename}>
                                    {filename || 'Файл не выбран'}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="file-upload">
                                    <div className={cn(button.root, button.normal)}>Выбрать файл</div>
                                </label>
                                <input
                                    id="file-upload" 
                                    type="file" 
                                    accept=".xlsx" 
                                    onChange={onFileChange}
                                    className={css.input}
                                />
                            </div>
                        </div>
                        <div className={cn(css.grid, css.centered, css.line)}>
                            <div className={css.subtitle}>Укажите год</div>
                            <Input
                                type="text"
                                placeholder="2019"
                                onChange={onYearChange}
                            />
                        </div>
                        <div className={css.grid}>
                            <div />
                            <Button
                                className={css.upload}
                                onClick={uploadFile}
                            >
                                Загрузить данные
                            </Button>
                        </div>
                    </div>
                </Spinner>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    const {map} = state;

    return {
        status: map.data.status,
    };
}

const mapDispatchToProps = {
    uploadFile,
    uploadFileCompleted,
    uploadFileFailed,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        () => ({
            filename: '',
            file: undefined,
            year: '',
        }),
        {
            onFileChange: () => event => ({filename: event.target.value, file: event.target.files[0]}),
            onYearChange: () => event => ({year: event.target.value}),
        },
    ),
    withHandlers({
        uploadFile: ({
            file,
            year,
            uploadFile,
            uploadFileCompleted,
            uploadFileFailed,
        }) => () => {
            // const form = new FormData(document.getElementById('file-upload'));
            uploadFile();

            let data = new FormData();
            data.append('file', file);
            data.append('year', year);
            data.append('snapshotId', 'test');

            fetch('/api/data/upload', {
                method: 'POST',
                body: data,
            })

            //     .then(res => console.log(res))
            //     .catch(error => console.log(error))
            // fetch('https://gtv-backend.herokuapp.com/data/upload', {
            //     method: 'POST',
            //     // headers: {
            //     //     'accept': '*/*',
            //         // 'Authorization': `Basic ${auth}`,
            //     // "Access-Control-Allow-Origin": "*",
            //     //     // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            //     // // 'Content-Type': headers['content-type'],
            //     // },
            //     'mode': 'no-cors',
            //     body: data,
            // })
            //     .then(res => console.log(res))
            //     .catch(error => console.log('error', error))
            // fetch('/api/data/upload', {
            //     method: 'POST',
            //     body: data,
            // })
            // .then(uploadFileCompleted)
            // .catch(uploadFileFailed)
        },
    }),
);


export default enhance(FileUpload);
