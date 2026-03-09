# SpaceX Mission Control

Homewrok 16 - React based SpaceX website

## Features

- **Home Page** — Overview and countdown to the next SpaceX launch
- **Launches** — Paginated, searchable and filterable list of all SpaceX missions with a launches-per-year chart
- **Launch Detail** — Mission patch, rocket info, failure details, and YouTube link
- **Ships** — Infinite scroll list of SpaceX ships with search
- **Ship Detail** — Ship information including roles, home port, and mission count
- **Dark / Light Mode** — Theme toggle with localStorage persistence

## Tech Stack

- [React 18](https://react.dev/) with TypeScript
- [React Router v6](https://reactrouter.com/) — routing and URL sync
- [TanStack Query](https://tanstack.com/query) — data fetching and caching
- [SpaceX API v4](https://github.com/r-spacex/SpaceX-API) — public REST API
- [Recharts](https://recharts.org/) — launches per year bar chart
- CSS Modules — scoped component styling

## Architecture

- `src/api/` — fetch functions for all SpaceX endpoints
- `src/components/` — shared reusable components
- `src/context/` — ThemeContext with useReducer for dark/light mode
- `src/hoc/` — withErrorBoundary higher-order component
- `src/hooks/` — custom hooks 
- `src/pages/` — page components
- `src/types/` — TypeScript interfaces
- `src/styles/` — global styles, CSS variables, fonts

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/dj-pmfst/spacex-mission-control.git
   cd spacex-mission-control
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the server
   ``` 
   npm run
   ```

4. Open [http://localhost:5173](http://localhost:5173)

### Build for production
```
npm run build
```


## Notes

The SpaceX API v4 has not been updated since late 2022 so upcoming launch data may reflect outdated information. All other launch and ship data is accurate to the last API update.
