import { defineStore } from "pinia";
import { useFetchWithRefresh } from "@/composables/useFetchWithRefresh";
const { fetchWithRefresh } = useFetchWithRefresh();

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    pagination: {},
    refreshChart: 0,
  }),
  actions: {
    // Function to get tasks
    async getTasks(filter = {}, pagination = { page: 1, limit: 4 }) {
      const params = new URLSearchParams();
      console.log("INSIDE STORE:", pagination);

      if (filter.searchInput) {
        params.set("search", filter.searchInput);
      }

      if (filter.statusSelect !== "default") {
        params.set("status", filter.statusSelect);
      }

      if (filter.prioritySelect !== "default") {
        params.set("priority", filter.prioritySelect);
      }

      if (filter.sortSelect !== "default") {
        params.set("sort", filter.sortSelect);
      }

      params.set("page", pagination.page);
      params.set("limit", pagination.limit);

      let url = `${import.meta.env.VITE_API_URL}/tasks?${params.toString()}`;

      const response = await fetchWithRefresh(url, {
        method: "GET",
      });

      const data = await response.json();

      console.log(pagination);

      this.tasks = data.tasks;
      this.pagination = data.pagination;
    },

    // Function to get total tasks
    async getTotalTasks(filter = null, period = null) {
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

      return data;
    },

    // Function to Create New Task
    async createTask(task) {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/task`, {
        method: "POST",
        body: JSON.stringify({
          name: task.name,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log(data);

      return data;
    },

    async updateTask(task) {
      console.log(task);

      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          newName: task.name,
          newDescription: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log(data);

      return data;
    },

    async deleteTask(taskId) {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        this.refreshChart++;
      }

      return data;
    },
  },
});
