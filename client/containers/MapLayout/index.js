/* @flow */

import React from 'react';
import {connect} from 'react-redux';

import MapSettingsToggler from '../MapSettingsToggler';
import NodeListToggler from '../NodeListToggler';
import MapSettings from '../MapSettings';
import NodeList from '../NodeList';

import css from './style.css';

type MapLayoutProps = {
    showMapSettings: boolean,
    showNodeList: boolean,
};

const MapLayout = ({
    showMapSettings,
    showNodeList,
}: MapLayoutProps) => (
    <div className={css.layout}>
        <div className={css.content}>
            {
                showMapSettings && <MapSettings />
            }
            {
                showNodeList && <NodeList />
            }
        </div>
        <div className={css.settings}>
            <MapSettingsToggler />
            <NodeListToggler />
        </div>
    </div>
);

const mapStateToProps = state => {
    const {settings} = state.map;

    return {
        showMapSettings: settings.showMapSettings,
        showNodeList: settings.showNodeList,
    };
};

const enhance = connect(mapStateToProps);

export default enhance(MapLayout);
