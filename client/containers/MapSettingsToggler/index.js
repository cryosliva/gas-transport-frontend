/* @flow */

import React from 'react';
import {connect} from 'react-redux';

import {
    toggleMapSettings,
} from '../../actions/map/settings';

import css from './style.css';

type MapSettingsTogglerProps = {
    toggleMapSettings: () => void,
};

const MapSettingsToggler = ({
    toggleMapSettings,
}: MapSettingsTogglerProps) => (
    <div className={css.icon} onClick={toggleMapSettings} />
);

const mapDispatchToProps = {
    toggleMapSettings,
};

const enhance = connect(null, mapDispatchToProps);

export default enhance(MapSettingsToggler);
