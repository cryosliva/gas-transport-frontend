/* @flow */

import React from 'react';
import {Map as LeafletMap, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import L from 'leaflet';

import icon from '../../images/marker.png';

import {nodes} from './nodes.json';
import css from './style.css';
//
// type State = {
//   lat: number,
//   lng: number,
//   zoom: number,
// };

const multiPolyline = [
  [[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]],
  [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]],
]
const myIcon = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: [16, 16],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

const prepareNodes = nodes =>
    nodes.map(({latitude, longitude, node}) =>
        ({node, latitude: parseInt(latitude), longitude: parseInt(longitude)}));

const Map = () => {
    const lat = 65.751244;
    const lng = 85.618423;
    const zoom = 4;
    const position = [lat, lng];
    const coordinates = prepareNodes(nodes);
    const showMarkers = false;

    return (
        <div>
            <LeafletMap center={position} zoom={zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                  showMarkers && coordinates.map(({latitude, longitude, node}) => (
                      <Marker position={[latitude, longitude]} icon={myIcon}>
                        <Popup>
                          {node}
                        </Popup>
                      </Marker>
                  ))
              }
              <Polyline color="lime" positions={multiPolyline} />
            </LeafletMap>
        </div>
    );
};

export default Map;
