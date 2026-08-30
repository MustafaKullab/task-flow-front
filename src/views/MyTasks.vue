<template>
  <section class="MyTasks">
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
                <h3 class="m-0 mb-1">My Tasks</h3>
                <p class="describe text-muted">Manage and organize all your tasks in one place.</p>
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

            <div class="filter p-3 bg-white border shadow-sm rounded my-3">
              <form class="d-flex flex-wrap gap-2">
                <div class="input-group" style="max-width: 400px">
                  <span class="input-group-text bg-white" id="basic-addon1"
                    ><i class="bi bi-search text-muted"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    v-model="filter.searchInput"
                    style="border-left: none; box-shadow: none; border-color: #dee2e6"
                    aria-describedby="basic-addon1"
                    @input="FilterTasksUsingSearch"
                  />
                </div>
                <div class="status flex-grow-1">
                  <select
                    class="form-select notFormatt"
                    style="box-shadow: none"
                    v-model="filter.statusSelect"
                  >
                    <option value="default" disabled>Select Status</option>
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="inReview">In Review</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
                <div class="priority flex-grow-1">
                  <select
                    class="form-select notFormatt"
                    style="box-shadow: none"
                    v-model="filter.prioritySelect"
                  >
                    <option value="default" disabled>Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div class="sortBy flex-grow-1">
                  <select
                    class="form-select notFormatt"
                    style="box-shadow: none"
                    v-model="filter.sortSelect"
                  >
                    <option value="default" disabled>Sort By</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div
                  class="clearAll d-flex align-items-center gap-2 btn btn-outline-light text-dark"
                  @click="ClearFilters"
                >
                  <div class="icon"><i class="bi bi-arrow-clockwise"></i></div>
                  <span>Clear Filters</span>
                </div>
              </form>
            </div>

            <div class="tableContainer position-relative border rounded">
              <div
                class="table-responsive rounded"
                style="
                  height: 380px;
                  overflow: auto;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                "
              >
                <table class="table">
                  <thead>
                    <tr>
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
                        scope="col"
                        style="background-color: #fafbfc; color: #727986; font-size: 14px"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        class="pe-4"
                        style="background-color: #fafbfc; color: #727986; font-size: 14px"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task of taskStore.tasks" :key="task._id" :class="task.status">
                      <td scope="row" class="tdTask" style="padding-left: 30px">
                        <div class="task">
                          <div class="title m-0" style="font-weight: 500">{{ task.name }}</div>
                          <div
                            class="describeTask text-muted m-0"
                            style="
                              font-size: 13px;
                              width: 200px;
                              text-overflow: ellipsis;
                              overflow: hidden;
                            "
                          >
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
                      <td class="createdAt">
                        <div class="text-muted mt-1">
                          {{ new Date(task.createdAt).toLocaleDateString("en-GB") }}
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

                <div
                  v-if="!hasActiveFilters && taskStore.tasks.length === 0"
                  class="position-absolute noTasksMessage"
                  style="left: 50%; top: 52%; transform: translate(-50%, -50%)"
                >
                  <div class="image text-center mb-2">
                    <img
                      src="/public/noTasks.png"
                      class="img-fluid"
                      style="width: 180px"
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

              <div
                v-if="hasActiveFilters && taskStore.tasks.length === 0"
                class="position-absolute noTasksMessage"
                style="left: 50%; top: 52%; transform: translate(-50%, -50%)"
              >
                <div class="image text-center mb-2">
                  <img
                    src="/public/searchTasks.png"
                    class="img-fluid"
                    style="width: 180px"
                    alt="No Tasks"
                  />
                </div>
                <div class="message text-center">
                  <h4 class="m-0 mb-1">No tasks match your filters</h4>
                  <p class="text-muted small">
                    Try adjusting your search or filters, or create a new task.
                  </p>
                </div>
                <div
                  class="clearAll d-flex align-items-center mx-auto gap-2 btn btn-light border text-dark"
                  @click="ClearFilters"
                  style="width: fit-content"
                >
                  <div class="icon"><i class="bi bi-arrow-clockwise"></i></div>
                  <span>Clear Filters</span>
                </div>
              </div>
              <div
                class="pagination p-3 pt-0 d-flex justify-content-between align-items-center flex-column flex-lg-row"
                style="width: 100%"
                v-if="taskStore.tasks.length > 0"
              >
                <div class="details text-muted" v-if="taskStore.pagination">
                  Showing {{ taskStore.pagination.currentPage }}-{{
                    taskStore.pagination.totalPages
                  }}
                  of {{ taskStore.pagination.totalItems }} tasks
                </div>
                <div class="buttons d-flex align-items-center gap-2">
                  <button
                    class="prevButton btn"
                    :disabled="!taskStore.pagination.hasPrevPage"
                    @click="goToPage(taskStore.pagination.currentPage - 1)"
                  >
                    Previous
                  </button>
                  <div class="numbersOfPage d-flex gap-2 align-items-center" v-if="pages[0]">
                    <div
                      class="page d-flex justify-content-center align-items-center btn"
                      :class="{ active: page === taskStore.pagination.currentPage }"
                      v-for="page of pages"
                      :key="page"
                      style="width: 40px; height: 30px; cursor: pointer"
                      @click="goToPage(page)"
                    >
                      {{ page }}
                    </div>
                  </div>
                  <button
                    class="nextButton btn"
                    :disabled="!taskStore.pagination.hasNextPage"
                    @click="goToPage(taskStore.pagination.currentPage + 1)"
                  >
                    Next
                  </button>
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
                            <div
                              class="value py-1 px-2 rounded small"
                              :style="{
                                backgroundColor:
                                  task.status === 'todo'
                                    ? '#E6F1FE'
                                    : task.status === 'inProgress'
                                      ? '#F1ECFD'
                                      : task.status === 'inReview'
                                        ? '#E3FAF4'
                                        : '#E1F7E4',

                                color:
                                  task.status === 'todo'
                                    ? '#2469FC'
                                    : task.status === 'inProgress'
                                      ? '#895CF5'
                                      : task.status === 'inReview'
                                        ? '#0B8878'
                                        : '#298B30',
                              }"
                            >
                              {{
                                task.status === "todo"
                                  ? "To Do"
                                  : task.status === "inProgress"
                                    ? "In Progress"
                                    : task.status === "inReview"
                                      ? "In Review"
                                      : "Completed"
                              }}
                            </div>
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
                            <div class="header text-muted mb-1">Priority</div>
                            <div
                              class="value py-1 px-2 rounded small"
                              :style="{
                                backgroundColor:
                                  task.priority === 'low'
                                    ? '#F1FBF3'
                                    : task.priority === 'medium'
                                      ? '#FEF3D6'
                                      : '#FEE5E4',

                                color:
                                  task.priority === 'low'
                                    ? '#26B653'
                                    : task.priority === 'medium'
                                      ? '#FEA112'
                                      : '#EA454B',
                              }"
                            >
                              {{
                                task.priority === "low"
                                  ? "Low"
                                  : task.priority === "medium"
                                    ? "Medium"
                                    : "High"
                              }}
                            </div>
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
                            <div class="value">
                              {{ new Date(task.dueDate).toLocaleDateString("en-GB") }}
                            </div>
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
                            <div class="value">
                              {{ new Date(task.createdAt).toLocaleDateString("en-GB") }}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light border" data-bs-dismiss="modal">
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
                      <h1 class="modal-title fs-5" :id="`idModalEdit-${task._id}`">Edit Task</h1>
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
                                  <div class="invalid-feedback">Please provide a valid city.</div>
                                </div>
                              </div>
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
                                  <div class="invalid-feedback">Please provide a valid city.</div>
                                </div>
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
                                          ><i class="bi bi-hourglass-split status-progress"></i>
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
                                  <div class="invalid-feedback">Please provide a valid city.</div>
                                </div>
                              </div>
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
                            <div class="details flex-grow-1">
                              <div class="value">
                                <div>
                                  <label for="taskPriority" class="form-label header text-muted"
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
                                          ><i class="bi bi-chevron-double-down low-priority"></i>
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
                                          ><i class="bi bi-chevron-double-up high-priority"></i>
                                        </span>
                                        <span class="option-label">High</span>
                                      </option>
                                    </select>
                                  </p>
                                  <div class="invalid-feedback">Please provide a valid city.</div>
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
                                  <div class="invalid-feedback">Please provide a valid city.</div>
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
                    <button type="button" class="btn btn-light border" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary" @click.prevent="updateTheTask">
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
                        style="width: 50px; height: 50px; background-color: #e8effd; color: #125ffb"
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
                          <label class="form-check-label" for="statusProgress"> In Progress </label>
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
                          <label class="form-check-label" for="statusReview"> In Review </label>
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
                          <label class="form-check-label" for="statusComplete"> Completed </label>
                        </div>
                      </form>
                    </div>
                    <div class="message text-danger mt-2 small">{{ statusTaskError }}</div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light border" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary" @click.prevent="updateTheTask">
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

                    <div class="taskDetails p-3 border rounded" style="background-color: #f8f9fd">
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
                    <button type="button" class="btn btn-light border" data-bs-dismiss="modal">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

// Define the store
const taskStore = useTaskStore();

// Define the variables of select
const filter = ref({
  searchInput: "",
  statusSelect: "default",
  prioritySelect: "default",
  sortSelect: "default",
});

let timer;

const FilterTasksUsingSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    await taskStore.getTasks(filter.value, { limit: 4 });
  }, 500);
};

const updateTasks = async () => {
  await taskStore.getTasks(filter.value);
};

const ClearFilters = async () => {
  clearTimeout(timer);

  filter.value = {
    searchInput: "",
    statusSelect: "default",
    prioritySelect: "default",
    sortSelect: "default",
  };
};

watch(
  () => [filter.value.statusSelect, filter.value.prioritySelect, filter.value.sortSelect],

  () => {
    updateTasks();
  },
);

const hasActiveFilters = computed(() => {
  return (
    filter.value.searchInput ||
    filter.value.statusSelect !== "default" ||
    filter.value.prioritySelect !== "default"
  );
});

const goToPage = async (page) => {
  await taskStore.getTasks(filter.value, { page: page, limit: 4 });
};

const pages = computed(() => {
  const total = taskStore.pagination.totalPages;
  const current = taskStore.pagination.currentPage;

  if (total <= 3) {
    const result = [];

    for (let i = 1; i <= total; i++) {
      result.push(i);
    }

    return result;
  }

  if (current === 1) {
    return [1, 2, 3];
  }

  if (current === total) {
    return [total - 2, total - 1, total];
  }

  return [current - 1, current, current + 1];
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
  },
);

const updateTheTask = async () => {
  const data = await taskStore.updateTask(updateTask.value);

  if (data.success) {
    toast.success("Task updated successfully.");
    await taskStore.getTasks();
  } else {
    updateTaskError.value = data.errors.task;
    toast.error("Unable to update the task. Please try again.");
  }
};

const delTaskError = ref("");

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
    await taskStore.getTasks();
  } else {
    closeModal(taskId);
    toast.error("Unable to delete the task. Please try again.");
    delTaskError.value = data.errors.task;
  }
};

onMounted(async () => {
  await taskStore.getTasks();
  console.log(taskStore.pagination);
  console.log(pages.value);
});
</script>

<style lang="scss" scoped>
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

.noTasksMessage {
  @media (max-width: 767px) {
    .message {
      width: 250px !important;
    }
  }
}

.pagination {
  @media (max-width: 990px) {
    gap: 20px;
  }
  .buttons {
    .prevButton,
    .nextButton,
    .page {
      background-color: #fefefe !important;
      border-color: #e8ebef !important;
      &:hover,
      &:focus {
        background-color: #e8ebef !important;
      }
    }

    .page.active {
      background-color: #1a6cfd !important;
      color: white !important;
    }
  }
}

.dropdown-toggle::after {
  content: none;
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
    background-color: #fee5e4;
    color: #ea454b;
  }
}

.modal.fade {
  background-color: transparent !important;

  @media (max-width: 767px) {
    transform: translateY(-35%) !important;
  }
}

select,
::picker(select) {
  appearance: base-select;
}

.notFormatt {
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
