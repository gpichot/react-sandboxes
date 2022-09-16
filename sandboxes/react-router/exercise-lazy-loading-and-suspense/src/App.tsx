import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function HomePage() {
  return <p>Homepage</p>;
}
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const About = /* something */ () => null;

const Dashboard = /* something */ () => null;

export default function App() {
  return (
    <>
      <Link to="/">Homepage</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
