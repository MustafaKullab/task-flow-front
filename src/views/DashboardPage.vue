<template>
  <section class="DashboardPage">
    <div class="container-fluid p-0">
      <div class="d-flex align-items-start">
        <!-- <div class="SideBar"> -->
        <SideBar />
        <!-- </div> -->
        <div class="contentSide flex-grow-1" style="min-width: 0">
          <TopBar />
          <div class="content p-4">
            <div
              class="header d-flex align-items-center justify-content-center justify-content-md-between flex-column flex-md-row text-center text-md-start"
            >
              <div class="title">
                <h3 class="m-0 mb-1">Dashboard</h3>
                <p class="describe text-muted">
                  Welcome back! Here's what's happening with your tasks.
                </p>
              </div>
              <div class="createButton">
                <router-link
                  :to="{ name: 'createTask' }"
                  class="d-flex align-items-center gap-1 btn btn-sm btn-primary"
                  style="padding: 0 5px !important; padding-right: 10px"
                >
                  <div class="icon" style="margin-top: 4px">
                    <i class="bi bi-plus fs-4"></i>
                  </div>
                  <div class="text">Create New Task</div>
                </router-link>
              </div>
            </div>

            <div class="statistics row justify-content-center my-3">
              <div class="col-md-6 col-xl-3 mb-3 mb-xl-0">
                <div class="box blue p-2 border rounded flex-grow-1">
                  <div class="d-flex gap-3 align-items-center mb-2">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded"
                      style="width: 55px; height: 65px; background-color: #ebf2fd; color: #0669fe"
                    >
                      <i class="bi bi-layers fs-3"></i>
                    </div>
                    <div class="numbers">
                      <p class="text-muted m-0">Total Tasks</p>
                      <span class="fw-bold fs-2">{{ totalTasks }}</span>
                    </div>
                  </div>
                  <div class="bottomText small" style="color: #888d95">
                    All tasks in your workspace
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-xl-2 mb-3 mb-xl-0">
                <div class="box orange p-2 border rounded flex-grow-1">
                  <div class="d-flex gap-3 align-items-center mb-2">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded"
                      style="width: 55px; height: 65px; background-color: #fef1e1; color: #f5860a"
                    >
                      <i class="bi bi-list-task fs-4"></i>
                    </div>
                    <div class="numbers">
                      <p class="text-muted m-0">To Do</p>
                      <span class="fw-bold fs-2">{{ toDoTasks }}</span>
                    </div>
                  </div>
                  <div class="bottomText small" style="color: #888d95">Tasks to get started</div>
                </div>
              </div>
              <div class="col-md-6 col-xl-2 mb-3 mb-xl-0">
                <div class="box purple p-2 border rounded flex-grow-1">
                  <div class="d-flex gap-3 align-items-center mb-2">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded"
                      style="width: 55px; height: 65px; background-color: #f1ecfd; color: #895cf5"
                    >
                      <i class="bi bi-clock fs-4"></i>
                    </div>
                    <div class="numbers">
                      <p class="text-muted m-0">In Progress</p>
                      <span class="fw-bold fs-2">{{ inProgressTasks }}</span>
                    </div>
                  </div>
                  <div class="bottomText small" style="color: #888d95">Tasks in progress</div>
                </div>
              </div>
              <div class="col-md-6 col-xl-2 mb-3 mb-xl-0">
                <div class="box teal p-2 border rounded flex-grow-1">
                  <div class="d-flex gap-3 align-items-center mb-2">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded"
                      style="width: 55px; height: 65px; background-color: #e3f4f3; color: #0e8985"
                    >
                      <i class="bi bi-clock fs-4"></i>
                    </div>
                    <div class="numbers">
                      <p class="text-muted m-0">In Review</p>
                      <span class="fw-bold fs-2">{{ inReviewTasks }}</span>
                    </div>
                  </div>
                  <div class="bottomText small" style="color: #888d95">Tasks in progress</div>
                </div>
              </div>
              <div class="col-md-6 col-xl-3 mb-3 mb-xl-0">
                <div class="box green p-2 border rounded flex-grow-1">
                  <div class="d-flex gap-3 align-items-center mb-2">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded"
                      style="width: 55px; height: 65px; background-color: #e9f6ea; color: #199d11"
                    >
                      <i class="bi bi-check-circle fs-4"></i>
                    </div>
                    <div class="numbers">
                      <p class="text-muted m-0">Completed</p>
                      <span class="fw-bold fs-2">{{ doneTasks }}</span>
                    </div>
                  </div>
                  <div class="bottomText small" style="color: #888d95">Tasks completed</div>
                </div>
              </div>
            </div>

            <div class="dashboard-content row">
              <div class="col-lg-7 mb-4 mb-lg-4">
                <div class="recent-tasks py-4 border rounded">
                  <div class="header d-flex align-items-center justify-content-between mb-3 px-4">
                    <div class="title fs-5 fw-bold">Recent Tasks</div>
                    <div class="allTasks">
                      <router-link
                        :to="{ name: 'myTasks' }"
                        class="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                        ><span>View all tasks</span> <span><i class="bi bi-chevron-right"></i></span
                      ></router-link>
                    </div>
                  </div>
                  <div class="tableContainer position-relative">
                    <div
                      class="table-responsive position-relative"
                      style="height: 276px; overflow: auto"
                    >
                      <table class="table">
                        <thead>
                          <tr class="border-top">
                            <th
                              scope="col"
                              class="ps-4"
                              style="
                                background-color: #fafbfc;
                                color: #727986;
                                font-size: 14px;
                                width: 45%;
                              "
                            >
                              Task
                            </th>
                            <th
                              scope="col"
                              style="background-color: #fafbfc; color: #727986; font-size: 14px"
                            >
                              Priority
                            </th>
                            <th
                              scope="col"
                              style="background-color: #fafbfc; color: #727986; font-size: 14px"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              class="pe-4"
                              style="background-color: #fafbfc; color: #727986; font-size: 14px"
                            >
                              Due Date
                            </th>
                            <th
                              class="pe-4"
                              style="background-color: #fafbfc; color: #727986; font-size: 14px"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(task, id) of taskStore.tasks" :key="id" :class="task.status">
                            <td scope="row" class="tdTask" style="padding-left: 30px">
                              <div class="task">
                                <div class="title m-0" style="font-weight: 500">
                                  {{ task.name }}
                                </div>
                                <div class="describeTask text-muted m-0" style="font-size: 13px">
                                  {{ task.description }}
                                </div>
                              </div>
                            </td>
                            <td class="priority" :class="task.priority">
                              <div class="mt-1" style="font-size: 15px">{{ task.priority }}</div>
                            </td>
                            <td class="status" :class="task.status">
                              <div class="mt-1" style="font-size: 15px">
                                {{
                                  task.status === "inProgress"
                                    ? "In Progress"
                                    : task.status === "inReview"
                                      ? "In Review"
                                      : task.status === "done"
                                        ? "Completed"
                                        : "To Do"
                                }}
                              </div>
                            </td>
                            <td class="dueDate">
                              <div class="text-muted mt-1">
                                {{ new Date(task.dueDate).toLocaleDateString("en-GB") }}
                              </div>
                            </td>
                            <td>
                              <div class="cursor-pointer">
                                <button
                                  class="btn dropdown-toggle d-flex align-items-center gap-2 cursor-pointer"
                                  style="border: none"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <div class="mt-1 btn btn-light" style="border: none">
                                    <i class="bi bi-three-dots-vertical"></i>
                                  </div>
                                </button>
                                <ul class="dropdown-menu" style="top: 30px !important">
                                  <li
                                    class="btn d-flex align-items-center gap-2"
                                    type="button"
                                    data-bs-toggle="modal"
                                    :data-bs-target="`#id-${task._id}`"
                                    style="border: none"
                                  >
                                    <div class="icon"><i class="bi bi-eye"></i></div>
                                    <div class="name">View Details</div>
                                  </li>
                                  <li
                                    class="btn d-flex align-items-center gap-2"
                                    type="button"
                                    data-bs-toggle="modal"
                                    :data-bs-target="`#edit-${task._id}`"
                                    style="border: none"
                                    @click="fillUpdateTask(task)"
                                  >
                                    <div class="icon"><i class="bi bi-pencil"></i></div>
                                    <div class="name">Edit Task</div>
                                  </li>
                                  <li
                                    class="btn d-flex align-items-center gap-2 border-bottom"
                                    type="button"
                                    data-bs-toggle="modal"
                                    :data-bs-target="`#change-${task._id}`"
                                    style="border: none"
                                    @click.prevent="fillUpdateTask(task)"
                                  >
                                    <div class="icon"><i class="bi bi-arrow-repeat"></i></div>
                                    <div class="name">Change Status</div>
                                  </li>
                                  <li
                                    class="delTaskBtn btn d-flex align-items-center gap-2 border-bottom"
                                    type="button"
                                    data-bs-toggle="modal"
                                    :data-bs-target="`#delete-${task._id}`"
                                    style="border: none"
                                    @click.prevent="fillUpdateTask(task)"
                                  >
                                    <div class="icon"><i class="bi bi-trash"></i></div>
                                    <div class="name">Delete Task</div>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="taskStore.tasks.length === 0"
                      class="position-absolute noTasksMessage"
                      style="left: 50%; top: 60%; transform: translate(-50%, -50%)"
                    >
                      <div class="image text-center mb-2">
                        <img
                          src="/public/noTasks.png"
                          class="img-fluid"
                          style="width: 120px"
                          alt="No Tasks"
                        />
                      </div>
                      <div class="message text-center">
                        <h4 class="m-0 mb-1">No tasks yet</h4>
                        <p class="text-muted small">
                          Get Started by creating your first task and stay organized.
                        </p>
                      </div>
                      <div class="button text-center">
                        <router-link
                          :to="{ name: 'createTask' }"
                          class="btn btn-sm btn-primary"
                          style="width: fit-content"
                        >
                          Create New Task</router-link
                        >
                      </div>
                    </div>
                  </div>
                  <!-- Modal -->
                  <div
                    v-for="task of taskStore.tasks"
                    :key="task._id"
                    class="modal fade"
                    :id="`id-${task._id}`"
                    tabindex="-1"
                    :aria-labelledby="`idModal-${task._id}`"
                    aria-hidden="true"
                    style="top: 50%; transform: translateY(-47%)"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header" style="border: none">
                          <h1 class="modal-title fs-5" :id="`idModal-${task._id}`">Task Details</h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <ul class="list-unstyled">
                            <li class="taskName">
                              <div class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #ebf3fe;
                                    color: #497dca;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-file-earmark-text fs-4"></i>
                                </div>
                                <div class="details">
                                  <div class="header text-muted">Task Name</div>
                                  <div class="value">{{ task.name }}</div>
                                </div>
                              </div>
                            </li>
                            <li class="taskDescription">
                              <div class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #ebfaef;
                                    color: #0e8d3c;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-card-text fs-4"></i>
                                </div>
                                <div class="details flex-grow-1">
                                  <div class="header text-muted mb-2">Description</div>
                                  <div
                                    class="value border rounded p-2"
                                    style="height: 60px; width: 100%; overflow: auto"
                                  >
                                    {{ task.description }}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li class="taskStatus">
                              <div class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #f3eefd;
                                    color: #8c49e8;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-flag fs-4"></i>
                                </div>
                                <div class="details">
                                  <div class="header text-muted">Status</div>
                                  <div class="value">{{ task.status }}</div>
                                </div>
                              </div>
                            </li>
                            <li class="taskPriority">
                              <div class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #fff4dc;
                                    color: #fc991f;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-exclamation-circle fs-4"></i>
                                </div>
                                <div class="details">
                                  <div class="header text-muted">Priority</div>
                                  <div class="value">{{ task.priority }}</div>
                                </div>
                              </div>
                            </li>
                            <li class="taskDueDate">
                              <div class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #fdeaeb;
                                    color: #d23b49;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-calendar3 fs-4"></i>
                                </div>
                                <div class="details">
                                  <div class="header text-muted">Due Date</div>
                                  <div class="value">{{ task.dueDate }}</div>
                                </div>
                              </div>
                            </li>
                            <li class="taskCreatedAt">
                              <div class="d-flex align-items-center gap-3">
                                <div
                                  class="icon d-flex align-items-center justify-content-center rounded"
                                  style="
                                    width: 40px;
                                    height: 40px;
                                    background-color: #f4f6f9;
                                    color: #485768;
                                    flex-shrink: 0;
                                  "
                                >
                                  <i class="bi bi-clock fs-4"></i>
                                </div>
                                <div class="details">
                                  <div class="header text-muted">Created At</div>
                                  <div class="value">{{ task.createdAt }}</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-light border"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal  -->
                  <div
                    v-for="task of taskStore.tasks"
                    :key="task._id"
                    class="modal fade"
                    :id="`edit-${task._id}`"
                    tabindex="-1"
                    :aria-labelledby="`idModalEdit-${task._id}`"
                    aria-hidden="true"
                    style="top: 50%; transform: translateY(-50%)"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header" style="border: none">
                          <div class="header">
                            <h1 class="modal-title fs-5" :id="`idModalEdit-${task._id}`">
                              Edit Task
                            </h1>
                            <p class="text-muted small">Update your task details.</p>
                          </div>
                          <button
                            type="button"
                            class="btn-close mb-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form>
                          <div class="modal-body py-0">
                            <ul class="list-unstyled">
                              <li class="taskName">
                                <div
                                  class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom"
                                >
                                  <div
                                    class="icon d-flex align-items-center justify-content-center rounded"
                                    style="
                                      width: 40px;
                                      height: 40px;
                                      background-color: #ebf3fe;
                                      color: #497dca;
                                      flex-shrink: 0;
                                    "
                                  >
                                    <i class="bi bi-file-earmark-text fs-4"></i>
                                  </div>
                                  <div class="details flex-grow-1">
                                    <div class="value">
                                      <div class="mb-2">
                                        <label for="taskName" class="form-label header text-muted"
                                          >Task Name</label
                                        >
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="taskName"
                                          style="box-shadow: none"
                                          placeholder="Enter new task name"
                                          v-model="updateTask.name"
                                        />
                                        <div class="invalid-feedback">
                                          Please provide a valid city.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="taskDescription">
                                <div
                                  class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom"
                                >
                                  <div
                                    class="icon d-flex align-items-center justify-content-center rounded"
                                    style="
                                      width: 40px;
                                      height: 40px;
                                      background-color: #ebfaef;
                                      color: #0e8d3c;
                                      flex-shrink: 0;
                                    "
                                  >
                                    <i class="bi bi-card-text fs-4"></i>
                                  </div>
                                  <div class="details flex-grow-1">
                                    <div class="value">
                                      <div class="mb-2">
                                        <label for="taskDesc" class="form-label header text-muted"
                                          >Description</label
                                        >
                                        <textarea
                                          type="text"
                                          class="form-control"
                                          id="taskDesc"
                                          style="box-shadow: none"
                                          placeholder="Enter new task description"
                                          v-model="updateTask.description"
                                        />
                                        <div class="invalid-feedback">
                                          Please provide a valid city.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="taskStatus">
                                <div
                                  class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom"
                                >
                                  <div
                                    class="icon d-flex align-items-center justify-content-center rounded"
                                    style="
                                      width: 40px;
                                      height: 40px;
                                      background-color: #f3eefd;
                                      color: #8c49e8;
                                      flex-shrink: 0;
                                    "
                                  >
                                    <i class="bi bi-flag fs-4"></i>
                                  </div>
                                  <div class="details flex-grow-1">
                                    <div class="value">
                                      <div>
                                        <label for="taskStatus" class="form-label header text-muted"
                                          >Status</label
                                        >
                                        <p>
                                          <select
                                            id="pet-select"
                                            class="w-100"
                                            v-model="updateTask.status"
                                          >
                                            <button>
                                              <selectedcontent></selectedcontent>
                                            </button>

                                            <option value="todo">
                                              <span class="icon" aria-hidden="true"
                                                ><i class="bi bi-list-task status-todo"></i>
                                              </span>
                                              <span class="option-label">To Do</span>
                                            </option>
                                            <option value="inProgress">
                                              <span class="icon" aria-hidden="true"
                                                ><i
                                                  class="bi bi-hourglass-split status-progress"
                                                ></i>
                                              </span>
                                              <span class="option-label">In Progress</span>
                                            </option>
                                            <option value="inReview">
                                              <span class="icon" aria-hidden="true"
                                                ><i class="bi bi-eye status-review"></i>
                                              </span>
                                              <span class="option-label">In Review</span>
                                            </option>
                                            <option value="done">
                                              <span class="icon" aria-hidden="true"
                                                ><i class="bi bi-check-circle status-done"></i
                                              ></span>
                                              <span class="option-label">Completed</span>
                                            </option>
                                          </select>
                                        </p>
                                        <div class="invalid-feedback">
                                          Please provide a valid city.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="taskPriority">
                                <div
                                  class="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom"
                                >
                                  <div
                                    class="icon d-flex align-items-center justify-content-center rounded"
                                    style="
                                      width: 40px;
                                      height: 40px;
                                      background-color: #fff4dc;
                                      color: #fc991f;
                                      flex-shrink: 0;
                                    "
                                  >
                                    <i class="bi bi-exclamation-circle fs-4"></i>
                                  </div>
                                  <div class="details flex-grow-1">
                                    <div class="value">
                                      <div>
                                        <label
                                          for="taskPriority"
                                          class="form-label header text-muted"
                                          >Priority</label
                                        >
                                        <p>
                                          <select
                                            id="pet-select"
                                            class="w-100"
                                            v-model="updateTask.priority"
                                          >
                                            <button>
                                              <selectedcontent></selectedcontent>
                                            </button>

                                            <option value="low">
                                              <span class="icon" aria-hidden="true"
                                                ><i
                                                  class="bi bi-chevron-double-down low-priority"
                                                ></i>
                                              </span>
                                              <span class="option-label">Low</span>
                                            </option>
                                            <option value="medium">
                                              <span class="icon" aria-hidden="true"
                                                ><i class="bi bi-dash-circle med-priority"></i>
                                              </span>
                                              <span class="option-label">Medium</span>
                                            </option>
                                            <option value="high">
                                              <span class="icon" aria-hidden="true"
                                                ><i
                                                  class="bi bi-chevron-double-up high-priority"
                                                ></i>
                                              </span>
                                              <span class="option-label">High</span>
                                            </option>
                                          </select>
                                        </p>
                                        <div class="invalid-feedback">
                                          Please provide a valid city.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li class="taskDueDate">
                                <div class="d-flex align-items-center gap-3">
                                  <div
                                    class="icon d-flex align-items-center justify-content-center rounded"
                                    style="
                                      width: 40px;
                                      height: 40px;
                                      background-color: #fdeaeb;
                                      color: #d23b49;
                                      flex-shrink: 0;
                                    "
                                  >
                                    <i class="bi bi-calendar3 fs-4"></i>
                                  </div>
                                  <div class="details flex-grow-1">
                                    <div class="value">
                                      <div>
                                        <label for="dueDate" class="form-label">Due Date</label>
                                        <VueDatePicker
                                          v-model="updateTask.dueDate"
                                          placeholder="Select due date"
                                        ></VueDatePicker>
                                        <div class="invalid-feedback">
                                          Please provide a valid city.
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div class="message text-danger mb-2 small">{{ updateTaskError }}</div>
                          </div>
                        </form>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-light border"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="updateTheTask"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal -->
                  <div
                    v-for="task of taskStore.tasks"
                    :key="task._id"
                    class="modal fade"
                    :id="`change-${task._id}`"
                    tabindex="-1"
                    :aria-labelledby="`idModalChange-${task._id}`"
                    aria-hidden="true"
                    style="top: 50%; transform: translateY(-50%)"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title fs-5 d-flex align-items-center gap-3"
                            :id="`idModalChange-${task._id}`"
                          >
                            <div
                              class="icon d-flex justify-content-center align-items-center rounded-pill"
                              style="
                                width: 50px;
                                height: 50px;
                                background-color: #ebf0fe;
                                color: #2567fd;
                                flex-shrink: 0;
                              "
                            >
                              <i class="bi bi-arrow-repeat fs-3"></i>
                            </div>
                            <div class="title">
                              <div class="head">Change Status</div>
                              <p class="text-muted fs-6">Update the status for this task</p>
                            </div>
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div
                            class="taskDetails p-3 border rounded d-flex align-items-center gap-3"
                            style="background-color: #f8f9fd"
                          >
                            <div
                              class="icon d-flex align-items-center justify-content-center rounded-pill"
                              style="
                                width: 50px;
                                height: 50px;
                                background-color: #e8effd;
                                color: #125ffb;
                              "
                            >
                              <i class="bi bi-file-earmark-text fs-4"></i>
                            </div>
                            <div class="details">
                              <div class="taskName">{{ task.name }}</div>
                              <div class="status">
                                <span class="text-muted">Current Status: </span
                                ><span
                                  :class="`${task.status}Status`"
                                  class="rounded-pill"
                                  style="padding: 5px 20px 5px 25px"
                                  :style="{
                                    backgroundColor:
                                      task.status === 'todo'
                                        ? '#fdf9f5'
                                        : task.status === 'inProgress'
                                          ? '#eeeafd'
                                          : task.status === 'inReview'
                                            ? '#f3fafb'
                                            : '#f1f9f4',
                                    color:
                                      task.status === 'todo'
                                        ? '#fe8812'
                                        : task.status === 'inProgress'
                                          ? '#602ce4'
                                          : task.status === 'inReview'
                                            ? '#0a97b0'
                                            : '#309845',
                                    border:
                                      task.status === 'todo'
                                        ? '1px solid #fe8812'
                                        : task.status === 'inProgress'
                                          ? '1px solid #602ce4'
                                          : task.status === 'inReview'
                                            ? '1px solid #0a97b0'
                                            : '1px solid #309845',
                                  }"
                                  >{{
                                    task.status === "todo"
                                      ? "To Do"
                                      : task.status === "inProgress"
                                        ? "In Progress"
                                        : task.status === "inReview"
                                          ? "In Review"
                                          : "Completed"
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>

                          <div class="selectNewSa my-3">
                            <div class="header fs-5 text-muted">Select New Status</div>

                            <form>
                              <div class="form-check p-2 border m-2 rounded">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="status"
                                  id="statusToDo"
                                  value="todo"
                                  v-model="updateTask.status"
                                  checked
                                />
                                <label class="form-check-label" for="statusToDo"> To Do </label>
                              </div>
                              <div class="form-check p-2 border m-2 rounded">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="status"
                                  id="statusProgress"
                                  value="inProgress"
                                  v-model="updateTask.status"
                                />
                                <label class="form-check-label" for="statusProgress">
                                  In Progress
                                </label>
                              </div>

                              <div class="form-check p-2 border m-2 rounded">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="status"
                                  id="statusReview"
                                  value="inReview"
                                  v-model="updateTask.status"
                                />
                                <label class="form-check-label" for="statusReview">
                                  In Review
                                </label>
                              </div>
                              <div class="form-check p-2 border m-2 rounded">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="status"
                                  id="statusComplete"
                                  value="done"
                                  v-model="updateTask.status"
                                />
                                <label class="form-check-label" for="statusComplete">
                                  Completed
                                </label>
                              </div>
                            </form>
                          </div>
                          <div class="message text-danger mt-2 small">{{ statusTaskError }}</div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-light border"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="updateTheTask"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modal -->
                  <div
                    v-for="task of taskStore.tasks"
                    :key="task._id"
                    class="modal fade"
                    :id="`delete-${task._id}`"
                    tabindex="-1"
                    :aria-labelledby="`idModalDelete-${task._id}`"
                    aria-hidden="true"
                    style="top: 50%; transform: translateY(-30%)"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title fs-5 d-flex align-items-center gap-3"
                            :id="`idModalDelete-${task._id}`"
                          >
                            <div
                              class="icon d-flex justify-content-center align-items-center rounded-pill"
                              style="
                                width: 50px;
                                height: 50px;
                                background-color: #fce6e8;
                                color: #eb272d;
                                flex-shrink: 0;
                              "
                            >
                              <i class="bi bi-trash fs-4"></i>
                            </div>
                            <div class="title">
                              <div class="head">Delete Task?</div>
                            </div>
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="header text-muted mb-3">
                            <div class="confirmMsg">Are you sure you want to delete this task?</div>
                            <span class="warning">This action connot be undone</span>
                          </div>

                          <div
                            class="taskDetails p-3 border rounded"
                            style="background-color: #f8f9fd"
                          >
                            <div class="details">
                              <div class="taskName fw-bold">{{ task.name }}</div>
                              <div class="status d-flex align-items-center">
                                <div class="dueDate">
                                  <span class="text-muted"
                                    >Due:
                                    {{
                                      new Date(task.dueDate).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                      })
                                    }},
                                    {{
                                      new Date(task.dueDate).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                      })
                                    }}</span
                                  >
                                </div>
                                <span class="fw-bold mb-2 mx-2">.</span>
                                <span class="text-muted"> Status: </span
                                ><span
                                  :class="`${task.status}Status`"
                                  class="rounded-pill small ms-2 mt-1"
                                  style="padding: 2px 20px 2px 25px"
                                  :style="{
                                    backgroundColor:
                                      task.status === 'todo'
                                        ? '#fdf9f5'
                                        : task.status === 'inProgress'
                                          ? '#eeeafd'
                                          : task.status === 'inReview'
                                            ? '#f3fafb'
                                            : '#f1f9f4',
                                    color:
                                      task.status === 'todo'
                                        ? '#fe8812'
                                        : task.status === 'inProgress'
                                          ? '#602ce4'
                                          : task.status === 'inReview'
                                            ? '#0a97b0'
                                            : '#309845',
                                    border:
                                      task.status === 'todo'
                                        ? '1px solid #fe8812'
                                        : task.status === 'inProgress'
                                          ? '1px solid #602ce4'
                                          : task.status === 'inReview'
                                            ? '1px solid #0a97b0'
                                            : '1px solid #309845',
                                  }"
                                  >{{
                                    task.status === "todo"
                                      ? "To Do"
                                      : task.status === "inProgress"
                                        ? "In Progress"
                                        : task.status === "inReview"
                                          ? "In Review"
                                          : "Completed"
                                  }}</span
                                >
                              </div>
                            </div>
                          </div>
                          <div class="ErMsg text-danger mt-2 small">{{ delTaskError }}</div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-light border"
                            data-bs-dismiss="modal"
                          >
                            Cancle
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger d-flex align-items-center gap-2"
                            @click.prevent="deleteTask(task._id)"
                          >
                            <div class="icon"><i class="bi bi-trash"></i></div>
                            <div class="text">Delete Task</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="task-overview py-4 px-3 border rounded">
                  <div class="header d-flex align-items-center justify-content-between mb-4">
                    <div class="title fw-bold fs-4">Task Overview</div>
                    <select
                      class="form-select selNotFormatt"
                      aria-label="Default select example"
                      style="width: 40%; box-shadow: none"
                      v-model="period_stats"
                      @change="getTasksUsingPeriod"
                    >
                      <option value="all" selected>All Timeِ</option>
                      <option value="day">This Day</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>

                  <div
                    class="chart d-flex align-items-center justify-content-center justify-content-xxl-between flex-wrap flex-column flex-lg-row gap-4"
                  >
                    <TaskOverviewChart style="width: 180px; height: 180px" class="mb-4 mb-lg-0" />
                    <div class="statictis d-flex align-items-center justify-content-bewteen gap-5">
                      <ul class="list-unstyled">
                        <li class="todo d-flex align-items-center gap-5 mb-2">
                          <div class="text">To Do</div>
                        </li>
                        <li class="inProgress d-flex align-items-center gap-5 mb-2">
                          <div class="text">In Progress</div>
                        </li>
                        <li class="inReview d-flex align-items-center gap-5 mb-2">
                          <div class="text">In Review</div>
                        </li>
                        <li class="done d-flex align-items-center gap-5 mb-2">
                          <div class="text">Done</div>
                        </li>
                      </ul>
                      <ul class="list-unstyled">
                        <li class="todo mb-2">
                          <div class="precentage text-muted">
                            {{ toDoTasks }}({{ toDoPrecentage.toFixed(2) || 0 }}%)
                          </div>
                        </li>
                        <li class="inProgress mb-2">
                          <div class="precentage text-muted">
                            {{ inProgressTasks }}({{ progressPrecentage.toFixed(2) || 0 }}%)
                          </div>
                        </li>
                        <li class="inReview mb-2">
                          <div class="precentage text-muted">
                            {{ inReviewTasks }}({{ reveiwPrecentage.toFixed(2) }}%)
                          </div>
                        </li>
                        <li class="done mb-2">
                          <div class="precentage text-muted">
                            {{ doneTasks }}({{ donePrecentage.toFixed(2) }}%)
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="msg d-flex align-items-center gap-3 py-2 px-3 rounded border"
                    style="background-color: #f3f7fe; border-color: #186ffb; margin-top: 15px"
                  >
                    <div class="icon fs-3" style="color: #186ffb"><i class="bi bi-person"></i></div>
                    <div class="text">
                      <div class="title fw-bold" style="color: #186ffb">
                        You're making progress!
                      </div>
                      <div class="details text-muted">
                        <span>{{
                          period_stats === "all"
                            ? `${doneTasks} tasks completed`
                            : `${doneTasks}  tasks completed this `
                        }}</span>

                        <span>{{
                          period_stats === "day"
                            ? "day"
                            : period_stats === "week"
                              ? "week"
                              : period_stats === "month"
                                ? "month"
                                : period_stats === "year"
                                  ? "year"
                                  : ""
                        }}</span
                        >.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
import TaskOverviewChart from "@/components/TaskOverviewChart.vue";
import { useTaskStore } from "@/stores/taskStore";
import { computed, onMounted, ref, watch } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

// Define Task Store
const taskStore = useTaskStore();

const totalTasks = ref(0);
const toDoTasks = ref(0);
const inProgressTasks = ref(0);
const inReviewTasks = ref(0);
const doneTasks = ref(0);

const period_stats = ref("all");

const getTasksUsingPeriod = async () => {
  const resTotal = await taskStore.getTotalTasks(null, period_stats.value);
  totalTasks.value = resTotal?.totalTasks || 0;

  const resToDo = await taskStore.getTotalTasks("todo", period_stats.value);
  toDoTasks.value = resToDo?.totalTasks || 0;

  const resProgress = await taskStore.getTotalTasks("inProgress", period_stats.value);
  inProgressTasks.value = resProgress?.totalTasks || 0;

  const resReview = await taskStore.getTotalTasks("inReview", period_stats.value);
  inReviewTasks.value = resReview?.totalTasks || 0;

  const resDone = await taskStore.getTotalTasks("done", period_stats.value);
  doneTasks.value = resDone?.totalTasks || 0;
};

const toDoPrecentage = computed(() => {
  if (!totalTasks.value) return 0;
  return (toDoTasks.value / totalTasks.value) * 100;
});

const progressPrecentage = computed(() => {
  if (!totalTasks.value) return 0;
  return (inProgressTasks.value / totalTasks.value) * 100;
});

const reveiwPrecentage = computed(() => {
  if (!totalTasks.value) return 0;
  return (inReviewTasks.value / totalTasks.value) * 100;
});

const donePrecentage = computed(() => {
  if (!totalTasks.value) return 0;
  return (doneTasks.value / totalTasks.value) * 100;
});

const updateTask = ref({
  id: "",
  name: "",
  description: "",
  status: "",
  priority: "",
  dueDate: new Date(),
});

const fillUpdateTask = (task) => {
  updateTask.value = {
    id: task._id,
    name: task.name,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
  };
};

const updateTaskError = ref("");
const statusTaskError = ref("");
const delTaskError = ref("");

watch(
  () => [
    updateTask.value.name,
    updateTask.value.description,
    updateTask.value.status,
    updateTask.value.priority,
    updateTask.value.dueDate,
  ],
  () => {
    updateTaskError.value = "";
    statusTaskError.value = "";
  },
);

const updateTheTask = async () => {
  const data = await taskStore.updateTask(updateTask.value);

  if (data.success) {
    toast.success("Task updated successfully.");
    await taskStore.getTasks();
  } else {
    updateTaskError.value = data.errors.task;
    statusTaskError.value = "Please Choose another status to update.";
    toast.error("Unable to update the task. Please try again.");
  }
};

const closeModal = (taskId) => {
  const modalElement = document.getElementById(`delete-${taskId}`);

  if (modalElement) {
    const modal = Modal.getOrCreateInstance(modalElement);

    if (modal) {
      modal.hide();
    }
  }
};

// Function to delete the task
const deleteTask = async (taskId) => {
  const data = await taskStore.deleteTask(taskId);

  if (data.success) {
    closeModal(taskId);
    toast.success("Task deleted successfully.");
    getTasksUsingPeriod();
    await taskStore.getTasks();
  } else {
    closeModal(taskId);
    toast.error("Unable to delete the task. Please try again.");
    delTaskError.value = data.errors.task;
  }
};

onMounted(async () => {
  // Get all tasks
  await taskStore.getTasks();

  // Retrieve status statistics
  getTasksUsingPeriod();
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.title {
  .describe {
    font-size: 14px !important;
    @media (max-width: 767px) {
      font-size: 12px !important;
    }
  }
}

.box {
  &.blue {
    border-bottom-color: #1b78ee !important;
    border-bottom-width: 2px !important;
  }
  &.orange {
    border-bottom-color: #fbac4a !important;
    border-bottom-width: 2px !important;
  }
  &.purple {
    border-bottom-color: #9b71f0 !important;
    border-bottom-width: 2px !important;
  }
  &.teal {
    border-bottom-color: #069da0 !important;
    border-bottom-width: 2px !important;
  }
  &.green {
    border-bottom-color: #33b33c !important;
    border-bottom-width: 2px !important;
  }
}

table {
  td,
  th {
    white-space: nowrap !important;
  }
  tbody {
    td.priority {
      div {
        padding: 5px 10px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-weight: 500;
      }
      &.high {
        div {
          background-color: #fee5e4;
          color: #ea454b !important;
        }
      }
      &.medium {
        div {
          background-color: #fef3d6;
          color: #fea112 !important;
        }
      }
      &.low {
        div {
          background-color: #f1fbf3;
          color: #26b653 !important;
        }
      }
    }
    td.status {
      div {
        padding: 5px 10px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-weight: 500;
      }
      &.todo {
        div {
          background-color: #f5f7f8;
          color: #2f3d51 !important;
        }
      }
      &.inProgress {
        div {
          background-color: #e6f1fe;
          color: #2469fc !important;
        }
      }
      &.inReview {
        div {
          background-color: #e3faf4;
          color: #0b8878 !important;
        }
      }
      &.done {
        div {
          background-color: #e1f7e4;
          color: #298b30 !important;
        }
      }
    }
    tr {
      .tdTask {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.todo {
        .tdTask {
          &::before {
            background-color: #2f3d51;
          }
        }
      }
      &.inProgress {
        .tdTask {
          &::before {
            background-color: #257bfd;
          }
        }
      }
      &.inReview {
        .tdTask {
          &::before {
            background-color: #0b8878;
          }
        }
      }
      &.done {
        .tdTask {
          &::before {
            background-color: #298b30;
          }
        }
      }
    }
  }
}

.describeTask {
  max-width: 270px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.statictis {
  ul:first-of-type {
    li {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
      &.todo {
        &::before {
          background: #fda748;
        }
      }
      &.inProgress {
        &::before {
          background: #9b71f0;
        }
      }
      &.inReview {
        &::before {
          background: #069da0;
        }
      }
      &.done {
        &::before {
          background: #33b33c;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .noTasksMessage {
    .image {
      img {
        width: 100px !important;
      }
    }
    .message {
      width: 250px !important;
    }
  }
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-menu.show {
  padding: 0;
  li {
    transition: 0.3s;
    &:not(.delTaskBtn):hover {
      background-color: #eee !important;
    }
  }
}

.delTaskBtn {
  transition: 0.3s;

  &:hover {
    background-color: #ffa9afa5;
    color: #ee2c32;
  }
}

.modal.fade {
  @media (max-width: 767px) {
    transform: translateY(-35%) !important;
  }
}

select,
::picker(select) {
  appearance: base-select;
}

.selNotFormatt {
  appearance: auto !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem !important;
}

select {
  border: 2px solid #dddddd;
  background: #ffffff;
  padding: 10px;
  transition: 0.4s;
}

select:hover,
select:focus {
  background: #eeeeee;
}

select::picker-icon {
  color: #999999;
  transition: 0.4s rotate;
}

select:open::picker-icon {
  rotate: 180deg;
}

option {
  display: flex;
  justify-content: flex-start;
  gap: 20px;

  border: 2px solid #dddddd;
  background: #eeeeee;
  padding: 10px;
  transition: 0.4s;
}

option:first-of-type {
  border-radius: 8px 8px 0 0;
}

option:last-of-type {
  border-radius: 0 0 8px 8px;
}

::picker(select) {
  border-radius: 8px;
}

option:not(option:last-of-type) {
  border-bottom: none;
}

option:nth-of-type(odd) {
  background: white;
}

// Status options
option[value="todo"]:hover,
option[value="todo"]:focus {
  background: #c0dbfd;
}

option[value="inProgress"]:hover,
option[value="inProgress"]:focus {
  background: #e4d9fc;
}

option[value="inReview"]:hover,
option[value="inReview"]:focus {
  background: #dbf7f3;
}

option[value="done"]:hover,
option[value="done"]:focus {
  background: #d4f2db;
}
// Status options

// Priority Options
option[value="low"]:hover,
option[value="low"]:focus {
  background: #ecf8f1;
}

option[value="medium"]:hover,
option[value="medium"]:focus {
  background: #fef3e5;
}

option[value="high"]:hover,
option[value="high"]:focus {
  background: #feebea;
}
// Priority Options

option .icon {
  font-size: 1.6rem;
  text-box: trim-both cap alphabetic;
}

// Status options
option[value="todo"] .icon {
  color: #1561fb;
}

option[value="inProgress"] .icon {
  color: #8a55f3;
}

option[value="inReview"] .icon {
  color: #038782;
}

option[value="done"] .icon {
  color: #28902b;
}
// Status options

// Priority Option
option[value="low"] .icon {
  color: #058250;
}

option[value="medium"] .icon {
  color: #ff8a04;
}

option[value="high"] .icon {
  color: #e52f2f;
}

selectedcontent .icon {
  margin-right: 10px;
}

// Status options
.status-todo {
  color: #2469fc;
}

.status-progress {
  color: #895cf5;
}

.status-review {
  color: #0b8878;
}

.status-done {
  color: #298b30;
}
// Status options

// priority Options

.low-priority {
  color: #058250;
}

.med-priority {
  color: #ff8a04;
}

.high-priority {
  color: #e52f2f;
}

// priority Options

option::checkmark {
  order: 1;
  margin-left: auto;
  content: "☑️";
}

form {
  input[type="radio"] {
    display: none !important;
  }
  input[type="radio"] + label {
    padding-left: 25px;
    width: 100%;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #adb3bf;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background-color: transparent;
    }
  }

  input[id="statusToDo"]:checked + label {
    &::before {
      border-color: #fe7b05 !important;
    }
  }

  input[id="statusProgress"]:checked + label {
    &::before {
      border-color: #6f33f2 !important;
    }
  }

  input[id="statusReview"]:checked + label {
    &::before {
      border-color: #09a7af !important;
    }
  }

  input[id="statusComplete"]:checked + label {
    &::before {
      border-color: #2cb958 !important;
    }
  }

  .form-check:has(input[id="statusToDo"]:checked) {
    background-color: #fdf9f5;
    color: black;
    border-color: #ff7b05 !important;
  }

  .form-check:has(input[id="statusProgress"]:checked) {
    background-color: #f4f4fd;
    color: #6d35ee;
    border-color: #6d35ee !important;
  }

  .form-check:has(input[id="statusReview"]:checked) {
    background-color: #f2f9fa;
    color: #03a0ad;
    border-color: #03a0ad !important;
  }

  .form-check:has(input[id="statusComplete"]:checked) {
    background-color: #f2f9f5;
    color: #2eb855;
    border-color: #2eb855 !important;
  }

  input[id="statusToDo"]:checked + label {
    &::after {
      background-color: #ff7b05;
    }
  }

  input[id="statusProgress"]:checked + label {
    &::after {
      background-color: #6d35ee;
    }
  }

  input[id="statusReview"]:checked + label {
    &::after {
      background-color: #03a0ad;
    }
  }

  input[id="statusComplete"]:checked + label {
    &::after {
      background-color: #2eb855;
    }
  }
}

.details {
  .status {
    span:nth-last-child(1) {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 8px;
        top: 55%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      &.todoStatus {
        &::before {
          background-color: #fe8914 !important;
        }
      }
      &.inProgressStatus {
        &::before {
          background-color: #6731e3 !important;
        }
      }
      &.inReviewStatus {
        &::before {
          background-color: #0a97b2 !important;
        }
      }
      &.doneStatus {
        &::before {
          background-color: #2f9944 !important;
        }
      }
    }
  }
}
</style>
