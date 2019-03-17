/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {pathOr} from 'ramda';
import cn from 'classnames';
import {
    compose, 
    withStateHandlers,
    withHandlers,
} from 'recompose';
import {append, without} from 'ramda';

import {
    Button,
    Checkbox,
    RadioButton,
} from '../../components';

import {
    toggleNodes,
    togglePipes,
} from './actions';
import css from './style.css';
import {toggleMapSettings} from '../../actions/map/settings';
import {
    fetchMapData,
    fetchMapDataCompleted,
} from '../../pages/Map/actions';

type MapSettingsProps = {
    showNodes: boolean,
    showPipes: boolean,
};

type EnhancedProps = {
    showSettings: boolean,
    toggleSettings: () => void,
};

const MapSettings = ({
    showNodes,
    toggleNodes,
    showPipes,
    togglePipes,
    years,
    checkedYear,
    onYearChange,
    types,
    checkedTypes,
    onTypesChange,
    applyFilters,
}: MapSettingsProps & EnhancedProps) => (
    <div className={css.options}>
        <div className={css.filter}>
            <h3 className={css.heading}>
                Показать:
            </h3>
            <Checkbox
                value="nodes"
                checked={showNodes}
                onChange={toggleNodes}
            >
                Объекты ЕСГ
            </Checkbox>
            <Checkbox
                value="pipes"
                checked={showPipes} 
                onChange={togglePipes}
            >
                Газопроводы
            </Checkbox>
        </div>
        <div className={css.filter}>
            <h3 className={css.heading}>Год:</h3>
            {
                years.map((option, key) => 
                    <RadioButton
                        key={key}
                        onChange={onYearChange}
                        name="year"
                        value={String(option)} 
                        checked={checkedYear}
                    >
                        {option}
                    </RadioButton>
                )
            }
        </div>
        <div className={css.filter}>
            <h3 className={css.heading}>Тип:</h3>
            {
                types.map((option, key) => 
                    <Checkbox
                        key={key}
                        value={option}
                        onChange={onTypesChange}
                        checked={checkedTypes.includes(option)}
                    >
                        {option}
                    </Checkbox>
                )
            }
        </div>
        <Button
            onClick={applyFilters}
            className={css.filterButton}
        >
            Применить фильтры
        </Button>
    </div>
);

const mapStateToProps = (state: State): MapSettingsProps => {
    const {settings, filters} = state.map;

    return {
        showNodes: settings.showNodes,
        showPipes: settings.showPipes,
        years: filters.years,
        types: filters.types,
    };
};

const mapDispatchToProps = {
    toggleNodes, 
    togglePipes,
    toggleMapSettings,
    fetchMapData,
    fetchMapDataCompleted,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        ({types}) => ({
            checkedYear: '2018',
            checkedTypes: types,
        }),
        {
            onYearChange: () => event => ({checkedYear: event.target.value}),
            onTypesChange: ({checkedTypes}) => event => {
                const {value} = event.target;
                const updated = checkedTypes.includes(value) ? without(value, checkedTypes) : append(value, checkedTypes);
                
                return {
                    checkedTypes: updated,
                };
            },
        },
    ),
    withHandlers({
        applyFilters: ({
            checkedYear,
            checkedTypes,
            fetchMapData,
            fetchMapDataCompleted,
            toggleMapSettings,
        }) => () => {
            fetchMapData();
            toggleMapSettings();

            fetch('/api/map', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: checkedYear,
                    type: checkedTypes,
                    snapshotId: 'test',
                }),
            })
                .then(res => res.json())
                .then(fetchMapDataCompleted)
                // .catch(() => fetchRolesFailed())
        },
    }),
);

export default enhance(MapSettings);
