import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function HomePage() {
  return <p>Homepage</p>;
}
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const About = React.lazy(async () => {
  await sleep(1000);
  return import("./pages/About");
});
const Dashboard = React.lazy(async () => {
  await sleep(1000);
  return import("./pages/Dashboard");
});

export default function App() {
  return (
    <React.Suspense fallback="Loading">
      <Link to="/">Homepage</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </React.Suspense>
  );
}
