# Content Engine AI

A Next.js + Tailwind MVP that helps users turn one idea into multi-platform content.

## Features

- Premium dark landing page
- Idea input form
- Mock AI generation API
- Results cards with copy buttons
- Generated outputs:
  - 7 Instagram captions
  - 1 Instagram Reel script
  - 1 YouTube Shorts script
  - 5 viral hooks
  - Hashtags
  - Title ideas

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

- `app/page.tsx` — Landing page, form, and results UI
- `app/api/generate/route.ts` — API endpoint for content generation
- `lib/mockAi.ts` — Mock generation logic (replace later with real AI provider)
- `components/OutputCard.tsx` — Reusable result card with copy support
