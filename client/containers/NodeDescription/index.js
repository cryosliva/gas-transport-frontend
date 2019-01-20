/* @flow */

import React, {Fragment} from 'react';

import Line from '../../containers/Line';

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
        <Line title="Тип" value={type} />
        {demand != 0 && <Line title="Потребление" value={demand} />}
        {supply != 0 && <Line title="Производство" value={supply} />}
    </Fragment>
);

export default NodeDescription;
