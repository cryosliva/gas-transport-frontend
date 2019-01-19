/* @flow */

import React from 'react';
import {Map as LeafletMap, TileLayer, Marker, Popup, Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet';

import icon from '../../images/marker.png';

import {nodes} from '../../files/map/nodes.json';
import {tubes} from '../../files/map/tubes.json';

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

const Map = () => {
    const lat = 65.751244;
    const lng = 85.618423;
    const zoom = 4;
    const position = [lat, lng];
    const showMarkers = false;
    const showTubes = true;

    return (
        <div>
            <LeafletMap center={position} zoom={zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                  showMarkers && nodes.map(({latitude, longitude, node}) => (
                      <Marker position={[latitude, longitude]} icon={myIcon}>
                        <Popup>
                          {node}
                        </Popup>
                      </Marker>
                  ))
              }
              {
                  showTubes && tubes.map(({capacity, destination, source}) => (
                      <Polyline
                        color="blue"
                        positions={[[source.latitude, source.longitude], [destination.latitude, destination.longitude]]}
                        onClick={() => alert('clicked ' + polyline.id)}
                    />
                  ))
              }
            </LeafletMap>
        </div>
    );
};

export default Map;
