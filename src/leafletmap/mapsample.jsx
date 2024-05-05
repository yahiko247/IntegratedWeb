import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import '../styles/tailwind.css'
import "leaflet/dist/leaflet.css";

function Map() {
  //marker

  const markers = [
    {
      geocode: [8.290232, 124.71242],
      popUp: "zone2"
    },

    {
      geocode: [8.27333, 124.723191],
      popUp: "zone 5"
    },

    {
      geocode: [8.268446, 124.717999],
      popUp: "zone 3"
    },
    {
      geocode: [8.290062, 124.714823],
      popUp: "zone 1"
    },
    {
      geocode: [8.281653, 124.707699],
      popUp: "zone 4"
    },
    {
      geocode: [8.256469, 124.728577],
      popUp: "zone 6"
    },
    {
      geocode: [8.277412, 124.717999],
      popUp: "zone 7"
    }
  ];

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html:`<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className:"custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  }
  
  return (
    <MapContainer center={[8.277959, 124.717693]} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map(marker => (
          <Marker position={marker.geocode} key={`${marker.geocode[0]}-${marker.geocode[1]}`}> {/* Added key prop */}
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
        </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
