import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "./marker.png",
  iconSize: new L.Point(25, 41),
  iconAnchor: [13, 41]
});

export function Map({ location }: { location: LatLngExpression }) {
  return (
    <MapContainer
      center={location}
      zoom={10}
      style={{ width: "100%", height: 500 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location} icon={icon} />
    </MapContainer>
  );
}

export default Map;
