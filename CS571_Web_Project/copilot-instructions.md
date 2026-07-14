# Copilot Instructions for CS571 Web Project

## Project goals
- Build a client-only React application.
- Do not use server-side rendering, server components, or Next.js.
- Use plain React with JavaScript.
- Use React Bootstrap for UI components.
- Use React Router in declarative mode for navigation.
- Keep the app deployable to GitHub Pages.

## Stack
- Vite for local development and production builds.
- React 18
- React Bootstrap
- React Router DOM
- GitHub Pages deployment via the `gh-pages` package

## Development rules
- Prefer simple, component-based React code.
- Use functional components and hooks when needed.
- Keep navigation declarative with React Router `Routes` and `Route`.
- Avoid any server-side framework or backend dependency.
- Ensure assets and routes are compatible with GitHub Pages hosting.

## Deployment notes
- Build output is generated into the `dist` folder.
- Use the `npm run deploy` command to publish to GitHub Pages.
- The Vite base path is configured for this repository name.
