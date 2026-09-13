import { useFetchWithRefresh } from "@/composables/useFetchWithRefresh";

function throwApiError(response, data) {
  const err = new Error(data?.message || "Request failed");
  err.status = response.status;
  err.fieldErrors = data?.errors || null;
  throw err;
}

export const getTasks = async (filter = {}, pagination = { page: 1, limit: 4 }) => {
  const {fetchWithRefresh} = useFetchWithRefresh();

  const params = new URLSearchParams();
  console.log("INSIDE STORE:", pagination);

  if (filter.searchInput) {
    params.set("search", filter.searchInput);
  }

  if (filter.statusSelect && filter.statusSelect !== "default") {
    params.set("status", filter.statusSelect);
  }

  if (filter.prioritySelect && filter.prioritySelect !== "default") {
    params.set("priority", filter.prioritySelect);
  }

  if (filter.sortSelect && filter.sortSelect !== "default") {
    params.set("sort", filter.sortSelect);
  }

  params.set("page", pagination.page);
  params.set("limit", pagination.limit);

  let url = `${import.meta.env.VITE_API_URL}/tasks?${params.toString()}`;

  const response = await fetchWithRefresh(url, {
    method: "GET",
  });

  const data = await response.json();

  if(!response.ok) throwApiError(response , data);

  return data;

};

// Function to get total tasks
export const getTotalTasks = async (filter = null, period = null) => {
  const {fetchWithRefresh} = useFetchWithRefresh();

  const params = new URLSearchParams();

  if (filter) {
    params.set("filter", filter);
  }

  if (period) {
    params.set("period", period);
  }

  let url = `${import.meta.env.VITE_API_URL}/totalTasks?${params.toString()}`;

  const response = await fetchWithRefresh(url, {
    method: "GET",
  });

  const data = await response.json();

  if(!response.ok) throwApiError(response , data);

  return data;
};

// Function to Create New Task
export const createTask = async (task) => {
  const {fetchWithRefresh} = useFetchWithRefresh();

  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/task`, {
    method: "POST",
    body: JSON.stringify({
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate : undefined,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if(!response.ok) throwApiError(response , data);

  return data;
};

export const updateTask = async (task) => {
  const { fetchWithRefresh } = useFetchWithRefresh();

  const payload = {
    newName: task.name,
    newDescription: task.description,
    status: task.status,
    priority: task.priority,
  };

  if (task.dueDate) {
    const d = new Date(task.dueDate);
    if (!Number.isNaN(d.getTime())) payload.dueDate = d.toISOString();
  }

  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) throwApiError(response, data);
  return data;
};

export const deleteTask = async (taskId) => {
  const {fetchWithRefresh} = useFetchWithRefresh();

  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if(!response.ok) throwApiError(response , data);

  return data;
};
