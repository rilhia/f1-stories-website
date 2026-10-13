# F1 Stories

A website that keeps a race by race record of the 2026 Formula 1 season. The front page has an intro and a grid of cards, one per Grand Prix so far. Each card opens a race page with the illustration, a written report and the full finishing order.

**Live demo: https://f1-stories-website1.vercel.app/**

Built with Next.js (App Router) and `@storyblok/react`, with all content held in Storyblok and the site deployed on Vercel.

## Table of contents

- [What is in the demo](#what-is-in-the-demo)
- [How it works](#how-it-works)
- [Storyblok content model](#storyblok-content-model)
- [The illustrations](#the-illustrations)
- [Getting started locally](#getting-started-locally)
- [Environment variables](#environment-variables)
- [Deploying to Vercel](#deploying-to-vercel)
  - [Pointing the Visual Editor at the right URL](#pointing-the-visual-editor-at-the-right-url)
- [Project layout](#project-layout)
- [How this was built](#how-this-was-built)
- [Getting started with Storyblok using Claude and the Storyblok MCP](#getting-started-with-storyblok-using-claude-and-the-storyblok-mcp)
  - [1. Connect the MCP to Claude](#1-connect-the-mcp-to-claude)
  - [2. Write the prompt](#2-write-the-prompt)
  - [3. Run it](#3-run-it)
  - [4. Read the blocks in the Storyblok UI](#4-read-the-blocks-in-the-storyblok-ui)
  - [Next step](#next-step)
- [What my AI assistant got wrong with Storyblok](#what-my-ai-assistant-got-wrong-with-storyblok)
  - [Where the setup advice went wrong](#where-the-setup-advice-went-wrong)
  - [The Blueprint route to Vercel](#the-blueprint-route-to-vercel)
  - [Why I was rushing](#why-i-was-rushing)
  - [Another way of using AI to solve these setup issues: a member of support prompt](#another-way-of-using-ai-to-solve-these-setup-issues-a-member-of-support-prompt)

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

This project was built using Claude with the Storyblok MCP server. Through the Storyblok MCP, Claude created the content model, created and published the race stories and the Home story, and uploaded the illustrations to the asset library. Claude Code was used to write the Next.js code.

## Getting started with Storyblok using Claude and the Storyblok MCP

You're new to a product, maybe new to the domain too, and you need a POC quickly. We've all been there. Traditionally that meant A LOT of reading, multiple "Hello World" examples and a very late and incredibly frustrating night, with the evidence on your forehead from slamming it on the desk when every example you followed word for word failed because sleep-degraded typing added a rogue semicolon.

It doesn't need to be that way with Storyblok. With Storyblok's MCP server, you can describe a content model in plain English and an assistant like Claude will build it in your space. This mini tutorial takes you from a blank space to inspecting the finished blocks, and you don't even need to know what blocks are before you start 😉

### 1. Connect the MCP to Claude

The easiest and quickest way to connect an AI assistant is to use Claude's connector. If you're interested in using this MCP server with a local model, for example, that can be done too. I will cover that in more detail in another tutorial.

**OAuth (recommended).** In Claude, go to **Settings → Connectors**, choose **Discover**, type "Storyblok" and select **Connect**. This will launch Storyblok in your browser. Sign in, then pick the permissions and spaces Claude may use.

### 2. Write the prompt

First, what is a block? A block is a Storyblok building piece, a named set of fields such as text, an image or a date. A **content type** block is a whole page, like a "Race Detail Page". A **nestable** block lives inside a page, like a "Race Result" row holding a position, driver and team. A page can restrict which nestable blocks it accepts.

I'd recommend starting in a chat tool such as Google Gemini. Describe the site you want in plain English, for example "a site listing F1 races, each with a results table", and say you want a content model for it in a Storyblok space. Ask it to turn that into a precise prompt that lists every block and its fields, then paste that prompt into Claude.

### 3. Run it

Paste the prompt into Claude with the Storyblok connector enabled. Claude uses the MCP to build the blocks you described. It takes a few minutes, so go and grab yourself a coffee while this is ticking over. Just keep an eye out for approval requests.

### 4. Read the blocks in the Storyblok UI

Open your space in [Storyblok](https://app.storyblok.com/) and select **Block Library** in the left-hand menu. Every block from your prompt should be listed. Open one and really drill into each of the blocks and all of the options. See how the blocks are interlinked and get an understanding of their hierarchy.

If anything doesn't match your prompt, tell Claude what's wrong and ask it to fix it.

### Next step

You'll need to build your site's code. You may be comfortable with React and Next.js, but not sure how you can work with Storyblok. Guess what? Claude can help you there as well.

Life is SO much easier these days.

I didn't even need to write the stories for this F1 Stories site. I told Claude what I wanted and got it to churn out a story for every race of the season so far. Of course, I am not advocating that you do that. I think it is best to keep a human in the storytelling loop.

Sources:
- [Storyblok MCP Server](https://storyblok.com/docs/libraries/mcp-server)
- [Storyblok MCP Server setup](https://www.storyblok.com/docs/tooling/mcp-server/setup)

## What my AI assistant got wrong with Storyblok

My honest finding is that the Storyblok MCP work was pretty solid. Everything my AI assistant did using the MCP worked as expected. Where the content it created was not right, the fault was in my instructions. The track images are an example. They needed redoing, but that was a gap in the prompt, not a problem with how it worked with Storyblok. I was really quite impressed with how easy building with Storyblok was using the MCP. It really impressed me that story content could be built with a single prompt.

Where Claude and Gemini did get Storyblok wrong was in explaining how to set things up. That meant advice on auth tokens, enabling the Visual Editor and the configuration a project needs before you start building. This is where more is needed.

### Where the setup advice went wrong

- **The Visual Editor.** I could just not get this working. I spent a good 30 minutes working through steps to get this going. In the end, after trying an awful lot of methods, I had to turn off the Vercel authentication. Both Claude and Gemini took me through every step imaginable before we got to this one. It did finally work, but I have no idea what steps I took were not actually necessary. There was also an issue with several layout fixes appearing to do nothing. This turned out to be due to me setting the Visual Editor up against the preview link and not the production link. The fix was to point **Settings** > **Visual Editor** at the stable production domain, not a single deployment's address.
- **Auth tokens and general configuration.** Neither Claude nor Gemini was able to alert me to everything I needed to know. It's a common issue with LLMs in that they can get you 90% of the way, but the missing 10% can sometimes be the blocker.

### The Blueprint route to Vercel

This one was not the AI's fault, but it was the biggest setup problem of the whole build, and the AI could not help with it. I tried both Gemini and Claude.

Storyblok's Blueprint route links your space to (in this case) a Vercel project. Every time I reached the GitHub step, I got this message, even though I had completed every step I was given:

> Failed to link rilhia/f1-stories-website. You need to add a Login Connection to your GitHub account first.

I decided to fix it by creating the project in Vercel manually. That led to a different error:

> A project with this name already exists

When I renamed the project to get around that, the original "Failed to link" message came straight back.

I could not escape the Blueprint route either. Once it had started, I had to finish it. After about an hour of trying different things, deleting projects and starting again, it worked. I am honestly not sure what changed. I recorded the whole process, so I can go back to the video at some point in the future and work out why.

The Blueprint route offered by the Storyblok UI does not give enough information or alternative routes to enable an easy fix for a brand new user trying to get started.

### Why I was rushing

I suspect I would not have had so many configuration problems if I had not felt rushed to get through this. I was working to a time target that was incredibly tight given the deliverables, and I suspect that had I spent more time reading around the configuration requirements, I would actually have done this quicker. Setup is where haste costs the most, because a wrong setting does not fail loudly. It just makes everything after it look broken.

### Another way of using AI to solve these setup issues: a member of support prompt

The way people work has shifted. If you can talk through a setup with an AI assistant, many people will choose that over reading the docs. I have been using this approach for several products I have built over the last few months, and it suits long and complicated setup steps very well. One example is this [helper prompt for prompt-track-mcp](https://github.com/rilhia/prompt-track-mcp/blob/main/docs/llm-helper-prompt.txt). I gave this prompt to my partner (who is not technical at all) to get her to test this install. She found it super useful.

The idea is simple. Instead of leaving the assistant to answer setup questions from its training and documents it finds while researching, you give it a prompt that holds the product's correct steps, its settings and the common mistakes. The prompt tells the assistant to act as a member of support. It takes the user through the process step by step, in order, using a question and answer mechanism until the setup is finished.

As the user configures, they give the LLM the information it will request. That might be which space they are using, which region it is in, what a screen or error message says, paths, environment settings, etc. The assistant combines that with the information in the prompt and gives a detailed explanation of what to do and why.

That is the problem I hit with the Visual Editor. I still have no idea which of the steps I tried were actually necessary. A prompt to guide me through, step by step, could have told me what I needed to do and why.

Adding a variety of prompts to the MCP which can be discovered by new users as they ask their AI assistant questions about their configuration would be a really nice touch.
