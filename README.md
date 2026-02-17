# Source Sensitive

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b7ffcbc-fd49-428b-abad-f710f68ced8b" alt="screen shot in dark mode" height="240" />
  <img src="https://github.com/user-attachments/assets/8c2f7356-7ef9-47cc-9390-c6ad5f83116b" alt="screen shot in light mode" height="240" />
</p>

Source Sensitive is a Star Wars-themed wiki frontend built with React and TypeScript.
It consumes a SWAPI-compatible backend and lets users browse and search:

- Films
- People
- Planets
- Species
- Starships
- Vehicles

It includes list pages with search and pagination, detail pages for each resource, linked related resources, and a light/dark theme toggle.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Axios
- React Bootstrap + Bootstrap
- Sass
- ESLint
- Netlify (deployment target)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file from `.env-example` and set:

```env
VITE_API_BASE_URL=https://your-api-base-url
```

Example backend base URL format:

```text
https://your-api.example.com
```

The app expects endpoints such as `/films`, `/people`, `/planets`, `/species`, `/starships`, and `/vehicles`.

### 3. Start development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build locally
- `npm run check:0-lint` - Run ESLint
- `npm run check:1-tsc` - Run TypeScript type checks
- `npm run check:2-type-coverage` - Enforce 100% type coverage
- `npm run check` - Run all checks

## Project Structure

```text
src/
  components/    Reusable UI components
  contexts/      React context providers (theme)
  hooks/         Custom hooks (data fetching, pagination, theme)
  lib/           Shared API client setup
  pages/         Route-level pages and detail views
  services/      API resource functions
  types/         Shared and SWAPI resource types
```

## Build and Deploy

This project is configured for Netlify via `netlify.toml`:

- Build command: `tsc && vite build`
- Publish directory: `dist`
- SPA fallback redirect to `index.html`
