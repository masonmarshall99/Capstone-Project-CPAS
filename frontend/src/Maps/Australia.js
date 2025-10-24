import React from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import zones from './GeoJSONData/zones.json';

export default function AustraliaMap() {

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    const australiaBounds = [
    [-44, 112], // Southwest corner (approx Tasmania)
    [-10, 154], // Northeast corner (top of Queensland)
  ];

    useEffect(() => {
    return () => {
      const container = document.querySelector(".leaflet-container");
      if (container && container._leaflet_id) {
        container._leaflet_id = null;
      }
    };
  }, []);

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng).bindPopup(feature.properties.name);
  };

    return (
        <MapContainer 
            center={[-25.2744, 133.7751]} 
            zoom={4} 
            style={{ height: "100%", width: "100%" }}
            maxBounds={australiaBounds}
            maxBoundsViscosity={1.0}
            minZoom={4}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <GeoJSON data={zones} pointToLayer={pointToLayer} />
        </MapContainer>
    );
}