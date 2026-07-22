# My Day — Todo App

A task management application built with **Angular 21** using modern reactive patterns including Signals, computed state, and reactive forms. Tasks are persisted automatically via `localStorage`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 |
| Language | TypeScript 5.9 |
| Reactivity | Angular Signals + `computed` + `effect` |
| Forms | Angular Reactive Forms |
| Persistence | localStorage |
| Styling | CSS3 |
| Package Manager | npm 10.9.2 |

---

## Features

- Add tasks by typing and pressing `Enter`
- Mark tasks as completed via checkbox
- Inline editing by double-clicking a task
- Delete individual tasks
- Clear all completed tasks at once
- Filter tasks by: **All**, **Pending**, or **Completed**
- Task count indicator in the footer
- Persistent state across page reloads via `localStorage`

---

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── task.model.ts        # Task interface definition
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.ts          # Main task management component
│   │   │   ├── home.html        # Task list UI template
│   │   │   └── home.css         # Home page styles
│   │   └── labs/
│   │       ├── labs.ts          # Angular signals & forms sandbox
│   │       ├── labs.html        # Labs template
│   │       └── labs.css         # Labs styles
│   ├── app.ts                   # Root component
│   ├── app.html                 # Root template
│   ├── app.css                  # Global component styles
│   ├── app.config.ts            # Application configuration
│   └── app.routes.ts            # Route definitions
├── main.ts                      # Application entry point
├── index.html                   # HTML shell
└── styles.css                   # Global styles
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 10

### Installation

```bash
# Clone the repository
git clone https://github.com/pakolalo/todoApp-Angular.git
cd todo-app

# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server
npm start

# Production build
npm run build

# Build in watch mode (development)
npm run watch

# Run unit tests
npm test
```

The app will be available at `http://localhost:4200`.

---

## Data Model

```typescript
interface Task {
  id: number;         // Unique identifier (timestamp-based)
  title: string;      // Task display text
  completed: boolean; // Completion status
  editing?: boolean;  // Inline editing mode flag
}
```

---

## Architecture Notes

- **Signals** are used as the primary state management mechanism, replacing traditional RxJS-based state for local component state.
- **`computed()`** derives the filtered task list reactively without manual subscriptions.
- **`effect()`** handles `localStorage` persistence as a side effect, scoped via the component's `Injector`.
- The `labs` page serves as an Angular features sandbox (signals, reactive forms, event handling) and is not part of the production task flow.
