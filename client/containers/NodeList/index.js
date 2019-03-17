/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {compose, withStateHandlers} from 'recompose';
import {without, append} from 'ramda';

import {Link} from '../../components';
import {NODE_TYPES} from '../../constants/map';

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
            nodes.map(({name, type, demand, supply}, key) =>
                <div key={key} className={css.node}>
                    <Link onClick={toggleMoreInfo}>
                        {
                            moreInfoNodes.includes(name) ? <b>{name}</b> : name
                        }
                    </Link>
                    {
                        moreInfoNodes.includes(name) && (
                            <div className={css.moreInfo}>
                                <div><b>Тип:</b> {NODE_TYPES[type]}</div>
                                <div><b>Потребление:</b> {demand}</div>
                                <div><b>Производство:</b> {supply}</div>
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
                const {textContent} = event.target;
                const updated = moreInfoNodes.includes(textContent)
                    ? without(textContent, moreInfoNodes) 
                    : append(textContent, moreInfoNodes);

                return {
                    moreInfoNodes: updated,
                };
            },
        },
    ),
);

export default enhance(NodeList);
