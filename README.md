# Ownr

A digital record for the things you own — a home, a condo, a car, whatever — and every project, repair, and improvement that's gone into them.

Think of it as a living history: who worked on what, how much it cost, what's still in progress, and what's just an idea you haven't started yet. Each property gets its own dashboard, its own project list, its own contractor history, and its own running total of what's been invested in it.

## What's in it

- **Home** — a daily-use dashboard for the currently selected property: a status overview, current projects with inline checklists, and a customizable side panel (quick notes, recent activity, or an upcoming-dates mini calendar)
- **Projects** — every project for the property, filterable by status (idea, researching, getting quotes, scheduled, in progress, completed)
- **Ideas** — the "someday" list: things you're thinking about but haven't committed to yet
- **People** — a contractor roster, automatically built from who's attached to which projects
- **Money** — completed vs. planned spending, broken down by category
- **History** — a chronological timeline of everything that's happened on the property
- **Add Project** — a form to log a new project against whichever property is currently selected
- **Multi-property support** — switch between properties (a house, a car, anything else) from the sidebar; everything on screen scopes to whichever one is selected

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Current status

This is an active work-in-progress, built as a learning project. Right now:

- All project data lives in-memory (`src/data/mockProjects.js` seeds it, then it's held in React state) — changes made while using the app are **not** persisted and reset on reload
- Quick notes and the Home side-panel selection persist across reloads via `localStorage`, since there's no backend yet
- There's no authentication and no real database — a Supabase-backed version is planned but not yet connected
- Checklist "typical tasks" are curated by hand rather than generated live by AI, which would require a backend to call an API from safely

## Project structure

```
src/
  App.jsx                 # top-level state, routing between pages, the Home view
  main.jsx                # app entry point
  data/mockProjects.js     # seed data for properties and projects
  lib/projectMeta.js       # shared status/category/date/cost helpers
  components/              # one file per page (ProjectsView, MoneyView, etc.)
                            # plus shared pieces (Sidebar, AddProjectModal, checklist UI)
```

## Development workflow

Changes go through a feature branch and a pull request — never committed directly to `master` — so they can run through CodeRabbit's automated review before merging.
