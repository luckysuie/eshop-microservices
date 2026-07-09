# ShopEase Frontend

React + Vite single-page application for the ShopEase e-commerce platform.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to backend services |
| Bootstrap 5 | CSS framework for styling |
| Context API | Global state (Auth + Cart) |

## Pages

| Route | Description | Auth Required |
|-------|-------------|--------------|
| `/` | Home / landing page | No |
| `/products` | Browse all products | No |
| `/products/:id` | Product detail page | No |
| `/login` | Login form | No |
| `/register` | Registration form | No |
| `/cart` | Shopping cart | Yes |
| `/checkout` | Place order & pay | Yes |
| `/orders` | View past orders | Yes |

## Running Locally

### Prerequisites
- Node.js 20+
- npm

### Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env to point to your running backend services
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Running with Docker

```bash
# Build the Docker image
docker build -t shopease-frontend .

# Run the container
docker run -p 80:80 shopease-frontend
```

The app will be available at [http://localhost](http://localhost)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_USER_SERVICE_URL` | User service base URL | `http://localhost:8081` |
| `VITE_PRODUCT_SERVICE_URL` | Product service base URL | `http://localhost:8082` |
| `VITE_ORDER_SERVICE_URL` | Order service base URL | `http://localhost:8083` |
| `VITE_PAYMENT_SERVICE_URL` | Payment service base URL | `http://localhost:8084` |

> **Note:** Vite env vars must start with `VITE_` to be accessible in the browser.

## Project Structure

```
frontend/
├── src/
│   ├── context/        # Auth and Cart global state
│   ├── services/       # Axios calls to each microservice
│   ├── components/     # Shared components (Navbar, Footer, etc.)
│   └── pages/          # One file per route
├── Dockerfile          # Multi-stage Docker build
├── nginx.conf          # Nginx config for Docker
└── vite.config.js      # Vite configuration
```
