# Task Track

Task Track is a web-based task management application that allows users to track, manage, and organize their tasks efficiently. It features a dashboard with monthly task statistics, personalized task lists with tags, and user account and theme configuration options. Built with React, TypeScript, and TailwindCSS, this project leverages Vite for fast development, TanStack Query for data fetching, and Context API for authentication and settings management.

## Features

### Authentication
- **User Registration, Login, and Logout**: Simple and secure user authentication.
- **User Deletion**: Users can delete their account by confirming their action with a secure text-based prompt (`username delete my account`).
- **Auth Context Management**: Manages authentication state across the application using React Context API.

### Dashboard
- **Monthly Statistics**: 
  - Shows the total number of completed, pending, and active tasks for the current month.
  - Displays key task insights, including the next active task, the most recently completed task, and the most recent pending task.
- **Task Completion Graph**: A line chart showing the number of tasks completed on each day of the month, helping users visualize their productivity over time.

### Task Management
- **Task Creation and Editing**:
  - Create tasks with the following attributes: `title`, `description`, `tag`, `initialDate`, and `endDate`.
  - Edit or delete tasks, and mark them as completed or pending (toggleable).
- **Task Filtering by Status and Tags**:
  - View lists of active, pending, and completed tasks.
  - Filter tasks by tags, allowing users to see all tasks associated with a specific tag.
- **Dynamic Task Lists**: Task lists are dynamically organized by status and user-defined tags.

### User Profile
- **User Info**: Displays the user's name, profile picture, and email.
- **Account Management**:
  - **Logout**: Secure logout button.
  - **Delete Account**: Opens a modal for account deletion confirmation; users must type `username delete my account` to confirm.

### Configuration
- **Dark Mode**: Toggle between light and dark themes.
- **Primary Color Selection**: Customize the primary color of the interface from a variety of options.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: TailwindCSS for responsive and modern styling.
- **State Management**:
  - **TanStack Query**: For efficient server state and request management.
  - **Context API**: For managing authentication and settings contexts.
- **Development**: Vite for fast builds and a streamlined development experience.
