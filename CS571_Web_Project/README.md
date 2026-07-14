# CS571 Web Project

This project is a client-only React application built with Vite, React Bootstrap, and React Router. It is designed to be deployed to GitHub Pages without using Next.js or any server-side rendering.

## What this project includes

The app is organized around these important files:

- [index.html](index.html) - the main HTML entry point for the app
- [package.json](package.json) - defines the project dependencies and build scripts
- [vite.config.js](vite.config.js) - configures Vite and the GitHub Pages build output
- [src/main.jsx](src/main.jsx) - loads the React app into the page
- [src/App.jsx](src/App.jsx) - the main React component
- [src/pages/Home.jsx](src/pages/Home.jsx) and [src/pages/About.jsx](src/pages/About.jsx) - example pages
- [docs/index.html](docs/index.html) - the generated production output used by GitHub Pages

## Step-by-step setup

### 1. Create the project structure

Make sure these files exist in your project folder:

- index.html
- package.json
- vite.config.js
- src/main.jsx
- src/App.jsx
- src/index.css
- src/pages/Home.jsx
- src/pages/About.jsx

If you are starting from scratch, create the folders first:

```bash
mkdir -p src/pages
```

### 2. Create the package file

The [package.json](package.json) file should include dependencies for React, Vite, and React Router:

```json
{
  "name": "cs571-web-project",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.0",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "vite": "^5.4.10"
  }
}
```

### 3. Create the HTML entry file

The [index.html](index.html) file should include the root container:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CS571 Web Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4. Create the Vite config

The [vite.config.js](vite.config.js) file should set the correct base path for GitHub Pages and send the production build to the docs folder:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../docs'
  }
});
```

### 5. Install dependencies

Run:

```bash
npm install
```

This installs React, Vite, Bootstrap, and Router packages.

### 6. Start the development server

Run:

```bash
npm run dev
```

Open the local address shown by Vite in your browser.

### 7. Build the production files

Run:

```bash
npm run build
```

This creates the published files in the [docs](docs) folder.

## GitHub Pages deployment

To publish the app:

1. Make sure the generated files are in [docs](docs).
2. Commit the changes.
3. Push to GitHub.
4. In the repository Settings, go to Pages.
5. Set the source to:
   - Branch: your main branch
   - Folder: /docs

## Notes

- This app is client-side only.
- No server-side rendering is used.
- The production build is written to the docs folder so GitHub Pages can serve it.
