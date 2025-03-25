const API_URL = "http://localhost:8081/api/v1/todos";

// ✅ GET all todos
export async function getTodos(status) {
  const response = await fetch(`${API_URL}?status=${status}`);
  return response.json();
}

// ✅ GET is done by section
export async function getTodoCountIsDone(section) {
  const response = await fetch(`${API_URL}/counts/done?section=${section}`);
  return response.json();
}

// ✅ GET my day date
export async function getMyDayDate() {
  const response = await fetch(`${API_URL}/my-day/date`);
  return response.json();
}

// ✅ GET a todo by uuid
export async function getTodo(uuid) {
  const response = await fetch(`${API_URL}/${uuid}`);
  return response.json();
}

// ✅ GET all count todos
export async function getTodoCount() {
  const response = await fetch(`${API_URL}/counts`);
  return response.json();
}

// ✅ POST (Add new todo)
export async function addTodo(todo) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo!");
  }

  const newTodo = await response.json();
  return newTodo;
}

// ✅ PATCH (Update todo)
export async function updateTodo(uuid, updatedTodo) {
  const response = await fetch(`${API_URL}/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });

  return response.json();
}

// ✅ PUT (Mark as done/undone)
export async function toggleTodoDone(uuid) {
  const response = await fetch(`${API_URL}/${uuid}/done/toggle`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

// ✅ PUT (Mark as important/unimportant)
export async function toggleTodoImportant(uuid) {
  const response = await fetch(`${API_URL}/${uuid}/important/toggle`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

// ✅ DELETE (Remove todo)
export async function deleteTodo(uuid) {
  await fetch(`${API_URL}/${uuid}`, { method: "DELETE" });
}
