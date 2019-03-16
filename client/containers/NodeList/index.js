/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {compose, withStateHandlers} from 'recompose';
import {without, append} from 'ramda';

import {Link} from '../../components';
import NodeDescription from '../NodeDescription';

import css from './style.css';

type NodeListProps = {
    nodes: *[],
    toggleMoreInfo: () => void,
};

const NodeList = ({
    nodes,
    toggleMoreInfo,
    moreInfoNodes,
}: NodeListProps) => (
    <div className={css.options}>
        {
            nodes.map(({latitude, longitude, name, type, demand, supply}, key) =>
                <div key={key} className={css.node}>
                    <Link onClick={toggleMoreInfo}>
                        {name}
                    </Link>
                    {
                        moreInfoNodes.includes(name) && (
                            <div className={css.moreInfo}>
                                <b>Тип:</b> {type}
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>

);

const mapStateToProps = (state): NodeListProps => {
    const {data = {}} = state.map;

    return {
        nodes: (data.nodes || []).sort((a, b) => a.name.localeCompare(b.name)),
    };
};

const enhance = compose(
    connect(mapStateToProps),
    withStateHandlers(
        () => ({moreInfoNodes: []}),
        {
            toggleMoreInfo: ({moreInfoNodes}) => event => {
                const {text} = event.target;
                const updated = moreInfoNodes.includes(text) ? without(text, moreInfoNodes) : append(text, moreInfoNodes);
                console.log(text)
                return {
                    moreInfoNodes: updated,
                };
            },
        },
    ),
);

export default enhance(NodeList);
