# Pickwise

**Smarter picks. Every time.**

AI-powered recommendation engine that answers any question in plain English and returns the 6 best options: 3 near your location, and 3 best in the world.

## Live demo

[https://pickwise.com](https://pickwise.com)

## Quick start

```bash
git clone <repo-url>
cd pickwise
npm install
cp .env.example .env
# Add REACT_APP_ANTHROPIC_API_KEY to .env
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables:
   - `REACT_APP_ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com)
   - `REACT_APP_GA_ID` — from Google Analytics (optional)
   - `REACT_APP_ADSENSE_ID` — from Google AdSense (optional)
4. Deploy — `vercel.json` handles SPA routing and security headers automatically

## Monetisation setup

### AdSense

1. Get approved at [adsense.google.com](https://adsense.google.com)
2. Add your Publisher ID to `.env`: `REACT_APP_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX`
3. In `public/index.html`, uncomment the AdSense script tag and replace the publisher ID
4. In `src/components/AdSlot.jsx`, replace placeholder `<div>` with `<ins class="adsbygoogle" ...>` tags

### Affiliates

Edit `src/utils/affiliates.js`:
- Replace `YOURTAG-21` with your Amazon Associates UK tag
- Replace `YOURTAG-20` with your Amazon Associates US tag
- Replace `BOOKAID` with your Booking.com affiliate ID
- Add Awin / CJ / Impact IDs as needed

## Affiliate programmes to join

| Programme | URL | What it covers |
|---|---|---|
| Amazon Associates UK | affiliate-program.amazon.co.uk | Physical products, books |
| Amazon Associates US | affiliate-program.amazon.com | US market |
| Awin | awin.com | Retail, travel, finance |
| CJ Affiliate | cj.com | Technology, software |
| Impact.com | impact.com | SaaS, apps |
| Booking.com | partners.booking.com | Hotels, travel |

## Legal compliance checklist

- **Privacy Policy** (`/privacy-policy`): Update `privacy@pickwise.com` to your contact. Review annually.
- **Terms of Service** (`/terms-of-service`): Update governing jurisdiction if operating outside UK.
- **Affiliate Disclosure** (`/affiliate-disclosure`): Update programme list when you join new ones.
- **Cookie consent**: Test in EU/UK browser (incognito mode) — banner must appear on first visit.
- **GDPR**: Location data is stored in `localStorage` only (never sent to your servers). ✓

## Adding content

- **Cycling typewriter queries**: Edit `CYCLING_QUERIES` in `src/utils/queries.js`
- **Example chips**: Edit `EXAMPLE_CHIPS` in `src/utils/queries.js`
- **Trending queries**: Edit `TRENDING_CATEGORIES` in `src/utils/queries.js`
- **Content filter**: Add blocked patterns in `src/utils/contentFilter.js`

## Tech stack

- React 18 + React Router v6
- Anthropic API (claude-sonnet-4-6 with web search)
- ipapi.co — IP-based location fallback
- Nominatim / OpenStreetMap — reverse geocoding
- CSS custom properties (no Tailwind)
- Vercel — deployment

## Reporting issues

Accuracy reports: [accuracy@pickwise.com](mailto:accuracy@pickwise.com)

Found a bug? Open an issue on GitHub.
