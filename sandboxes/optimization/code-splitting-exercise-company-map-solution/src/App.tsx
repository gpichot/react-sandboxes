import React from "react";
import { LatLngExpression } from "leaflet";

import "./styles.css";

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const Map = React.lazy(async () => {
  await sleep(2000);
  return import("./Map");
});

function DetailPage() {
  const location: LatLngExpression = [47.2154556, -1.5644531];
  return (
    <>
      <h1>Company</h1>
      <address>Nantes</address>
      <br />
      <React.Suspense fallback="Loading">
        <Map location={location} />
      </React.Suspense>
    </>
  );
}

export default function App() {
  return <DetailPage />;
}
