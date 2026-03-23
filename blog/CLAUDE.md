# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Tokimahery Ramarozaka — a consultant, teacher, developer, and PhD researcher. The site showcases courses, blog posts, testimonials, and research papers.

## Commands

```bash
# Start Tailwind CSS development watcher (compile input.css to dist/output.css)
npm run dev

# Build Tailwind CSS once
npx tailwindcss -i ./input.css -o ./dist/output.css
```

## Architecture

**Tech Stack:** Static HTML pages with vanilla JavaScript, styled with Tailwind CSS.

**Data Layer:** All content is stored in `tokimahery.data.js` as a single `data` object containing:
- `aboutMe_part1`, `aboutMe_part2` — Biography text
- `overview` — Stats (years experience, students taught, topics)
- `experiences` — Work history entries
- `homeCourses` — Featured courses for homepage
- `courses` — Full course catalog
- `testimonials` — Student/client feedback
- `posts` — Blog articles
- `youtubeVideos` — Video content
- `archives` — Blog archive metadata
- `papers` — Academic publications

**Page Structure:**
- `index.html` — Homepage (uses `home.js` + `tokimahery.data.js`)
- `blog.html` — Blog page (uses `app.js` with inline data, CDN Tailwind)
- `testimonial.html` — Testimonials page (uses `testimonial.js` + `tokimahery.data.js`)

**Rendering Pattern:** Each page uses DOM manipulation in its JS file to render content from the data object into container elements (e.g., `#courses-container`, `#posts-container`).

## Key Patterns

- **Brand Color:** `#b0101b` (defined as `brandRed` in Tailwind config)
- **Fonts:** Playfair Display (serif), Inter (sans) — loaded from Google Fonts
- **CSS:** `input.css` is the Tailwind source; compiled output goes to `dist/output.css`
- **Note:** `blog.html` uses CDN Tailwind with inline config instead of the compiled CSS
