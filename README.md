# microfrontend-shell

## Purpose
The **Shell** is the host application that provides the main layout, navigation, and routing. It loads the **Products** and **Orders** micro‑frontends at runtime via **Module Federation**.

## Architecture diagram
```
                    ┌──────────────────────┐
                    │        SHELL         │
                    │       :5000          │
                    │       HOST           │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
       ┌──────────────────┐       ┌──────────────────┐
       │     PRODUCTS     │       │      ORDERS      │
       │      :5001       │       │       :5002      │
       │      REMOTE      │       │       REMOTE     │
       └──────────────────┘       └──────────────────┘
                 │                           │
                 ▼                           ▼
          Products.jsx                 Orders.jsx
```

## Module Federation host configuration
```js
// vite.config.js (excerpt)
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        products: 'http://localhost:5001/assets/remoteEntry.js',
        orders:   'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    })
  ],
  server: { port: 5000 },
});
```
- **Products remote URL** – `http://localhost:5001/assets/remoteEntry.js`
- **Orders remote URL** – `http://localhost:5002/assets/remoteEntry.js`

## How the Shell loads remote applications
```js
const Products = lazy(() => import('products/Products'));
const Orders   = lazy(() => import('orders/Orders'));
```
These lazy imports are used in the router configuration. While loading, a fallback UI is shown. If a remote fails to load, an error boundary displays a friendly message.

## Quick start
```bash
cd microfrontend-shell
npm install          # install dependencies
npm run dev          # start dev server on http://localhost:5000
```

## Development commands
- `npm run dev` – start Vite dev server (port 5000)
- `npm run build` – create a production build in `dist/`
- `npm run preview` – locally preview the production build

## Production build
```bash
npm run build   # outputs to ./dist
npm run preview # serves the built app
```
The built shell expects the remote `remoteEntry.js` files to be reachable at the URLs configured above. For production, replace those URLs with the CDN or server locations where the remote bundles are hosted.

## Changing remote URLs for production
Edit the `remotes` section in `vite.config.js`:
```js
remotes: {
  products: 'https://cdn.example.com/products/remoteEntry.js',
  orders:   'https://cdn.example.com/orders/remoteEntry.js',
}
```
Re‑build and redeploy the shell after changing the URLs.

## GitHub repository
[https://github.com/Atul4ray/microfrontend-shell](https://github.com/Atul4ray/microfrontend-shell)
