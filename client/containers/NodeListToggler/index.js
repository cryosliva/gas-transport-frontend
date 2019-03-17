/* @flow */

import React from 'react';
import {connect} from 'react-redux';

import {
    toggleNodeList,
} from '../../actions/map/settings';

import css from './style.css';

type NodeListTogglerProps = {
    toggleNodeList: () => void,
};

const NodeListToggler = ({
    toggleNodeList,
}: NodeListTogglerProps) => (
    <div className={css.icon} onClick={toggleNodeList} />
);

const mapDispatchToProps = {
    toggleNodeList,
};

const enhance = connect(null, mapDispatchToProps);

export default enhance(NodeListToggler);
