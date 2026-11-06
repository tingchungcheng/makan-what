# MakanWhat

The first development slice is a responsive Explore experience for MakanWhat. It is intentionally running on local mock restaurant data while the backend contract is established. The UI includes:

- Location-aware Explore shell with map pulse card
- Natural-language search interaction that maps to structured demo filters
- Restaurant cards with save / taste-trail state
- Calendar, Activity, and Profile views
- Expense quick-add modal
- Responsive desktop and mobile navigation
- Motion system built from CSS transitions, staged reveals, tilt interactions, and native animation primitives

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Environment

`env.dev` is reserved for server-side integrations. It must not be imported into browser code or exposed through a `VITE_` variable. The current client intentionally uses mock data so OpenAI and Google credentials are not needed to preview the experience.

When the backend is added, use `env.dev.example` as the shape for a local server environment and route Places / OpenAI calls through the backend.

## Native app foundation

The iOS-first mobile implementation now lives in [`mobile/`](mobile/). It is a portrait-first Expo app with an immersive Explore screen, a native bottom navigation shell, glass surfaces, and a floating concierge sheet. The browser preview remains available as a design reference.
