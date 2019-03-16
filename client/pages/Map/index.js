/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import {
    Map as LeafletMap,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from 'react-leaflet';
import {compose, lifecycle} from 'recompose';
import L from 'leaflet';

import icon from '../../images/marker.png';

import {Spinner} from '../../components';

import {STATUS} from '../../constants/status';

import MapLayout from '../../containers/MapLayout';
import NodeDescription from '../../containers/NodeDescription';

import {
    fetchMapData,
    fetchMapDataCompleted,
} from './actions';
// import css from './style.css';

type MapProps = {|
    zoom: number,
    showNodes: boolean,
    showPipes: boolean,
    pipes: *[],
    nodes: *[],
    status: *,
|};

const Icon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [20, 20],
    popupAnchor: [0, -28]
});

const HoverIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [26, 26],
    popupAnchor: [0, -28]
});

const getLine = ({title, value}) => `<div><b>${title}</b><span>: ${value}</span></div>`;

const getTubeDescription = ({source, destination, capacity}): string => {
    const sourceLine = getLine({title: 'Источник', value: source});
    const destinationLine = getLine({title: 'Назначение', value: destination});
    const capacityLine = getLine({title: 'Пропускная способность', value: capacity});

    return `<div>${sourceLine}${destinationLine}${capacityLine}</div>`;
};

const Map = ({
    zoom,
    showNodes,
    showPipes,
    pipes,
    nodes,
    status,
}: MapProps) => {
    const lat = 55.751244;
    const lng = 70.618423;
    const position = [lat, lng];

    return (
        <Spinner loading={status === STATUS.pending}>
            <MapLayout />
            <LeafletMap center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    showNodes && nodes && nodes.map(({latitude, longitude, name, type, demand, supply}, key) => (
                        <Marker
                            key={key}
                            title={name}
                            position={[latitude, longitude]}
                            icon={Icon}
                            riseOnHover={true}
                            onMouseover={e => e.target.setIcon(HoverIcon)}
                            onMouseout={e => e.target.setIcon(Icon)}
                        >
                            <Popup>
                                <NodeDescription title={name} type={type} demand={demand} supply={supply} />
                            </Popup>
                        </Marker>
                    ))
                }
                {
                    showPipes && pipes && pipes.map(({capacity, destination, source}, key) => (
                        <Polyline
                            key={key}
                            color="#C4CAD0"
                            weight={2.5}
                            opacity={0.6}
                            positions={[[source.latitude, source.longitude], [destination.latitude, destination.longitude]]}
                            onClick={e => e.target.bindPopup(
                                getTubeDescription({source: source.node, destination: destination.node, capacity})
                            ).openPopup()}
                            onMouseover={e => e.target.setStyle({opacity: 0.8, weight: 4, color: '#B3B8BE'})}
                            onMouseout={e => e.target.setStyle({opacity: 0.6, weight: 2.5, color: '#C4CAD0'})}
                        />
                    ))
                }
            </LeafletMap>
        </Spinner>
    );
};

const mapStateToProps = state => {
    const {data = {}, settings = {}} = state.map;

    return {
        zoom: settings.zoom,
        showNodes: settings.showNodes,
        showPipes: settings.showPipes,
        nodes: data.nodes,
        pipes: data.pipes,
        status: data.status,
    };
};

const mapDispatchToProps = {
    fetchMapData,
    fetchMapDataCompleted,
};

const getInitialMapData = () => {
    const data = fetch('/api/map', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({year: 2019, snapshotId: 'test'}),
    })
        .then(res => res.json())

    return data;
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    lifecycle({
        componentWillMount() {
            this.props.fetchMapData();
            getInitialMapData().then(posts => {
                this.props.fetchMapDataCompleted(posts);
            })
        }
    }),
);

export default enhance(Map);
