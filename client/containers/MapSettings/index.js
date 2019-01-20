/* @flow */

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pathOr} from 'ramda';
import cn from 'classnames';
import {compose, withStateHandlers} from 'recompose';

import Checkbox from '../../components/Checkbox';
import icon from '../../images/map-settings.png';

import {toggleNodes, toggleTubes} from './actions';
import css from './style.css';

type MapSettingsProps = {
    showNodes: boolean,
    showTubes: boolean,
};

type EnhancedProps = {
    showSettings: boolean,
    toggleSettings: () => void,
};

const MapSettings = ({
    showNodes,
    onNodesToggle,
    showTubes,
    onTubesToggle,
    toggleSettings,
    showSettings,
}: MapSettingsProps & EnhancedProps) => (
    <div>
        <div className={cn(css.settings, css.icon)} onClick={toggleSettings} />
        {
            showSettings && (
                <div className={cn(css.settings, css.root)}>
                    <Checkbox checked={showNodes} onClick={onNodesToggle}>Объекты ЕСГ</Checkbox>
                    <Checkbox checked={showTubes} onClick={onTubesToggle}>Газопроводы</Checkbox>
                </div>
            )
        }
    </div>
);

const mapStateToProps = (state: State): MapSettingsProps => ({
    showNodes: pathOr(false, ['map', 'settings', 'showNodes'], state),
    showTubes: pathOr(false, ['map', 'settings', 'showTubes'], state),
});

const mapDispatchToProps = {onNodesToggle: toggleNodes, onTubesToggle: toggleTubes};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        () => ({showSettings: false}),
        {
            toggleSettings: ({showSettings}) => () => ({showSettings: !showSettings}),
        },
    ),
);

export default enhance(MapSettings);
