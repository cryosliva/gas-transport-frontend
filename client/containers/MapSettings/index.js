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
import {NODE_TYPES} from '../../constants/map';

import {
    toggleNodes,
    togglePipes,
    toggleMapSettings,
} from '../../actions/map/settings';
import {
    setFilters,
} from '../../actions/map/filters';
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
    regions,
    checkedRegions,
    onRegionsChange,
    toggleAllTypes,
    toggleAllRegions,
}: MapSettingsProps) => (
    <div className={css.popup}>
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
                {types.length > 0 && (
                    <Checkbox
                        className={css.checkAll}
                        onChange={toggleAllTypes} 
                        checked={checkedTypes.length === types.length}
                    >
                        <b>Выбрать все</b>
                    </Checkbox>
                )}
                {
                    types.map((option, key) => 
                        <Checkbox
                            key={key}
                            value={option}
                            onChange={onTypesChange}
                            checked={checkedTypes.includes(option)}
                        >
                            {NODE_TYPES[option]}
                        </Checkbox>
                    )
                }
            </div>
            <div className={css.filter}>
                <h3 className={css.heading}>Регионы:</h3>
                {regions.length > 0 && (
                    <Checkbox
                        className={css.checkAll}
                        onChange={toggleAllRegions} 
                        checked={checkedRegions.length === regions.length}
                    >
                        <b>Выбрать все</b>
                    </Checkbox>
                )}
                {
                    regions.map((option, key) => 
                        <Checkbox
                            key={key}
                            value={option}
                            onChange={onRegionsChange}
                            checked={checkedRegions.includes(option)}
                        >
                            {option}
                        </Checkbox>
                    )
                }
            </div>
        </div>
        <Button
            onClick={applyFilters}
            className={css.filterButton}
        >
            Применить фильтры
        </Button>
    </div>
);

const mapStateToProps = (state): * => {
    const {settings, filters} = state.map;
    const {years, types, regions} = filters;

    return {
        years,
        types,
        regions,
        showNodes: settings.showNodes,
        showPipes: settings.showPipes,
        checkedYear: filters.checkedYear || String(years[years.length - 1]),
        checkedTypes: filters.checkedTypes || types,
        checkedRegions: filters.checkedRegions || regions,
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
    setFilters,
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStateHandlers(
        ({
            checkedYear,
            checkedTypes,
            checkedRegions,
            types,
            regions,
        }) => ({
            checkedYear,
            checkedTypes,
            checkedRegions,
            types,
            regions,
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
            toggleAllTypes: ({types = [], checkedTypes = []}) => () => ({
                checkedTypes: checkedTypes.length === types.length ? [] : types,
            }),
            onRegionsChange: ({checkedRegions}) => event => {
                const {value} = event.target;
                const updated = checkedRegions.includes(value) ? without(value, checkedRegions) : append(value, checkedRegions);
                
                return {
                    checkedRegions: updated,
                };
            },
            toggleAllRegions: ({regions = [], checkedRegions = []}) => () => ({
                checkedRegions: checkedRegions.length === regions.length ? [] : regions,
            }),
        },
    ),
    withHandlers({
        applyFilters: ({
            checkedYear,
            checkedTypes,
            checkedRegions,
            fetchMapData,
            fetchMapDataCompleted,
            fetchMapDataFailed,
            toggleMapSettings,
            setFilters,
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
                    region: checkedRegions,
                }),
            })
                .then(res => res.json())
                .then(res => {
                    fetchMapDataCompleted(res);
                    setFilters({checkedYear, checkedTypes, checkedRegions});
                })
                .catch(() => fetchMapDataFailed())
        },
    }),
);

export default enhance(MapSettings);
