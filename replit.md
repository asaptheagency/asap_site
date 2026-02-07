# ASAP - AspireIt Software Automation & Promotion

## Overview
A frontend-only, one-page Swiss modernism marketing website for ASAP (AspireIt Software Automation & Promotion). Features a funnel-oriented layout with smooth scroll animations, parallax effects, custom cursor, and tabbed services section.

## Recent Changes
- 2026-02-07: Initial build — complete one-page landing with all sections

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Design System**: Swiss modernism with red (#dc2626) / off-black (#191919) / white (#e6e6e6) palette
- **Fonts**: Space Grotesk (primary), Inter (fallback), JetBrains Mono (mono)
- **No backend logic** — frontend-only static marketing site
- **Animations**: Framer Motion for scroll reveals (alternating left/right), parallax sections, tab transitions
- **Custom cursor**: CSS + JS hook with hover scaling/color effects, hidden on mobile

## Key Sections (top to bottom)
1. **Navbar** — Fixed, transparent → blurred on scroll
2. **Hero** — Full-screen with company name (red first letters: A-S-A-P), tagline
3. **Services** — Dark bg, 7 tabbed services (R.I.S.E., Front Desk, DM Dispatch, Site Support, Lead Link, Web Design, Software Dev)
4. **Process** — 4-step cards with parallax
5. **Stats** — Red bg metrics bar
6. **About** — Company description
7. **Testimonials** — Client quotes in dark cards
8. **CTA** — Calendar booking link (Google Calendar)
9. **Footer** — Branding + copyright

## File Structure
- `client/src/pages/home.tsx` — Main landing page with all sections
- `client/src/index.css` — Global styles, custom cursor, glow effects, scrollbar
- `client/src/App.tsx` — Router setup

## User Preferences
- Swiss modernism design aesthetic
- No emojis in UI (icons only via lucide-react)
- Funnel-style layout guiding to chatbot/CTA
- Chatbot script to be added later by user (aminos.ai)
