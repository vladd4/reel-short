# My Drama Clone

Short-drama streaming platform built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript strict mode. Users browse series, watch free episodes, unlock paid ones with coins or a subscription, send gifts to actors, and manage their account.

---

## Tech Stack

| Layer       | Technology                                   |
| ----------- | -------------------------------------------- |
| Framework   | Next.js 16 (App Router)                      |
| UI          | React 19 + Tailwind CSS 4                    |
| Language    | TypeScript (strict)                          |
| State       | React Context (AuthProvider + StoreProvider) |
| Persistence | localStorage / sessionStorage                |
| Fonts       | Geist Sans / Geist Mono                      |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

---

## Project Structure

```
app/                                    # Routing only — server components by default
  layout.tsx                            # Root layout; sets up providers, Navbar, fonts
  page.tsx                              # Home — FeaturedBanner + genre rows + category tabs
  loading.tsx                           # Root loading skeleton
  not-found.tsx                         # 404 page
  error.tsx                             # Error boundary
  robots.ts                             # SEO robots.txt
  sitemap.ts                            # Dynamic sitemap generation
  globals.css                           # Global CSS, CSS variables, animations

  profile/
    page.tsx                            # Profile dashboard (coins, subscription, settings)
    _components/
      ProfileHeader.tsx                 # Avatar and user info
      SubscriptionCard.tsx              # Subscription status and management
      CoinBalanceCard.tsx               # Current coin balance
      AccountSettings.tsx               # Orchestrates email/password sections
      ChangeEmailForm.tsx               # Change email with current password verification
      ChangePasswordForm.tsx            # Change password form
      HowCoinsWork.tsx                  # Info modal explaining coin economics
      ContactRow.tsx                    # Link to support contact
      SignOutRow.tsx                    # Logout button
    _hooks/
      useAccountSettings.ts             # Mutations for email and password change
      useSubscription.ts                # Fetch active subscription details

  series/[id]/
    page.tsx                            # Series detail — cast, episodes, related series
    _components/
      SeriesBanner.tsx                  # Hero banner with title, rating, tags
      EpisodeGrid.tsx                   # 8-column episode grid with lock indicators
      GenrePills.tsx                    # Genre/tag pill badges
      DownloadButton.tsx                # Prompt to download mobile app

  watch/[seriesId]/[episode]/
    page.tsx                            # Server component; fetches series + related
    layout.tsx                          # Watch layout wrapper
    _components/
      WatchClient.tsx                   # Client orchestrator; composes hooks + layout
      WatchSidebar.tsx                  # Right panel — breadcrumb, synopsis, tags, stats, episode list
      LockedEpisodeOverlay.tsx          # Blurred paywall overlay for locked episodes
      EpisodeSelector.tsx               # Tabbed episode list with batch navigation
      EpisodeStats.tsx                  # Views / likes with like toggle (auth-gated)
    _hooks/
      useEpisodePlayer.ts               # Episode navigation, URL sync, API data fetch
      useWatchModals.ts                 # All modal flags + paywall auto-trigger + purchase flow

components/
  layout/
    Navbar.tsx                          # Fixed top bar — logo, coin balance, sign-in, contact
  modals/
    BottomDrawer.tsx                    # Reusable bottom-sheet wrapper (mobile slide-up / desktop centered)
    PaywallModal.tsx                    # Unlock episode modal — subscribe or buy coins
    CheckoutModal.tsx                   # Checkout flow for coins and subscriptions
    SignInModal.tsx                     # Login / register modal
    ContactModal.tsx                    # Support contact form
    CreditsModal.tsx                    # Coin pack selection
    VipSuccessModal.tsx                 # Success screen after subscription
    ExclusiveOfferModal.tsx             # Limited-time discounted coin offer
    GiftModal.tsx                       # Multi-step flow to send gift to actor
    AppDownloadModal.tsx                # App download prompt
    gift/
      GiftStep.tsx                      # Select gift type and actor
      MessageStep.tsx                   # Add personal message
      PreviewStep.tsx                   # Preview before sending
      SuccessStep.tsx                   # Confirmation screen
  series/
    FeaturedBanner.tsx                  # Auto-rotating featured series carousel
    GenreRow.tsx                        # Horizontal scrollable series row by genre
    FavoritesRow.tsx                    # Favorites row (shown only when logged in)
    MyMuseBanner.tsx                    # App promo banner
    SeriesCard.tsx                      # Series thumbnail card
    CategoryTabs.tsx                    # Genre filter tabs (All, Romance, Thriller…)
    EpisodeList.tsx                     # List view of episodes with play buttons
    FavoriteButton.tsx                  # Heart toggle — auth-gated, syncs to API
    ShareButton.tsx                     # Opens ShareModal
    ShareModal.tsx                      # Share link + QR code
    VideoPlayer.tsx                     # Custom HTML5 video player shell
    player/
      PlayerControls.tsx                # Play/pause, scrubber, volume, fullscreen
      VolumeControl.tsx                 # Volume slider with mute toggle
      SettingsPanel.tsx                 # Playback speed, autoplay settings
      SubtitlesPanel.tsx                # Subtitle language selector
      usePlayerState.ts                 # All video player state in one hook
  ui/
    CloseButton.tsx                     # Reusable × button
    CoinIcon.tsx                        # Coin currency icon
    FormInput.tsx                       # Styled text input
    EmptyState.tsx                      # Empty results placeholder

constants/
  index.ts                              # Barrel re-export of all constants
  app.constants.ts                      # SITE_URL, SUPPORT_EMAIL, SUPPORT_PHONE, APP_DOWNLOAD_URL
  economy.constants.ts                  # EPISODE_COST (5), EXCLUSIVE_OFFER_COINS (550), COIN_PACKS
  plans.constants.ts                    # SUBSCRIPTION_PLANS (weekly $5.99, yearly $99.99)
  ui.constants.ts                       # FEATURED_INTERVAL_MS (5000), EPISODES_PER_BATCH (50)
  routes.constants.ts                   # ROUTES helpers — ROUTES.series(id, title), ROUTES.watch(…)

data/
  gifts.ts                              # Mock gift actors, categories, tier styles (UI layout)

hooks/
  useScrollLock.ts                      # Lock body scroll when modals open
  useCreditPacks.ts                     # Fetch available credit packs on mount
  useSubscriptionPlans.ts               # Fetch subscription plans on mount

lib/
  auth.tsx                              # AuthContext + useAuth() hook
  store.tsx                             # StoreContext + useStore() hook
  utils.ts                              # parseCount, formatCount, formatSeconds, slugify, parseId, languageName
  likes.ts                              # localStorage helpers for liked series IDs
  series.mappers.ts                     # mapSeries() / mapEpisode() — API → client types
  gifts.mappers.ts                      # mapGift() — API → GiftItem
  parseVTT.ts                           # VTT/SRT subtitle file parser

services/
  index.ts                              # Barrel re-export of all service instances
  http.client.ts                        # Base HttpClient — auth headers, 401 refresh, retry
  auth.service.ts                       # login, register, logout, me, changeEmail, changePassword
  series.service.ts                     # getAll, getById, getRelated, getFeatured, getEpisodeById, purchaseEpisode
  billing.service.ts                    # getSubscription, getPlans, subscribe, cancelSubscription, getCreditPacks, purchaseCredits
  payment.service.ts                    # subscribe, purchaseCoins, unlockEpisode
  favourites.service.ts                 # getAll, add, remove
  gifts.service.ts                      # getGifts, sendGift
  subtitles.service.ts                  # getLanguages, fetchVTT

types/
  index.ts                              # Barrel re-export of all types
  user.types.ts                         # ApiUser
  auth.types.ts                         # AuthResponse
  series.types.ts                       # Series, Episode, CastMember (client types)
  api.types.ts                          # ApiSeriesItem, ApiEpisode, ApiGenre, ApiFavourite, ApiGift, etc.
  billing.types.ts                      # CreditPack, SubscriptionPlan, Subscription
  gift.types.ts                         # GiftItem, Actor, GiftCategory, TierStyle
```

---

## Architecture

### Client / Server Split

Route `page.tsx` files are **async server components** — they fetch data at request time with no client bundle cost. All client interactivity (state, modals, navigation) is extracted into colocated `_components/` files with the `'use client'` directive. This pattern is used throughout:

- `app/page.tsx` fetches series and genres on the server; the page renders immediately with data.
- `app/watch/[seriesId]/[episode]/page.tsx` fetches the series and related content, then passes it as props to `WatchClient.tsx`.
- `app/profile/page.tsx` is a server wrapper; all mutation state lives in colocated `_components/`.

### Service Layer

All API calls go through `services/`. Components never call `fetch` directly.

Every service extends `HttpClient` from `services/http.client.ts`, which handles:

- Automatic `Authorization: Bearer <token>` injection
- 401 interception → call `/auth/refresh` → update tokens → retry original request once
- Consistent error unwrapping

```
Component → useHook → service.method() → HttpClient.request() → fetch()
```

### Type Mappers

API responses use snake_case server shapes (`ApiSeriesItem`, `ApiEpisode`). Client components use clean camelCase types (`Series`, `Episode`). The translation happens in `lib/series.mappers.ts`:

- `mapSeries()` — converts `ApiSeriesItem` to `Series`, applies default gradient and accent color, formats views/likes with `fmtCount()`, maps all episodes via `mapEpisode()`
- `mapEpisode()` — converts `ApiEpisode`, formats duration with `fmtDuration()`, resolves `locked` from `access` field

### Constants as Source of Truth

Values live in `constants/`. Components import from `@/constants`, never hardcode numbers or strings.

```typescript
// economy.constants.ts
export const EPISODE_COST = 5           // coins to unlock one episode
export const EPISODES_PER_BATCH = 50   // pagination size

// routes.constants.ts
export const ROUTES = {
  series: (id: string, title: string) => `/series/${id}-${slugify(title)}`,
  watch:  (id: string, title: string, ep: number) => `/watch/${id}-${slugify(title)}/${ep}`,
}
```

### Async Error Handling

All async code uses `async/await` with `try/catch`.

---

## Authentication

Managed by `AuthProvider` in `lib/auth.tsx`. Consumed anywhere with `useAuth()`.

### Token Storage

| Token         | Storage                                   |
| ------------- | ----------------------------------------- |
| Access token  | `localStorage` + HTTP cookie (`nd-token`) |
| Refresh token | `localStorage` only                       |

### Initialization Flow

1. On mount, read access token from `localStorage`
2. If present, call `GET /auth/me` to verify and hydrate user
3. On 401, call `POST /auth/refresh` → update tokens → retry (handled by `HttpClient`)
4. If refresh fails, clear all tokens and set `user = null`
5. Set `isLoading = false` once complete

### Auth State

```typescript
type AuthStore = {
  user: ApiUser | null
  isLoggedIn: boolean
  isLoading: boolean
  login(email, password): Promise<void>
  register(email, password): Promise<void>
  logout(): Promise<void>
  refreshUser(): Promise<void>
}
```

`ApiUser` shape:

```typescript
type ApiUser = {
  id: string
  email: string
  credits: number        // coin balance
  isSubscribed: boolean
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}
```

---

## Global Store

Managed by `StoreProvider` in `lib/store.tsx`. Consumed with `useStore()`. Lives inside `AuthProvider` so it can react to auth state.

```typescript
type Store = {
  unlockedEpisodeIds: number[]
  markEpisodeUnlocked(episodeId: number): void
  favorites: string[]                          // series IDs
  toggleFavorite(seriesId: string): void
  isFavorite(seriesId: string): boolean
  canWatch(seriesId, ep, freeCount, isSubscribed): boolean
}
```

### Favorites Sync

On `isLoggedIn` change:

- Logged in → fetch `GET /users/me/favourites`, populate `favorites` array
- Logged out → immediately clear `favorites` (no page reload needed)

`toggleFavorite` optimistically updates local state then syncs to API. On API failure it rolls back.

---

### `LockedEpisodeOverlay`

Shown instead of the video player when `isUnlocked` is false. Contains:

- Blurred video preview background
- Lock icon + copy
- "Unlock Now" button (hidden after first purchase — `hasPurchased`)
- "Watch for Free in App" button (always visible)

### Mobile Layout

On mobile the sidebar is hidden by default. The video plays fullscreen (body scroll locked via inline `<style>`). A pill button in the video header opens the sidebar, which slides in as an overlay. Closing it or selecting an episode collapses it back.

---

## Monetization & Paywall

### Coin Economy

| Item            | Cost              |
| --------------- | ----------------- |
| Episode unlock  | 5 coins           |
| Exclusive offer | 550 coins / $4.99 |
| Coin packs      | 100–10,000 coins  |

### Episode Access Logic

An episode is considered unlocked if any of the following are true:

```typescript
const isUnlocked =
  isSubscribed ||                          // VIP subscriber
  !episode.locked ||                       // episode is free
  unlockedEpisodeIds.includes(episode.id)  // user purchased this episode
```

### Paywall Auto-Trigger

When the user navigates to a locked episode and `hasPurchased` is false (nothing in `localStorage['episode-purchased']`), the paywall modal opens automatically. This happens at most once — after the first successful purchase the key is written to localStorage and the auto-trigger is permanently suppressed.

The paywall has two views:

1. **Default** — subscribe (weekly or yearly) or buy coins
2. **Coins view** (`showCoins: true`) — coin pack selection when user can't afford the episode

Closing the paywall without buying triggers `ExclusiveOfferModal` (a discounted one-time coin offer).

### Purchase Flow

```
LockedEpisodeOverlay "Unlock Now"
  → handleBuyEpisode()
    → not logged in? → open PaywallModal (coins view)
    → insufficient credits? → open PaywallModal (coins view)
    → enough credits → 2s optimistic delay → purchaseEpisodeNow()
      → POST /episodes/{id}/purchase
      → markEpisodeUnlocked(id)
      → write 'episode-purchased' to localStorage
      → setHasPurchased(true)
      → fetchEpisode(currentEpisode)
      → void refreshUser()  ← fire-and-forget balance update
```

---

## Likes

Series likes are stored locally in `localStorage['liked-series']` as a JSON array of series IDs. Managed by `lib/likes.ts`:

```typescript
getLikedIds(): string[]
saveLikedIds(ids: string[]): void
```

`EpisodeStats` component renders the like toggle. Like is auth-gated — unauthenticated users see the `SignInModal` instead. The displayed count is parsed from the formatted server string (`"1.2K"` → `1200`) via `parseCount()`, incremented/decremented locally, then re-formatted via `formatCount()`.

---

## Gift Flow

Multi-step modal (`GiftModal`) with four steps:

1. **GiftStep** — pick a gift (emoji + coin cost) and select an actor
2. **MessageStep** — optional personal message
3. **PreviewStep** — full preview before confirming
4. **SuccessStep** — confirmation with gift summary

Gift tiers: `popular`, `love`, `luxury`, `legendary`. Costs are defined by the API (`GET /gifts`). Sending calls `POST /actors/{actorId}/gifts`.

---

## Subtitle Support

`VideoPlayer` fetches subtitle tracks via `subtitlesService.getLanguages(episodeId)` on mount. When a language is selected, it fetches the raw VTT content and passes it through `parseVTT()` in `lib/parseVTT.ts`, which handles both VTT and SRT formats. Cues are injected as a `<track>` element on the `<video>`.

---

## Modal System

All modals use `BottomDrawer` — a responsive wrapper that:

- **Mobile** (< 640px) — slides up from the bottom; no bottom border radius; scroll-lock via `useScrollLock`
- **Desktop** (≥ 640px) — centered dialog with scale + fade-in animation

`useScrollLock` adds `overflow: hidden` to `document.body` while the modal is open and restores it on unmount.

---

## Utility Functions (`lib/utils.ts`)

| Function             | Description                         |
| -------------------- | ----------------------------------- |
| `parseCount(val)`    | `"1.2M"` → `1_200_000`              |
| `formatCount(n)`     | `1_200_000` → `"1.2M"`              |
| `formatSeconds(s)`   | `65` → `"1:05"`                     |
| `slugify(str)`       | `"My Drama"` → `"my-drama"`         |
| `parseId(slug)`      | `"123-my-drama"` → `"123"`          |
| `languageName(code)` | `"en"` → `"English"` (16 languages) |

---

## API Reference

### Auth (`/auth`)

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| POST   | `/auth/login`    | Login → `AuthResponse`             |
| POST   | `/auth/register` | Register → `AuthResponse`          |
| POST   | `/auth/refresh`  | Refresh tokens                     |
| POST   | `/auth/logout`   | Invalidate refresh token           |
| GET    | `/auth/me`       | Current user → `{ user: ApiUser }` |
| PATCH  | `/auth/email`    | Change email                       |
| PATCH  | `/auth/password` | Change password                    |

### Series (`/series`, `/episodes`)

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/series`                 | List series (filterable by genre, size) |
| GET    | `/series/{id}`            | Series detail with episodes             |
| GET    | `/series/{id}/actors`     | Cast list                               |
| GET    | `/episodes/{id}`          | Single episode                          |
| POST   | `/episodes/{id}/purchase` | Purchase episode unlock                 |
| GET    | `/genres`                 | Available genres                        |

### Billing (`/billing`)

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| GET    | `/billing/subscription`        | Active subscription  |
| GET    | `/billing/plans`               | Available plans      |
| POST   | `/billing/subscription`        | Subscribe to plan    |
| POST   | `/billing/subscription/cancel` | Cancel subscription  |
| GET    | `/billing/credit-packs`        | Available coin packs |
| POST   | `/billing/credits/purchase`    | Purchase coin pack   |

### Favourites (`/users/me/favourites`, `/series`)

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| GET    | `/users/me/favourites`   | User's favorites |
| POST   | `/series/{id}/favourite` | Add favorite     |
| DELETE | `/series/{id}/favourite` | Remove favorite  |

### Gifts (`/gifts`, `/actors`)

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/gifts`             | Available gift items |
| POST   | `/actors/{id}/gifts` | Send gift to actor   |

### Subtitles (`/episodes`)

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | `/episodes/{id}/subtitles`        | Available subtitle tracks |
| GET    | `/episodes/{id}/subtitles/{lang}` | Fetch VTT content         |

---

## Security Headers

Configured in `next.config.ts` for all routes:

| Header                      | Value                                                   |
| --------------------------- | ------------------------------------------------------- |
| `X-Frame-Options`           | `DENY`                                                  |
| `X-Content-Type-Options`    | `nosniff`                                               |
| `Strict-Transport-Security` | `max-age=5443200; includeSubDomains` (63 days)          |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                       |
| `Content-Security-Policy`   | script-src with `unsafe-eval`/`unsafe-inline` for React |

---

## Routes

| Path                                 | Description                              |
| ------------------------------------ | ---------------------------------------- |
| `/`                                  | Home — featured banner + genre rows      |
| `/?genre=romance`                    | Home filtered by genre                   |
| `/series/{id}-{slug}`                | Series detail page                       |
| `/watch/{seriesId}-{slug}/{episode}` | Episode player                           |
| `/profile`                           | Account — coins, subscription, favorites |

Route helpers in `constants/routes.constants.ts` generate slugified URLs automatically.

---

## Scripts

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run format:check  # Check formatting without writing
```
