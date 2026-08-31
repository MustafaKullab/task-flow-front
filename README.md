# Task Flow

Task Flow is a modern and responsive task management web application built with Vue 3. It helps users create, organize, manage, and track their tasks through a clean and intuitive interface.

The application provides task management tools, dashboard statistics, authentication, profile management, and responsive user interfaces for desktop and mobile devices.

---

## ✨ Features

### Task Management

- Create new tasks
- View task details
- Edit task information
- Change task status
- Delete tasks
- Assign task priority
- Set task due dates
- Add task descriptions

### Task Organization

- Search tasks
- Filter tasks by status
- Filter tasks by priority
- Sort tasks
- Pagination
- Clear filters
- User-friendly empty states

### Dashboard

- Display total task count
- Display task statistics by status
- Visualize task distribution using a doughnut chart
- Responsive dashboard layout

### Authentication

- User registration
- Email verification
- User login
- Forgot password
- Password reset
- Access token and refresh token authentication
- Protected routes

### Profile Management

- View account information
- Update username
- Update email
- Change password
- Update profile picture
- View account creation date
- View verification status
- View account role

### UI & UX

- Responsive design
- Mobile-friendly layouts
- Reusable components
- Bootstrap-based interface
- Form validation and helpful error messages
- Success and error notifications
- Confirmation modals
- Task status and priority color system

---

## 🛠️ Tech Stack

### Frontend

- Vue 3
- Vite
- Pinia
- Vue Router
- Bootstrap 5
- Bootstrap Icons
- SCSS
- Vue Datepicker
- Chart.js
- Vue Chart.js
- Fetch API

### Development Tools

- ESLint
- Oxlint
- Prettier / Oxfmt

---

## 📁 Project Structure

```text
src/
├── assets/
│   ├── global.css
│   └── logo.svg
│
├── components/
│   ├── NavBar.vue
│   ├── SideBar.vue
│   ├── TaskOverviewChart.vue
│   └── TopBar.vue
│
├── composables/
│   └── useFetchWithRefresh.js
│
├── router/
│   └── index.js
│
├── stores/
│   ├── authStore.js
│   ├── taskStore.js
│   └── userStore.js
│
├── views/
│   ├── CreateTask.vue
│   ├── DashboardPage.vue
│   ├── ForgotPassword.vue
│   ├── MyTasks.vue
│   ├── ProfilePage.vue
│   ├── ResetPassword.vue
│   ├── SignIn.vue
│   ├── SignUp.vue
│   └── VerifyEmail.vue
│
└── main.js
```

---

## 🔐 Authentication Flow

Task Flow uses access and refresh tokens stored in HTTP-only cookies.

The general authentication flow is:

```text
User
 │
 ├── Sign Up
 │
 ├── Email Verification
 │
 └── Sign In
       │
       ├── Access Token
       └── Refresh Token
              │
              ▼
        Authenticated Requests
              │
              ▼
        Protected Routes
```

The frontend communicates with the backend through API requests and automatically attempts to refresh the access token when an authenticated request returns `401 Unauthorized`.

---

## 🧭 Route Protection

Protected application pages require authentication.

Protected routes include:

```text
/homePage
/myTasks
/createTask
/profile
```

Public routes include:

```text
/signup
/signin
/verifyEmail/:userId
/forgotPassword
/resetPassword/:userId
```

Vue Router navigation guards are used to prevent unauthenticated users from accessing protected pages.

---

## 🔄 API Communication

The application uses the Fetch API to communicate with the backend.

Authenticated requests include credentials so that HTTP-only cookies can be sent with API requests.

A reusable composable is used to handle authenticated requests and refresh the access token when necessary:

```text
useFetchWithRefresh.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

For the deployed frontend, the `VITE_API_URL` environment variable should point to the deployed backend API.

Example:

```env
VITE_API_URL=https://task-flow-back.onrender.com
```

> Do not commit your `.env` file to GitHub.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/MustafaKullab/task-flow-front.git
```

### Navigate to the Project

```bash
cd task-flow-front
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### Run the Development Server

```bash
npm run dev
```

The development server will start using Vite.

---

## 📦 Production Build

To create a production build:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

---

## 🌐 Live Demo

### Frontend

https://task-flow-front-gilt.vercel.app

### Backend API

https://task-flow-back.onrender.com

---

## 👤 Demo Account

You can use the following demo account to explore the application:

```text
Email: demo@taskflow.app
Password: demo123
```

---

## 📱 Responsive Design

Task Flow is designed to provide a consistent experience across:

- Desktop
- Tablet
- Mobile devices

The interface includes responsive layouts for the dashboard, task tables, forms, modals, profile pages, and authentication pages.

---

## 🎨 Task Status

Task statuses used in the application:

| Status | Value |
|---|---|
| To Do | `todo` |
| In Progress | `inProgress` |
| In Review | `inReview` |
| Completed | `done` |

---

## 🎯 Task Priority

Task priorities used in the application:

| Priority | Value |
|---|---|
| Low | `low` |
| Medium | `medium` |
| High | `high` |

---

## 📌 Main Application Pages

| Page | Description |
|---|---|
| Sign Up | Create a new user account |
| Verify Email | Verify the user's email address |
| Sign In | Authenticate an existing user |
| Forgot Password | Request a password reset |
| Reset Password | Set a new password |
| Dashboard | View task statistics and recent tasks |
| My Tasks | Search, filter, sort, paginate, and manage tasks |
| Create Task | Create a new task |
| Profile | Manage account information and profile settings |

---

## 🏗️ Application Architecture

The frontend follows a component-based architecture:

```text
Views
 │
 ├── Components
 │
 ├── Pinia Stores
 │
 ├── Composables
 │
 └── Vue Router
        │
        ▼
     Backend API
```

### Main Responsibilities

**Views**

Handle page-level UI and user interactions.

**Components**

Provide reusable interface elements such as the sidebar, top bar, navigation bar, and task statistics chart.

**Pinia Stores**

Manage application state and handle task and user-related API operations.

**Composables**

Provide reusable logic for authenticated API requests.

**Vue Router**

Handles navigation and protected routes.

---

## 🔗 Related Repository

Backend repository:

https://github.com/MustafaKullab/task-flow-back

---

## 📄 License

This project was developed for educational and portfolio purposes.
