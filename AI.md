# AI.md

**Note:** These prompts were engineered by discussing the requirements with Google Gemini first, to perfect them before using them in Claude. This is done to save Claude tokens and to make sure the prompts are well written.

The F1 Stories site was built with Claude and the Storyblok MCP server. Here are three prompts that did the most work with Storyblok. They are shown here in the order they were used.

---

## Prompt 1: Build the Storyblok blocks (Storyblok MCP)

```
Role
You are a Storyblok developer working in my F1 Stories space through the
Storyblok MCP server.

Objective
Create the content model for a website that shows the races of a Formula 1
season. Editors will use it to publish a home page and one page per race.

Components to create
1. page (content type)
   - body: blocks field that only allows hero and race_grid.
2. race (content type) for the Race Detail page and the race cards
   - name: text, required.
   - date_time: date and time, required. The site uses it to decide which
     races have taken place.
   - image: asset field, images only.
   - body: rich text, for the written race report.
   - results_table: blocks field that only allows race_result.
3. hero (nestable block)
   - title: text.
   - heading: multi line text for the intro.
   - image: asset field, images only.
4. race_grid (nestable block)
   - section_title: text.
   - featured_races: multi select of race stories, optional.
5. race_result (nestable block), one row of the results table
   - position: number, required.
   - driver: text, required.
   - team: text, required.

Content structure
- A folder with the slug races, which uses race as its default content type.
- A story with the slug home that uses the page type, with a hero block
  followed by a race_grid block in its body. Leave it as a draft until the
  content is ready.

Constraints
- Use the Storyblok MCP only. Search for the right operation and describe it
  before you run it.
- Work in the EU region.
- Do not create any component that is not listed.

Done when
Report each component with its fields and types, then confirm the races
folder and the home story exist.
```

**What it produced:** five blocks and the races folder.

---

## Prompt 2: Populate the Race Detail pages and cards (Storyblok MCP)

```
Role
You are a content editor for the F1 Stories space, working through the
Storyblok MCP server.

Objective
Create one race story for every Grand Prix of the 2026 Formula 1 season that
has taken place so far, so that each one appears as a card on the home page
and has its own Race Detail page.

Sources
Use published race reports and official results. Do not invent facts.

For each race, in the races folder, create a story with the component race
and these fields
- name: the official race name, for example Singapore Grand Prix. Use the
  name the calendar uses, including the Bahrain Grand Prix held in Malaysia
  and the Spanish Grand Prix held in Madrid.
- slug: the race name in lower case with hyphens, for example
  singapore-grand-prix.
- date_time: the start time in UTC, formatted YYYY-MM-DD HH:mm.
- body: a rich text report of three or four short paragraphs covering the
  winner and margin, pole position, key incidents, safety car periods,
  strategy and retirements. End with the sentence "Drivers who retired or
  did not start are listed last in the results."
- results_table: one race_result block per driver for the full field, in
  finishing order, with retirements and non starters last. Each block has
  position (a string such as "1"), driver and team.

Constraints
- Use the Storyblok MCP. Describe each operation before running it.
- Work in the EU region and create the stories inside the races folder.
- Create the stories as drafts first, check them, then publish them all.
- Do not touch the Home story.
- Use plain, neutral language and write all times in UTC.

Done when
Every race has a published story. Give me a table with the race name, slug,
date and winner, and list anything you could not confirm.
```

**What it produced:** 17 published race stories, from the Australian Grand Prix to the Singapore Grand Prix, each with a written report and a full results table. The home page grid and the race pages are built from these stories.

---

## Prompt 3: Build the race images, upload them and assign them (Storyblok MCP)

```
Goal
Create an illustration for every race of the 2026 F1 season and add it to
the F1 Stories Storyblok space, so that every race card and Race Detail page
shows its own image.

Context
- Use the Storyblok MCP.
- The races folder holds 17 race stories. Each has an image field that is
  used by the race card on the home page and by the Race Detail page.

Requirements
- Use original illustrations, not official F1 photos, which are copyrighted.
- Each image shows the outline of that race's circuit, and the outline must
  be accurate:
    - Build it from real track geometry, not a hand drawn shape.
    - Use the layout that is used in 2026, for example the new Madrid
      circuit and the current Singapore layout.
    - Draw it north up.
    - Check each outline against the official 2026 lap length and report
      any that are more than 1 percent out.
- Each image also shows the round number, race name and location, in the
  dark, red and white style of the site.
- Make each image a 1600 by 900 JPEG.
- Name each file 2026-rNN-<race-slug>.jpg and give it alt text and a
  copyright note.

Steps
1. Generate the images and look at them before uploading.
2. Upload them as assets in the space.
3. Attach each one to the image field of the matching race story. A story
   update replaces the whole content, so resend the full content each time.
4. Publish every story.

Done when
Every race card and race page shows its own image, every story is
published, and you have listed the asset names and any outline that did not
match its official length.
```

**What it produced:** 17 illustrations with circuit outlines built from real track data. All 17 lengths matched the official 2026 lap lengths to within about 1 percent. They were uploaded as assets named `2026-rNN-<race-slug>.jpg` and attached to every race story, so each race card and Race Detail page shows its own image.

**Note:** This prompt had to be rewritten because the "Build it from real track geometry" and "Use the layout that is used in 2026" requirements were not included in the original. This led to badly drawn tracks. They are not perfect now, but work. In order to fix this I used the MCP to remove all of the image assets and updated them with this prompt.

---
