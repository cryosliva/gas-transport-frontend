/* @flow */

import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {
    Map as LeafletMap,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from 'react-leaflet';
import {compose, lifecycle} from 'recompose';
import {pluck} from 'ramda';
import L from 'leaflet';

import icon from '../../images/marker.png';

import {Spinner} from '../../components';

import {STATUS} from '../../constants/status';

import MapLayout from '../../containers/MapLayout';
import NodeDescription from '../../containers/NodeDescription';
import {fetchMapFiltersCompleted} from '../../actions/map/filters';

import {
    fetchMapData,
    fetchMapDataCompleted,
} from '../../actions/map/data';

type MapProps = {|
    zoom: number,
    showNodes: boolean,
    showPipes: boolean,
    pipes: *[],
    unrelatedPipes: *[],
    nodes: *[],
    status: *,
|};

const Icon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [20, 20],
    popupAnchor: [0, -28],
});

const HoverIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [26, 26],
    popupAnchor: [0, -28],
});

const getLine = ({title, value}) => `<div><b>${title}</b><span>: ${value}</span></div>`;

const getTubeDescription = ({source, destination, capacity}): string => {
    const sourceLine = getLine({title: 'Источник', value: source});
    const destinationLine = getLine({title: 'Назначение', value: destination});
    const capacityLine = getLine({title: 'Пропускная способность', value: capacity});

    return `<div>${sourceLine}${destinationLine}${capacityLine}</div>`;
};

const NodeMarker = ({
    name,
    latitude,
    longitude,
    type,
    demand,
    supply,
    opacity,
}: *) => (
    <Marker
        title={name}
        opacity={opacity || 1}
        position={[latitude, longitude]}
        icon={Icon}
        riseOnHover
        onMouseover={e => e.target.setIcon(HoverIcon)}
        onMouseout={e => e.target.setIcon(Icon)}
    >
        <Popup>
            <NodeDescription title={name} type={type} demand={demand} supply={supply} />
        </Popup>
    </Marker>
);

const Pipe = ({
    source,
    destination,
    capacity,
    opacity,
}: *) => (
    <Polyline
        color="#C4CAD0"
        weight={2.5}
        opacity={opacity || 0.6}
        positions={[[source.latitude, source.longitude], [destination.latitude, destination.longitude]]}
        onClick={e => e.target.bindPopup(getTubeDescription({source: source.name, destination: destination.name, capacity}),).openPopup()}
        onMouseover={e => e.target.setStyle({opacity: 0.8, weight: 4, color: '#B3B8BE'})}
        onMouseout={e => e.target.setStyle({opacity: opacity || 0.6, weight: 2.5, color: '#C4CAD0'})}
    />
);

const Map = ({
    zoom,
    showNodes,
    showPipes,
    pipes,
    unrelatedPipes,
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
                    showNodes && nodes && nodes.map((node, key) => (
                        <NodeMarker key={key} {...node} />
                    ))
                }
                {
                    (showNodes || showPipes) && unrelatedPipes && unrelatedPipes.map(({capacity, destination, source}, key) => (
                        <Fragment key={key}>
                            {
                                showNodes && !pluck('name', nodes).includes(destination.name) && (
                                    <NodeMarker {...destination} opacity={0.5} />
                                )
                            }
                            {
                                showNodes && !pluck('name', nodes).includes(source.name) && (
                                    <NodeMarker {...source} opacity={0.5} />
                                )
                            }
                            {
                                showPipes && (
                                    <Pipe
                                        capacity={capacity}
                                        destination={destination}
                                        source={source}
                                        opacity={0.5}
                                    />
                                )
                            }
                        </Fragment>
                    ))
                }
                {
                }
                {
                    showPipes && pipes && pipes.map((pipe, key) => (
                        <Pipe key={key} {...pipe} />
                    ))
                }
            </LeafletMap>
        </Spinner>
    );
};

const mapStateToProps = (state) => {
    const {data = {}, settings = {}} = state.map;

    return {
        zoom: settings.zoom,
        showNodes: settings.showNodes,
        showPipes: settings.showPipes,
        nodes: data.nodes,
        pipes: data.pipes,
        unrelatedPipes: data.unrelatedPipes,
        status: data.status,
    };
};

const mapDispatchToProps = {
    fetchMapData,
    fetchMapDataCompleted,
    fetchMapFiltersCompleted,
};

const getInitialMapData = () => {
    const data = fetch('/api/map', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({year: 2019, snapshotId: 'test'}),
    })
        .then(res => res.json());

    return data;
};

const getMapFilters = () => {
    const data = fetch('/api/node/filter', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json());

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
            getInitialMapData().then((posts) => {
                this.props.fetchMapDataCompleted(posts);
            });
            getMapFilters().then(filters => {
                this.props.fetchMapFiltersCompleted(filters);
            })
        },
    }),
);

export default enhance(Map);
