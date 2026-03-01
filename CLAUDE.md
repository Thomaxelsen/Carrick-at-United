# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page web app tracking Michael Carrick's record as Manchester United manager. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## Running Locally

Serve with any static HTTP server, e.g.:
```bash
python -m http.server 8765
```
Then open `http://localhost:8765`. There is no build step, test suite, or linting setup.

## Architecture

Three files make up the entire application:

- **index.html** — Single-page structure with a hero section and stats panel. Uses `defer` for script loading and `aria-live="polite"` for accessibility.
- **app.js** — Fetches `data.json` (with `cache: 'no-store'`), calculates stats (PPG, win %, point %), and renders match list in reverse chronological order.
- **styles.css** — Responsive design using CSS variables, glassmorphism, and multiple breakpoints (820px, 640px, 520px height). Fonts: Oswald (headings) and Source Sans 3 (body) from Google Fonts.
- **data.json** — Match data with Norwegian keys: `kamper` (matches array with `opponent`, `score`, `result`), `poeng_tatt` (points taken), `poeng_mulig` (possible points).

## Adding a New Match Result

1. Add the match object to the end of the `kamper` array in `data.json`:
   ```json
   { "opponent": "Team Name", "score": "X–Y", "result": "W|D|L" }
   ```
2. Update `poeng_tatt` (add 3 for W, 1 for D, 0 for L) and `poeng_mulig` (add 3).

Score uses en-dash (–), not hyphen (-). Format is homeGoals–awayGoals.

Stats are recalculated from the `kamper` array on page load, so `poeng_tatt`/`poeng_mulig` are informational.

## Agents (`.claude/agents/`)

Three subagents automate the match update workflow:

| Agent | Formål | Modell |
|-------|--------|--------|
| `resultat-henter` | Henter siste resultat fra manutd.com | haiku |
| `resultat-oppdaterer` | Oppdaterer data.json med nytt resultat | haiku |
| `visuell-qa` | Tar screenshot og verifiserer visuelt | haiku |

Typisk flyt etter en kamp: resultat-henter → resultat-oppdaterer → visuell-qa.

## Git & Deployment

- **Repository:** https://github.com/Thomaxelsen/Carrick-at-United
- **Branch:** `main`
- Push directly to `main` for data updates (new match results).
- Use feature branches + PR for code changes.

## Conventions

- Data keys are in Norwegian (`kamper`, `poeng_tatt`, `poeng_mulig`).
- Commit messages can be in Norwegian (e.g., "Legg til resultat: ...").
- Color scheme uses CSS variables: `--manutd-red` (#da291c), `--accent-gold` (#f4c542), `--deep-black` (#0f0f10).
