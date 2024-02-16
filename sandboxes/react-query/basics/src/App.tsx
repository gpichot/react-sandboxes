import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

import { getTodos, postTodo } from "./api";

function Todos() {
  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const { data: todos } = query;

  if (query.isLoading) return "Loading";
  if (query.isError || !Array.isArray(todos)) return "Error";

  // const query = useQuery(["todos"], () => getNFTsList());

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}
