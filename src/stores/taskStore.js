import { defineStore } from "pinia";
import * as taskApis from "@/api/tasks.api.js";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    pagination: {},
    lastFilter: null,
    lastPagination: null,
    refreshChart: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async getTasks(filter = {}, pagination = { page: 1, limit: 4 }) {
      this.loading = true;
      this.error = null;
      this.lastFilter = { ...filter };
      this.lastPagination = { ...pagination };

      try {
        const data = await taskApis.getTasks(filter, pagination);
        this.tasks = data.tasks;
        this.pagination = data.pagination;
      } catch (err) {
        this.error = err?.message || "Request failed";
        // اختياري: لو بدك تخلي الخطأ يوصل للـcomponent
        // throw err;
      } finally {
        this.loading = false;
      }
    },

    async refreshTasks() {
      if (!this.lastFilter || !this.lastPagination) {
        return this.getTasks({}, { page: 1, limit: 4 });
      }
      return this.getTasks(this.lastFilter, this.lastPagination);
    },

    async getTotalTasks(filter = null, period = null) {
      return taskApis.getTotalTasks(filter, period);
    },

    async createTask(task) {
      return taskApis.createTask(task);
    },

    async updateTask(task) {
      return taskApis.updateTask(task);
    },

    async deleteTask(taskId) {
      const data = await taskApis.deleteTask(taskId);
      if (data.success) this.refreshChart++;
      return data;
    },
  },
});
