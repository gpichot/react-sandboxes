import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./styles.css";

const icon = new L.Icon({
  iconUrl: "./marker.png",
  iconSize: new L.Point(25, 41),
  iconAnchor: [13, 41],
});

function DetailPage() {
  const location: LatLngExpression = [47.2154556, -1.5644531];
  const [showMap, setShowMap] = React.useState(false);
  return (
    <>
      <h1>Company</h1>
      <address>Nantes</address>
      <br />
      <button onClick={() => setShowMap(!showMap)} type="button">
        {showMap ? "Hide" : "Show"} Map
      </button>
      {showMap && (
        <MapContainer
          center={location}
          zoom={10}
          style={{ width: "100%", height: 500 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} icon={icon} />
        </MapContainer>
      )}
    </>
  );
}

export default function App() {
  return <DetailPage />;
}
