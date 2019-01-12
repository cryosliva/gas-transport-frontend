/* @flow */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Map as LeafletMap, TileLayer, Marker, Popup, Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet';

import icon from '../../images/marker.png';

import {tubes} from '../../files/map/tubes.json';
import {nodes} from '../../files/map/nodes_demands.json';

import MapSettings from '../../containers/MapSettings';
import NodeDescription from '../../containers/NodeDescription';

import css from './style.css';

type MapProps = {
    zoom: number,
    showNodes: boolean,
    showTubes: boolean,
};

const myIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [16, 16],
    popupAnchor: [0, -28]
});

const getLine = ({title, value}) => `<div><b>${title}</b><span>: ${value}</span></div>`;

const getTubeDescription = ({source, destination, capacity}): string => {
    const sourceLine = getLine({title: 'Источник', value: source});
    const destinationLine = getLine({title: 'Назначение', value: destination});
    const capacityLine = getLine({title: 'Пропускная способность', value: capacity});

    return `<div>${sourceLine}${destinationLine}${capacityLine}</div>`;
};

const Map = ({zoom, showNodes, showTubes}: MapProps) => {
    const lat = 55.751244;
    const lng = 70.618423;
    const position = [lat, lng];

    return (
        <div>
            <MapSettings />
            <LeafletMap center={position} zoom={zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              {
                  showNodes && nodes.map(({latitude, longitude, node, type, demand, supply}) => (
                      <Marker position={[latitude, longitude]} icon={myIcon} riseOnHover={true}>
                        <Popup>
                            <NodeDescription title={node} type={type} demand={demand} supply={supply} />
                        </Popup>
                      </Marker>
                  ))
              }
              {
                  showTubes && tubes.map(({capacity, destination, source}, key) => (
                        <Polyline
                            color="#C4CAD0"
                            weight={3}
                            opacity={0.6}
                            positions={[[source.latitude, source.longitude], [destination.latitude, destination.longitude]]}
                            onClick={e => e.target.bindPopup(
                                getTubeDescription({source: source.node, destination: destination.node, capacity})
                            ).openPopup()}
                            onMouseover={e => e.target.setStyle({opacity: 1.0, weight: 5, color: '#9B9FB5'})}
                            onMouseout={e => e.target.setStyle({opacity: 0.6, weight: 3, color: '#C4CAD0'})}
                        />
                ))
              }
            </LeafletMap>
        </div>
    );
};

const mapStateToProps = state => ({
    zoom: state.map.settings.zoom,
    showNodes: state.map.settings.showNodes,
    showTubes: state.map.settings.showTubes,
});

const enhance = connect(mapStateToProps);

export default enhance(Map);
