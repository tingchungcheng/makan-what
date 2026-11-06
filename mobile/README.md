# MakanWhat Mobile

This is the native iOS-first foundation for the app. It is intentionally portrait-first and uses a single immersive Explore screen rather than a desktop dashboard layout.

## Start

```bash
cd mobile
npm install
npx expo start
```

Use a supported Node.js LTS release for the current Expo SDK (Node 22 LTS is the safest choice on this machine). The current host is running Node 23, which Expo reports as outside its supported engine range.

The current screen is a polished interaction shell with mock discovery data. Google Places, location permissions, authentication, and the OpenAI concierge will be wired through the backend after the interaction model is approved.
