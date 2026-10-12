# F1 Stories

A website that keeps a race by race record of the 2026 Formula 1 season. The front page has an intro and a grid of cards, one per Grand Prix so far. Each card opens a race page with the illustration, a written report and the full finishing order.

**Live demo: https://f1-stories-website1.vercel.app/**

Built with Next.js (App Router) and `@storyblok/react`, with all content held in Storyblok and the site deployed on Vercel.

## What is in the demo

- A front page with a hero illustration, a short intro and a grid of every race that has taken place.
- 17 race pages, rounds 1 to 17 of 2026, from the Australian Grand Prix to the Singapore Grand Prix. Each has a written report and a results table.
- An illustration for every race and one for the front page. The images are original artwork created for this project, not official F1 imagery.
- A layout that works on phones and desktops. On a race page the illustration sits at the top inside the same column as the text, at full column width and uncropped, with nothing laid over it.
- A Storyblok Visual Editor setup, so editors can preview changes live while they work.

## How it works

- Any story is rendered by the catch-all route in `src/app/[[...slug]]/page.js`. The root URL loads the story with the slug `home`.
- `/races/<slug>` loads the story with that slug from the `races` folder in Storyblok.
- The Race Grid block lists every race whose date and time have passed, newest first. Nobody needs to edit the grid after each Grand Prix, because a race appears as soon as its start time has passed. The `featured_races` field on the block is not used.
- The results table is sorted by the `position` field, so editors can add rows in any order.
- Pages are rendered on request, so content changes appear as soon as they are published in Storyblok, with no redeploy.
- Layout and styling are part of the build. A change to the code or CSS only appears after a new deployment.

## Storyblok content model

| Component | Type | Fields |
|---|---|---|
| `page` | Content type | `body` (allows `hero` and `race_grid`) |
| `race` | Content type | `name`, `date_time`, `image`, `body` (rich text), `results_table` (list of `race_result`) |
| `hero` | Nestable | `title`, `heading`, `image` |
| `race_grid` | Nestable | `section_title` |
| `race_result` | Nestable | `position`, `driver`, `team` |

Content in the space:

1. A story with the slug `home` using the Page type, with a Hero Banner and then a Race Grid in its body.
2. A folder with the slug `races`, containing one Race Detail Page story per race. Each story slug is the race name, for example `singapore-grand-prix`.

Date and time values are stored by Storyblok in UTC, and the site converts them to the configured timezone for display.

## The illustrations

Each race image is a 1600 by 900 illustration showing the round number, the race name, the location and the outline of the circuit.

- The circuit outlines are drawn from real track geometry in the open [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) dataset, drawn north up. As a check, each outline's length was compared with the official 2026 lap length and matched to within about 1%.
- They use the current layouts, including the new Madring circuit for the Spanish Grand Prix, the updated Barcelona and Singapore layouts, and Sepang for the Bahrain Grand Prix in Malaysia.
- The front page image is a generic open-wheel car with no team livery, five start lights and faint outlines of the season's circuits.
- Files are uploaded to the Storyblok asset library with predictable names, for example `2026-r17-singapore-grand-prix.jpg`, and `f1-stories-home-hero.jpg` for the front page.

This is an unofficial fan project. It is not affiliated with Formula 1, the FIA or any team, and F1 is a trademark of its owner.

## Getting started locally

```sh
npm install
cp .env.example .env
```

Add your token to `.env`. Copy the space's preview token from **Settings** > **Access Tokens**. See `.env.example` for all options.

```sh
npm run dev
```

The dev server runs over HTTPS because the Visual Editor needs it. To connect the editor locally, set the default environment in **Settings** > **Visual Editor** to `https://localhost:3000/`, then open the `home` story and set its **Real path** to `/`.

## Environment variables

| Name | Purpose |
|---|---|
| `STORYBLOK_DELIVERY_API_TOKEN` | Content Delivery API token |
| `STORYBLOK_REGION` | Space region, `eu` for this space |
| `STORYBLOK_API_BASE_URL` | Optional API base URL |
| `STORYBLOK_VERSION` | `draft` or `published`. Defaults to draft in development and published in production |
| `SITE_TIMEZONE` | Timezone for race times. Defaults to `Europe/London` |

## Deploying to Vercel

1. Import the repository in Vercel.
2. Add the environment variables above. Use a public token in production so only published content is visible.
3. Deploy. Every push to `main` creates a new deployment.

### Pointing the Visual Editor at the right URL

In Storyblok, **Settings** > **Visual Editor** must use the stable production domain, `https://f1-stories-website1.vercel.app/`.

Do not use the long address of a single deployment, such as `f1-stories-website-abc123-yourteam.vercel.app`. Each deployment keeps its own permanent address and never updates, so the editor would keep showing an old build of the layout, even though content changes still appear.

If the editor shows a Vercel sign-in page, turn off Vercel Authentication for the project under **Settings** > **Deployment Protection**.

## Project layout

```
src/app/                  layout, global styles and the catch-all route
src/components/           Page, Hero, RaceGrid, RaceCard, Race, ResultsTable, SiteHeader
src/lib/storyblok.js      Storyblok setup and component registration
src/lib/races.js          fetches the races so far
src/lib/format.js         date and time formatting
```

## How this was built

The Storyblok content model, the Next.js code, the race content and the illustrations were created with Claude Code. Content was created and published in the space through the Storyblok Management API, and the illustrations were generated with scripts and uploaded as assets.
