const sleep = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

type Todo = {
  id: number;
  title: string;
};
function getDefaultTodos() {
  return [
    {
      id: Date.now(),
      title: "Update: slides"
    }
  ];
}
export async function getTodos(): Promise<Todo[]> {
  await sleep(500);
  try {
    const value = localStorage.getItem("mytodos");
    return value ? JSON.parse(value) : getDefaultTodos();
  } catch (e) {
    console.error(e);
    return getDefaultTodos();
  }
}
export async function postTodo(todo: Todo) {
  await sleep(500);
  try {
    const todos = await getTodos();
    localStorage.setItem("mytodos", JSON.stringify([...todos, todo]));
  } catch (e) {
    console.error(e);
  }
  return todo;
}
