/* @flow */

import React, {Fragment} from 'react';

import Line from '../../containers/Line';
import {NODE_TYPES} from '../../constants/map';

type NodeDescriptionProps = {
    title: string,
    type: string,
    demand: number,
    supply: number,
};

const NodeDescription = ({
    title,
    type,
    demand,
    supply,
}: NodeDescriptionProps) => (
    <Fragment>
        <Line title={title} />
        <Line title="Тип" value={NODE_TYPES[type]} />
        {demand !== 0 && <Line title="Потребление" value={String(demand)} />}
        {supply !== 0 && <Line title="Производство" value={String(supply)} />}
    </Fragment>
);

export default NodeDescription;
