# My Drama Clone

Short-drama streaming platform built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Framework | Next.js 16 (App Router)      |
| UI        | React 19 + Tailwind CSS 4    |
| Language  | TypeScript (strict)          |
| State     | React Context + localStorage |
| Fonts     | Geist Sans / Geist Mono      |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

If `NEXT_PUBLIC_API_URL` is not set, the app falls back to local mock data in `data/`.

## Project Structure

```
app/                        # Route files only (server components by default)
  page.tsx                  # Home — genre discovery + featured banner
  profile/page.tsx          # User profile — coins, subscription, favorites
  series/[id]/
    page.tsx                # Series detail — episodes, cast, description
    _components/            # Colocated server-renderable sub-components
  watch/[seriesId]/[episode]/
    page.tsx                # Episode player page
    _components/            # WatchClient + EpisodeSelector + EpisodeStats
  api/                      # API route handlers
  layout.tsx                # Root layout — Navbar, StoreProvider, metadata
  globals.css               # Global styles and CSS utility classes

components/
  layout/                   # Navbar
  series/                   # FeaturedBanner, GenreRow, SeriesCard, VideoPlayer,
                            # EpisodeList, FavoriteButton, ShareModal, CategoryTabs
  modals/                   # PaywallModal, CheckoutModal, SignInModal, GiftModal,
                            # CreditsModal, VipSuccessModal, ExclusiveOfferModal,
                            # ContactModal, AppDownloadModal, ShareModal
  ui/                       # CoinIcon, CloseButton, FormInput, EmptyState

constants/                  # Single source of truth for all magic values
  app.constants.ts          # Site URL, support contact info
  economy.constants.ts      # Coin packs, episode cost, credits
  plans.constants.ts        # Subscription plans + sale timer key
  content.constants.ts      # Genres, categories
  ui.constants.ts           # Timing values, pagination sizes
  routes.constants.ts       # Route helpers (ROUTES.series(id), etc.)

data/                       # Mock series data used as API fallback
hooks/                      # useScrollLock
lib/
  store.tsx                 # StoreProvider — coins, subscription, favorites
  utils.ts                  # formatSeconds helper
services/                   # HTTP service layer
  http.client.ts            # Base HttpClient class
  series.service.ts         # getAll, getById, getRelated, getFeatured
  auth.service.ts           # signIn, me
  payment.service.ts        # subscribe, purchaseCoins, unlockEpisode
types/                      # Shared TypeScript types (Series, Episode, User, Api)
```

## Architecture Rules

**Constants first** — every magic number or string lives in `constants/index.ts`. Never hardcode values directly in components.

**Service layer** — all API calls go through `services/`. Components never call `fetch` directly.

**Client/server split** — route `page.tsx` files are async server components. Extract client state into colocated `_components/` files (e.g. `WatchClient.tsx`).

**Params are Promises** — in Next.js 16, `params` and `searchParams` are `Promise<...>`. Always `await` them.

**Images** — use `next/image` `<Image>`. Never raw `<img>` tags.

**New components** — go in the matching `components/` subfolder. Route files only in `app/`.

## State Management

Global user state is managed by `StoreProvider` in `lib/store.tsx` and persisted to localStorage under the key `nd-v1`.

| State          | Type       | Description                              |
| -------------- | ---------- | ---------------------------------------- |
| `coins`        | `number`   | User's coin balance                      |
| `isSubscribed` | `boolean`  | VIP subscription status                  |
| `unlockedKeys` | `string[]` | Unlocked episodes (`"seriesId-episode"`) |
| `favorites`    | `string[]` | Favorited series IDs                     |

Access state in any client component with `useStore()`.

## Monetization

- **Coins** — virtual currency; costs 5 coins per episode unlock
- **Subscriptions** — Weekly or Yearly VIP (unlocks all content)
- **Coin packs** — 6 tiers from 100 to 10,000 coins ($0.99–$49.99)
- **Credits packages** — 4 tiers with bonus coins on higher tiers
- **Sale timer** — 34-minute countdown stored in localStorage; triggers 67% discount

Paywalled episodes trigger `PaywallModal` with subscription and coin options. Purchasing redirects through `SignInModal` → `CheckoutModal`.

## Mobile UI Patterns

Modals use a responsive drawer pattern defined by the `.modal-drawer` CSS class in `globals.css`:

- **Mobile** (< 640px) — slides up from the bottom edge; no bottom border; drag handle visible
- **Desktop** (≥ 640px) — centered with scale + fade animation; full rounded border

`PaywallModal`, `GiftModal`, and `ShareModal` all use this pattern.

## Security

Security headers are configured in `next.config.ts` for all routes:

- Content-Security-Policy (CSP)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS, 63 days)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — camera, microphone, geolocation, payment disabled

## Scripts

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without modifying files
```

## Routes

| Path                          | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `/`                           | Home — featured banner + genre rows           |
| `/?genre=Romance`             | Home filtered by genre                        |
| `/series/[id]`                | Series detail page                            |
| `/watch/[seriesId]/[episode]` | Episode player                                |
| `/profile`                    | User account — coins, subscription, favorites |
