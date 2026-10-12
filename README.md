# F1 Stories

A Next.js website for the F1 Stories space in Storyblok. It shows a front page with an intro and a scrolling grid of cards, one per race of the season so far. Each card opens a page for that race with the race info and the driver results.

Built with Next.js (App Router) and `@storyblok/react`, and ready to deploy on Vercel. The Storyblok Visual Editor live preview is supported.

## How it works

- Any story is rendered by the catch-all route in `src/app/[[...slug]]/page.js`. The root URL loads the story with the slug `home`.
- `/races/<slug>` loads the story with that slug from the `races` folder in Storyblok.
- The Race Grid block lists every race whose date and time have passed, newest first. Nobody needs to edit the grid after each Grand Prix. The `featured_races` field on the block is not used.
- The results table is sorted by the `position` field, so editors can add rows in any order.
- Pages are rendered on request, so new content appears as soon as it is published.

## Storyblok content model

| Component | Type | Fields |
|---|---|---|
| `page` | Content type | `body` (allows `hero` and `race_grid`) |
| `race` | Content type | `name`, `date_time`, `image`, `body` (rich text), `results_table` (list of `race_result`) |
| `hero` | Nestable | `title`, `heading`, `image` |
| `race_grid` | Nestable | `section_title` |
| `race_result` | Nestable | `position`, `driver`, `team` |

Content to create in the space:

1. A story with the slug `home` using the Page type, with a Hero Banner and then a Race Grid in its body.
2. A folder with the slug `races`, containing one Race Detail Page story per race.

## Getting started

```sh
npm install
cp .env.example .env
```

Add your token to `.env`. Copy the space's preview token from **Settings** > **Access Tokens**. See `.env.example` for all options.

```sh
npm run dev
```

The dev server runs over HTTPS because the Visual Editor needs it. To connect the editor, set the default environment in **Settings** > **Visual Editor** to `https://localhost:3000/`, then open the `home` story and set its **Real path** to `/`.

## Environment variables

| Name | Purpose |
|---|---|
| `STORYBLOK_DELIVERY_API_TOKEN` | Content Delivery API token |
| `STORYBLOK_REGION` | Space region, `eu` for this space |
| `STORYBLOK_API_BASE_URL` | Optional API base URL |
| `STORYBLOK_VERSION` | `draft` or `published`. Defaults to draft in development and published in production |
| `SITE_TIMEZONE` | Timezone for race times. Defaults to `Europe/London` |

Storyblok stores date and time values in UTC. The site converts them to `SITE_TIMEZONE` for display.

## Deploying to Vercel

1. Import the repository in Vercel.
2. Add the environment variables above. Use a public token in production so only published content is visible.
3. Deploy.

## Project layout

```
src/app/                  layout, global styles and the catch-all route
src/components/           Page, Hero, RaceGrid, RaceCard, Race, ResultsTable, SiteHeader
src/lib/storyblok.js      Storyblok setup and component registration
src/lib/races.js          fetches the races so far
src/lib/format.js         date and time formatting
```
