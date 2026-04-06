# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Vercel Deployment

1. Push the `frontend` code to GitHub.
2. Import the repository into Vercel.
3. Set the project root to `frontend`.
4. Use the default Vite build command: `npm run build`.
5. Set the output directory to `dist`.
6. Add environment variables in Vercel:
	- `VITE_API_BASE_URL` = your deployed backend URL
	- `VITE_GOOGLE_CLIENT_ID` = your Google OAuth client ID
7. Deploy. The included `vercel.json` handles SPA route rewrites.
