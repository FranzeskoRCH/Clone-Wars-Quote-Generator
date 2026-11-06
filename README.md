# Clone Wars Quote Generator

React, TypeScript, and Vite frontend for the Star Wars: The Clone Wars quotes API. The repository is organized so the frontend and Flask API can be deployed as two Vercel projects from the same GitHub repository.

## Local development

Use Node.js 20+ and Python 3.12+.

1. If this is a fresh checkout, create the Python environment from the repository root with `./create_env.sh` (Windows: `create_env.bat`). Then activate it and run Flask:

   ```bash
   source venv/bin/activate
   python main.py
   ```

2. In a second terminal, install and start the frontend:

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

Vite proxies frontend API calls to Flask at `127.0.0.1:5000`. The database is created from the checked-in SQL files if it does not already contain quotes.

## Deploy to Vercel

Deploy the same GitHub repository as two Vercel projects. Vercel supports configuring a separate root directory for each project in a monorepo ([monorepo documentation](https://vercel.com/docs/monorepos)).

### 1. Deploy the API

- Import the repository as a Vercel project named, for example, `clone-wars-quotes-api`.
- Leave **Root Directory** at the repository root and set **Framework Preset** to Flask.
- Vercel detects the Flask app exported as `app` from `main.py`. The root `vercel.json` includes the SQL files in the Python function bundle.
- Deploy and copy the API's production URL, for example `https://clone-wars-quotes-api.vercel.app`.
- Add `FRONTEND_ORIGINS` as an environment variable with the frontend's exact production origin, such as `https://clone-wars-quotes.vercel.app`. Separate multiple allowed origins with commas.

### 2. Deploy the frontend

- Import the same repository as a second Vercel project, for example `clone-wars-quotes`.
- Set **Root Directory** to `frontend` and **Framework Preset** to Vite.
- Use build command `npm run build` and output directory `dist`.
- Add `VITE_API_BASE_URL` with the API production URL from step 1, without a trailing slash.
- Deploy. The `frontend/vercel.json` rewrite supports React Router deep links such as `/quote/1` ([Vercel's Vite SPA guidance](https://vercel.com/docs/frameworks/frontend/vite)).

After Vercel assigns the frontend's production domain, make sure that exact origin is included in the API project's `FRONTEND_ORIGINS` setting, then redeploy the API. Environment variables prefixed with `VITE_` are included in the frontend at build time, so redeploy the frontend after changing `VITE_API_BASE_URL`.

The API database is created under `/tmp` on each new serverless instance from the SQL files in the repository. This is suitable for this read-only quote catalog; it is not persistent storage for user data. The Flask app does not write quote changes.

## API routes

- `GET /quotes` — all quotes
- `GET /quotes/english` — English quotes
- `GET /quotes/<id>` — one quote by ID
- `GET /quotes/random/english` — a random English quote
- `GET /languages` — available languages

The frontend reads quotes from the API; it does not contain a hardcoded quote list. Favorites are stored in each visitor's browser with localStorage. The Contact page is a UI placeholder and does not send messages.

## License

This project is licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). Check that the license matches your intended use before publishing or using the project commercially.
