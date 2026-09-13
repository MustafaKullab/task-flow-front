<template>
  <section class="CreateTask">
    <div class="container-fluid p-0">
      <div class="d-flex align-items-start">
        <SideBar />

        <div class="contentSide flex-grow-1" style="min-width: 0">
          <TopBar />
          <div class="content p-4">
            <div
              class="header d-flex align-items-center justify-content-center justify-content-md-between flex-column flex-md-row text-center text-md-start"
            >
              <div class="title">
                <h3 class="m-0 mb-1">Create New Task</h3>
                <p class="describe text-muted">Add a new task to stay organized and on track.</p>
              </div>
              <!-- <div class="createButton">
                <router-link
                  :to="{ name: 'createTask' }"
                  class="d-flex align-items-center gap-1 btn btn-sm btn-primary"
                  style="padding: 0 5px !important"
                >
                  <div class="icon"><i class="bi bi-plus fs-4"></i></div>
                  <div class="text">Create New Task</div>
                </router-link>
              </div> -->
            </div>

            <div class="createTaskBox p-4 pg-white shadow-sm bg-white rounded border">
              <div class="createHeader d-flex align-items-center gap-3 border-bottom pb-3">
                <div
                  class="icon d-flex align-items-center justify-content-center rounded"
                  style="width: 50px; height: 50px; background-color: #e4eefc; color: #0352fe"
                >
                  <i class="bi bi-plus-square fs-4"></i>
                </div>
                <div class="text">
                  <h6 class="m-0 mb-1">Task Information</h6>
                  <p class="m-0 text-muted">Fill in the details of your new task.</p>
                </div>
              </div>

              <form class="mt-3 row" @submit.prevent="createNewTask">
                <div class="col-md-6 mb-3">
                  <label for="taskName" class="form-label">Task Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{
                      'is-invalid': taskErrors.name,
                      'is-valid': task.name.length >= 5 && task.name.length <= 40,
                    }"
                    placeholder="Enter task name"
                    id="taskName"
                    v-model="task.name"
                    style="box-shadow: none"
                  />
                  <div class="valid-feedback">Task name looks good!</div>
                  <div class="invalid-feedback">  {{ taskErrors.name || "Task Name is Required" }}</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="taskStatus" class="form-label">State</label>
                  <select
                    class="form-select"
                    id="taskStatus"
                    style="box-shadow: none"
                    v-model="task.status"
                  >
                    <option value="todo">To DO</option>
                    <option value="inProgress">In Progress</option>
                    <option value="inReview">In Review</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="taskPriority" class="form-label">Priority</label>
                  <select
                    class="form-select"
                    id="taskPriority"
                    style="box-shadow: none"
                    v-model="task.priority"
                  >
                    <label for="taskPriority" class="form-label">Priority</label>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="dueDate" class="form-label">Due Date</label>
                  <VueDatePicker
                    v-model="task.dueDate"
                    placeholder="Select due date"
                  ></VueDatePicker>
                </div>
                <div class="my-3">
                  <label for="taskDescription" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    placeholder="Enter task description"
                    id="taskDescription"
                    v-model="task.description"
                    :class="{
                      'is-invalid': taskErrors.description,
                      'is-valid': task.description.length >= 10 && task.description.length <= 150,
                    }"
                    style="height: 100px; box-shadow: none"
                  ></textarea>
                  <div class="valid-feedback">Description looks good!</div>
                  <div class="invalid-feedback">  {{ taskErrors.description || "Task Description is Required" }}</div>
                </div>

                <div
                  class="buttons pt-2 mt-2 border-top d-flex align-items-center justify-content-end gap-2 pt-3"
                >
                  <button class="cancle btn border" type="button">Cancle</button>
                  <button class="create btn btn-primary d-flex align-items-center gap-2">
                    <span><i class="bi bi-plus"></i></span><span>Create Task</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useTaskStore } from "@/stores/taskStore";
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Define the task
const taskStore = useTaskStore();

const task = ref({
  name: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
});

const taskErrors = ref({
  name: "",
  description: "",
});

watch([() => task.value.name, () => task.value.description], () => {
  taskErrors.value = {
    name: "",
    description: "",
  };
});

// Function to create new task
const createNewTask = async () => {
  taskErrors.value = { name: "", description: "" };

  try {
     await taskStore.createTask(task.value);

    toast.success("Task created successfully.", { position: "top-center" });

    task.value = {
      name: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
    };
  } catch (err) {
    if (err?.status === 400 && err?.fieldErrors) {
      taskErrors.value.name = err.fieldErrors.name || "";
      taskErrors.value.description = err.fieldErrors.description || "";
    }

    toast.error(err?.message || "Something went wrong, Please try again.", {
      position: "top-center",
    });
  }
};
</script>

