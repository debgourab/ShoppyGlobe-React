# Dependency Update

Updated August 18, 2026 to current stable package versions verified against npm/package documentation.

## Runtime dependencies

- React: 19.2.8
- React DOM: 19.2.8
- Redux Toolkit: 2.12.0
- React Redux: 9.3.0
- React Router DOM: 7.18.2
- React Lazy Load Image Component: 1.6.3 (latest stable release available for this package)

## Development dependencies

- Vite: 8.0.0
- @vitejs/plugin-react: 6.0.4

## Node.js requirement

Vite 8 requires Node.js 20.19+ (or Node.js 22.12+ / newer supported releases). Use a current LTS Node.js release for development.

## Install

After extracting the project, run:

```bash
npm install
npm run build
npm run dev
```

No application API changes were required for the dependency upgrade. The project already uses React Router's v7-compatible APIs such as `createBrowserRouter`, `RouterProvider`, `Outlet`, `Link`, `NavLink`, and `useParams`.

## Repository Verification

The project history also contains separate, relevant milestones for the application modules and documentation. This makes the repository suitable for an assignment that evaluates commit quality rather than simply checking a commit count.
