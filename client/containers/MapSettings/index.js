/* @flow */

import React from 'react';
import {connect} from 'react-redux';
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
    toggleMapSettings,
} from '../../actions/map/settings';
import {
    fetchMapData,
    fetchMapDataCompleted,
    fetchMapDataFailed,
} from '../../actions/map/data';

import css from './style.css';

type MapSettingsProps = {
    showNodes: boolean,
    toggleNodes: () => void,
    showPipes: boolean,
    togglePipes: () => void,
    years: string[],
    checkedYear: string,
    onYearChange: () => void,
    types: string[],
    checkedTypes: string[],
    onTypesChange: () => void,
    applyFilters: () => void,
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
}: MapSettingsProps) => (
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

const mapStateToProps = (state): MapSettingsProps => {
    const {settings, filters} = state.map;

    return {
        showNodes: settings.showNodes,
        showPipes: settings.showPipes,
        years: filters.years,
        types: filters.types,
        regions: filters.regions,
        snapshots: filters.snapshots,
    };
};

const mapDispatchToProps = {
    toggleNodes, 
    togglePipes,
    toggleMapSettings,
    fetchMapData,
    fetchMapDataCompleted,
    fetchMapDataFailed,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        ({
            types,
            years,
        }) => ({
            checkedYear: String(years[years.length - 1]),
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
            fetchMapDataFailed,
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
                    year: Number(checkedYear),
                    type: checkedTypes,
                    snapshotId: 'test',
                    region: null,
                }),
            })
                .then(res => res.json())
                .then(fetchMapDataCompleted)
                .catch(() => fetchMapDataFailed())
        },
    }),
);

export default enhance(MapSettings);
