import React from "react";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

const Dashboard = () => (
  <>
    <p>Dashboard</p>
    <Outlet />
  </>
);
function HomePage() {
  return <p>Homepage</p>;
}

const MessageDetail = () => {
  const params = useParams();
  return <p>Message {params.id}</p>;
};
const TaskList = () => <p>Task list</p>;
const MessageList = () => <p>Message List</p>;
const NotFound = () => <p>Not found</p>;

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="tasks" element={<TaskList />} />
        <Route path="messages" element={<MessageList />} />
        <Route path="messages/:id" element={<MessageDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
