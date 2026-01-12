# Web App (apps/web)

Scaffold for a web frontend (recommended: React + TypeScript + Vite).

To install dependencies:

- Use pnpm at repository root: `pnpm install`
- Run dev server: `pnpm --filter @automation/web dev`

Files:
- `src/` — application source
- `package.json` — scripts

OpenAI integration:

This project includes a simple Vercel serverless endpoint at `api/generate-image` that proxies requests to OpenAI Image Generation. Set the `OPENAI_API_KEY` environment variable in your local environment (or in the Vercel project settings) to enable image generation.

Example (local):
- export OPENAI_API_KEY="sk-..."
- Start the app and POST to `/api/generate-image` with `{ "prompt": "A funny robot" }`
