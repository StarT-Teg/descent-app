# Agentic Coding Guidelines for descent-app

## Project Overview

A React 18 web application for tracking and managing Descent board game sessions. It uses Google Sheets as a backend
data source. Bootstrapped with Create React App (CRA).

## Build, Lint, and Test Commands

### Development

```
npm start              # Start dev server (runs node scripts/start.js)
```

### Production

```
npm run build          # Build for production (runs node scripts/build.js --profile)
npm run start:prod     # Alias for npm run build
```

### Testing

```
npm test                    # Run all tests in watch mode
npm test -- --watchAll=false   # Run tests once (CI mode)
npm test -- --testPathPattern="MyFile"    # Run tests matching pattern
npm test -- --testNamePattern="my test"   # Run tests matching name
npm test -- src/path/to/file.test.tsx      # Run single test file
```

No test files currently exist in the codebase. The test infrastructure (Jest + react-testing-library) is installed but
unused.

### Linting

```
# ESLint is configured via CRA (extends react-app, react-app/jest).
# No custom ESLint config files exist (.eslintrc, .eslintignore).
# Run via CRA build/start scripts automatically, or manually:
npx eslint src/ --fix
```

## Code Style Conventions

### General Formatting

- **Indentation**: 4 spaces (not tabs). Follow existing file conventions.
- **Quotes**: Double quotes for strings in JSX and TypeScript. Single quotes elsewhere.
- **Semicolons**: Always used.
- **Trailing commas**: Always (ES5-friendly).
- **Line length**: No hard limit, but prefer wrapping at ~120 chars.
- **No Prettier config**: Prettier is not configured. Do not add it without team consensus.

### TypeScript

- Strict mode is enabled in `tsconfig.json`. No `any` types without a comment.
- Use explicit types for function parameters and return types, especially in hooks and utilities.
- Use `interface` for object shapes that may be extended; `type` for unions, intersections, and aliases.
- Interface naming: suffix with `Interface` (e.g., `HeroPlayerPicks`). Type alias naming: no suffix (
  e.g., `CurrentOverlordPicks`).
- Enum members use PascalCase (e.g., `OverlordBasicDecksEnum.BasicI`).
- Enum values use camelCase strings (e.g., `hero1 = 'hero1'`).
- Prefer named exports over default exports for types and utilities.
- Use `enum` for action type constants (e.g., `GameSaveReducerActionTypeEnum`).

### React Components

- Functional components only. No class components.
- Named exports for components (e.g., `export const Header = ...`).
- Use `React.FC` sparingly; prefer explicit prop types: `{children: ReactNode}`.
- Avoid anonymous default exports.
- Co-locate component-specific CSS modules in the same folder.

### Hooks

- Custom hooks must be prefixed with `use`.
- Custom hook files are placed in `src/helpers/hooks/` or `src/dataHooks/`.
- Prefer `react-query` (`useQuery`, `useMutation`) for data fetching over raw `useEffect`.

### Context

- Provide both the context value and a custom hook accessor: `useGameSaveContext`, `useGameSaveDispatchContext`.
- Throw an error if context is accessed outside its provider.
- Use `useReducer` with discriminated union action types for complex state.

### File and Folder Naming

- Components: PascalCase (e.g., `CampaignProgress.tsx`).
- Context and reducers: kebab-case for files, PascalCase for exported names (e.g., `game-save-context.tsx`).
- Helpers and utilities: camelCase (e.g., `mathHelpers.ts`).
- Barrel files: `index.ts` in each directory, re-exporting all public members.
- Test files: `{filename}.test.{ts,tsx}` or `{filename}.spec.{ts,tsx}`.

### CSS and Styling

- CSS Modules are used for component-scoped styles (e.g., `header.module.css`).
- Global utility classes via Tailwind CSS directives in `src/index.css`.
- Tailwind is used for layout, spacing, and responsive utilities.
- CSS Modules are used for component-specific, non-reusable styling.
- Avoid inline styles except for truly dynamic values.

### Imports and Exports

- Barrel files (`index.ts`) re-export everything from a module for clean public APIs.
- No barrel file for `src/shared/` that includes everything; each sub-module exports its own types.
- Use path aliases? Not configured. Use relative imports.
- Import order in files:
  1. React and framework imports
  2. Third-party library imports
  3. Internal app imports (context, components, helpers, dataHooks, shared)
  4. Type imports (`import type`)
- Use named imports from barrel files (
  e.g., `import { GameSaveReducerActionTypeEnum } from "./context/game-save-context-reducer"`).

### Error Handling

- Use `try/catch` for async operations. Let errors propagate to React Query's error state when appropriate.
- Context access outside providers: throw a descriptive error.
- Guard against `undefined`/`null` with explicit checks. Avoid non-null assertions (`!`).
- Prefer early returns over deeply nested conditionals.

### Data Adapters

- Raw Google Sheets data is adapted into typed interfaces in `src/dataHooks/dataAdapters/`.
- Adapter functions are named `{dataName}Adapter` or `{dataName}Adapted` (e.g., `heroesRawDataAdapter`).
- Return empty objects `{}` for missing data, not `null`.

### Google Sheets Integration

- API key and spreadsheet ID come from environment variables: `REACT_APP_GOOGLE_API_KEY`, `REACT_APP_GOOGLE_SHEETS_ID`.
- All data ranges are defined in `useGetData.tsx`.

## Architecture

```
src/
  App.tsx                  # Root component, routing, initial data loading
  index.tsx                # Entry point, providers
  index.css                # Global styles, Tailwind directives, fonts
  typings.d.ts             # Global type declarations (SVG modules, env vars)
  components/              # React components (organized by feature/page)
    shared/                # Reusable components (Button, Accordion, icons)
    HeroSheet/
    OverlordBench/
    Header/
    GoldButton/
    Modal/
    CampaignProgress/
    Settings/
    ExpansionsSettings/
    LoadingSpinner/
    BrButton/
    CommentButton/
    ChoosePlayerButtons/
    SuggestTranslationButton/
  context/                  # React context providers and reducers
    heroes-data-context.tsx
    overlord-data-context.tsx
    game-save-context.tsx
    *-reducer.ts           # Reducers with discriminated union actions
  dataHooks/               # Data fetching hooks (react-query based)
    dataAdapters/          # Google Sheets data transformation
  helpers/                  # Pure utility functions
    hooks/                 # Custom React hooks
    translationHelpers.ts
    mathHelpers.ts
    heroesHelpers.ts
    selectHelpers.tsx
  shared/                  # Shared types, constants, enums
    google-sheet-data-raw.ts
    google-sheet-data-adapted.ts
    local-state-types.ts
    select-types.ts
    overlord-types.ts
    global-constants.ts
```

## Key Dependencies

- **React 18** with TypeScript
- **React Router 6** for routing
- **React Query v3** for server state management
- **Axios** for HTTP requests
- **Tailwind CSS** for utility styling
- **CSS Modules** for component-scoped styles
- **Google Sheets API** as the data backend
- **Lodash** for utility functions
- **react-select** for dropdown components
- **classnames** for conditional CSS class names

## Environment Variables

```
REACT_APP_BASE_PATH        # Optional base path for routing
PUBLIC_URL                 # Set by CRA, public URL
REACT_APP_GOOGLE_API_KEY  # Google Sheets API key
REACT_APP_GOOGLE_SHEETS_ID # Target spreadsheet ID
```
