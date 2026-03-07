# Vacation Budget Planner - Claude Code Prompt

## Project Overview
Build a **modern, mobile-first vacation budget planner** using Next.js LTS with full offline support. This is a guest-mode application (no authentication required) that helps travelers track spending across multiple trips, split expenses with friends, and visualize budgets in real-time.

**Target Users**: Travelers, group trip planners, families managing vacation budgets
**MVP Launch Goal**: Core features only, zero backend (frontend + free APIs)

---

## Tech Stack
- **Framework**: Next.js LTS (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS for animations
- **State Management**: Zustand
- **Data Storage**: IndexedDB (with JSON localStorage fallback)
- **Charts**: Recharts
- **Validation**: Zod
- **Utilities**: 
  - `date-fns` (dates)
  - `dinero.js` (currency math)
  - `jsPDF` + `html2canvas` (PDF export)
  - `lucide-react` (icons)
- **API**: Open Exchange Rates (free tier for currency conversion)

---

## Data Models

### Trip
```typescript
interface Trip {
  id: string; // UUID
  name: string; // e.g., "Europe Summer 2024"
  destination: string; // City/country
  startDate: string; // ISO date
  endDate: string; // ISO date
  budget: number; // Total budget in base currency
  baseCurrency: string; // e.g., "USD"
  travelers: Traveler[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
}

interface Traveler {
  id: string;
  name: string;
  email?: string; // Optional, for future features
}

interface Expense {
  id: string;
  tripId: string;
  description: string;
  amount: number; // In expense currency
  currency: string; // Currency of expense
  category: ExpenseCategory;
  date: string; // ISO date
  paidBy: string; // Traveler ID
  splitBetween: string[]; // Array of Traveler IDs (empty = not split)
  receipt?: string; // URL/base64 image (future)
  notes?: string;
  createdAt: string;
}

type ExpenseCategory = 
  | "accommodation" 
  | "food" 
  | "transport" 
  | "activities" 
  | "shopping" 
  | "entertainment" 
  | "other";
```

---

## Core Features (MVP)

### 1. Landing Page (`/`)
- **Hero section**: Eye-catching headline + CTA ("Start Planning")
- **Feature cards**: Show key benefits (splitting, offline, charts, sharing)
- **How it works**: 3-step visual guide
- **Call-to-action**: Prominent "Create Trip" button
- **No login required**: Emphasize guest mode
- **Design**: Playful, travel-inspired colors (warm oranges, ocean blues, sandy yellows)

### 2. Trip Wizard (3-Step Setup)
**Step 1: Destination**
- Input: Destination name (autocomplete suggestions)
- Suggests typical budget for that destination
- Selects currency based on country

**Step 2: Budget Details**
- Input: Total budget amount
- Input: Trip dates (start/end)
- Shows trip duration
- Daily budget calculation

**Step 3: Travelers**
- Add travelers (name, optional email)
- Minimum 1 traveler (the user)
- Add/remove travelers with live update

**Completion**: Generate shareable link, save locally

### 3. Trip Dashboard (Main App)
**Top Section (Budget Overview)**
- Trip name + dates
- Budget progress bar with color coding:
  - 🟢 Green: 0-60% spent
  - 🟡 Yellow: 61-90% spent
  - 🔴 Red: 90%+ spent
- Total budget vs. actual spending (animated counter)
- Days remaining in trip
- Daily burn rate (avg spent per day)
- Currency display (e.g., "$2,450 / $5,000")

**Quick Actions (Fixed at top)**
- "+ Add Expense" button
- "Share Trip" button
- "Export PDF" button
- "Settings" icon

**Expense List (Scrollable)**
- Sort: By date (newest first), by category, by amount
- Each expense card shows:
  - Category icon + name
  - Description
  - Amount (with currency)
  - Date
  - "Paid by [Name]"
  - If split: "Split with X people"
  - Edit/delete icons
- Pull-to-refresh on mobile

**Bottom Tabs** (Mobile navigation)
- Dashboard (active)
- Charts
- Expense Splitter
- Settings

### 4. Add Expense Modal
- **Inputs**:
  - Description (text input)
  - Amount (number)
  - Currency (dropdown, defaults to trip currency)
  - Category (dropdown with icons)
  - Date (date picker, defaults to today)
  - Paid by (dropdown, defaults to current user)
  - Split with (checkboxes for other travelers)
  - Notes (optional text)
- **Validation**: Required fields only
- **Action**: Save button, dismiss on backdrop click
- **Real-time calculation**: If split, shows "You pay: $X, Others owe: $Y"

### 5. Charts Page
- **Pie Chart**: Spending by category
  - Interactive: Click slice to filter
  - Shows % and amount
  - Animated on load
- **Line Chart**: Daily spending trend
  - X-axis: Dates
  - Y-axis: Cumulative spending
  - Shows budget line for reference
  - Animated line draw on load
- **Bar Chart**: Spending per person
  - Only if multiple travelers
  - Shows who spent most/least
  - Color-coded by traveler
- **Summary Stats**:
  - Total spent
  - Remaining budget
  - Days left
  - Avg daily spend
  - Highest category

### 6. Expense Splitter
- **Input**: Select an expense or create custom split
- **Display**: "Who owes who" summary
  - e.g., "Alice owes Bob $45.50"
  - e.g., "Charlie owes Alice $12.25"
- **Settlement Options**:
  - Simplified: Equal distribution only
  - Full: Custom split percentages
- **Export**: Generate shareable settlement link
- **Action**: "Mark as settled" checkbox
- **Notes**: Ability to add notes for each settlement

### 7. Share Trip
- **Generate Link**: `/share/[trip-id]` (shareable, no login needed)
- **Modal Options**:
  - Copy link to clipboard
  - QR code (generated client-side)
  - Share via email (link only)
- **Share Page**: 
  - Shows trip overview (read-only OR editable based on permissions)
  - Collaborators can add expenses
  - View shared budget in real-time
  - See expense list and charts

### 8. Export to PDF
- **Report Contents**:
  - Trip name, dates, destination
  - Budget summary (total, spent, remaining)
  - Expense list (table format)
  - Charts: Pie chart, category breakdown
  - Expense splitter summary (if applicable)
  - Export date and timestamp
- **Styling**: Professional, branded layout
- **Action**: Download as "TripName-BudgetReport.pdf"
- **Mobile-friendly**: Readable on all devices

### 9. Offline Support
- **All data stored in IndexedDB**:
  - Persist all trips, expenses, travelers
  - Service worker for offline cache
- **Sync mechanism**:
  - Detect online/offline status
  - Show "Offline mode" indicator
  - Auto-sync when reconnected
- **User Experience**:
  - No login required, no sync needed
  - All data lives on device
  - Optional future: Cloud sync via email/account

### 10. Settings Page
- **Preferences**:
  - Base currency (for all trips)
  - Date format (MM/DD/YYYY or DD/MM/YYYY)
  - Theme (Light/Dark/Auto)
  - Currency display format
- **Trip Management**:
  - Archive trip (hide from list)
  - Delete trip (with confirmation)
  - Duplicate trip (template reuse)
- **Data Management**:
  - Export all data as JSON
  - Import JSON backup
  - Clear all data (with confirmation)
- **About**:
  - Version number
  - Feedback link
  - Privacy info (data stays local)

---

## UI/Design Guidelines

### Aesthetic Direction: **Playful + Modern + Travel-Inspired**

**Color Palette** (CSS variables):
```css
--primary: #FF6B35      /* Warm travel orange */
--secondary: #004E89    /* Ocean blue */
--accent: #F4B860       /* Sandy yellow */
--success: #2DD4BF      /* Turquoise (budget safe) */
--warning: #FCD34D      /* Amber (approaching limit) */
--danger: #EF4444       /* Red (over budget) */
--background: #F8FAFC   /* Light gray-blue */
--surface: #FFFFFF      /* White */
--text-primary: #1E293B /* Dark gray */
--text-secondary: #64748B /* Medium gray */
```

**Typography**:
- **Display font**: "Poppins" or "Outfit" (playful, modern)
- **Body font**: "Inter" or "Segoe UI" (clean, readable)
- **Monospace**: "JetBrains Mono" (for amounts/data)

**Key Design Elements**:
- **Rounded corners**: 12px default (modern, friendly)
- **Shadows**: Subtle elevation (no harsh shadows)
- **Animations**:
  - Page transitions: Fade in (200ms)
  - Chart reveals: Staggered animation (500ms total)
  - Number counters: Fast bounce (300ms)
  - Progress bar fill: Smooth (800ms)
  - Hover states: Slight scale + color shift (150ms)
- **Icons**: Lucide React (clean, travel-themed)
- **Spacing**: 8px grid system (generous whitespace)
- **Mobile-first**: Optimize for 375px+ screens

**Component Style Guidelines**:
- Buttons: Rounded, shadow on hover, no borders
- Cards: White background, subtle shadow, padding 16px
- Inputs: Transparent background, bottom border only, focus outline
- Progress bar: Gradient from green → yellow → red
- Charts: Smooth curves, soft colors, no gridlines
- Modals: Full-screen on mobile, centered on desktop

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   ├── trip/
│   │   ├── layout.tsx
│   │   ├── new/page.tsx           # Trip wizard
│   │   └── [id]/
│   │       ├── page.tsx           # Trip dashboard
│   │       ├── charts/page.tsx    # Charts page
│   │       ├── split/page.tsx     # Splitter page
│   │       └── settings/page.tsx  # Settings page
│   ├── share/
│   │   └── [tripId]/page.tsx      # Public share page
│   ├── api/
│   │   ├── exchange-rates/route.ts # Currency API
│   │   └── health/route.ts         # Health check
│   └── globals.css
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── HowItWorks.tsx
│   ├── trip/
│   │   ├── TripWizard.tsx
│   │   ├── BudgetOverview.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── AddExpenseModal.tsx
│   │   ├── Charts.tsx
│   │   ├── ExpenseSplitter.tsx
│   │   ├── ShareModal.tsx
│   │   └── BottomNavigation.tsx
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Skeleton.tsx
│   └── icons/
│       ├── CategoryIcons.tsx       # All category icons
│       └── index.ts
├── store/
│   ├── tripStore.ts               # Zustand store (trips, expenses)
│   ├── uiStore.ts                 # UI state (modals, active tab)
│   └── settingsStore.ts           # User preferences
├── lib/
│   ├── db.ts                       # IndexedDB wrapper
│   ├── currency.ts                # Exchange rate logic
│   ├── utils.ts                   # Helper functions
│   ├── validation.ts              # Zod schemas
│   ├── types.ts                   # TypeScript interfaces
│   ├── constants.ts               # App constants
│   └── export-pdf.ts              # PDF generation
├── hooks/
│   ├── useTrip.ts                 # Trip logic
│   ├── useExpenses.ts             # Expense logic
│   ├── useCurrency.ts             # Currency conversion
│   ├── useLocalStorage.ts         # Persist state
│   └── useOffline.ts              # Detect offline
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # Social preview
│   └── icons/                      # Category icons
├── styles/
│   ├── globals.css                # Tailwind + custom vars
│   ├── animations.css             # Animation keyframes
│   └── responsive.css             # Media queries
├── middleware.ts                   # (Optional) Redirects, headers
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## Implementation Details

### State Management (Zustand)
```typescript
// Key stores:
- tripStore: { trips[], activeTrip, addTrip(), updateExpense(), deleteExpense() }
- uiStore: { isAddExpenseOpen, activeTab, isShareOpen, showSettings }
- settingsStore: { baseCurrency, theme, dateFormat }
```

### Database (IndexedDB)
- **Schema**: 
  - `trips` (indexed by ID)
  - `expenses` (indexed by tripId, date)
  - `travelers` (indexed by tripId)
  - `settings` (key-value store)

### API Integration
- **Exchange Rates**: 
  - Endpoint: `/api/exchange-rates?from=USD&to=EUR`
  - Cache: 24-hour browser cache
  - Fallback: Cached rates if API fails
  - Provider: Open Exchange Rates (free tier)

### PDF Export
- Use `jsPDF` + `html2canvas`
- Render React component to canvas, embed in PDF
- Handle charts, tables, formatting

### Offline & Sync
- Service Worker: Cache pages, API responses
- Detect `navigator.onLine`
- Graceful fallbacks for offline scenario

---

## Key Requirements

### Mobile-First
- All pages must work on 375px screens
- Touch-friendly buttons (48px minimum)
- Responsive images
- Bottom navigation for main features (Dashboard, Charts, Splitter, Settings)

### Performance
- Lazy load charts (only render when visible)
- Compress images
- Code-split by route
- Debounce currency API calls

### Accessibility
- Semantic HTML
- ARIA labels for interactive elements
- Color contrast: WCAG AA minimum
- Keyboard navigation support

### Browser Support
- Chrome/Firefox/Safari (last 2 versions)
- iOS Safari 12+
- Android Chrome

---

## User Flow Summary

1. **Landing Page**: User clicks "Start Planning"
2. **Trip Wizard**: User creates trip (3 steps, ~2 minutes)
3. **Trip Dashboard**: User sees budget overview, adds first expense
4. **Add Expenses**: Quick entry form, real-time budget update
5. **Charts**: User visualizes spending
6. **Share Trip**: User generates link, shares with friends
7. **Splitter**: User calculates who owes who
8. **Export PDF**: User downloads trip report
9. **Offline**: App works without internet, syncs when online

---

## Nice-to-Have Features (Post-MVP)
- Receipt photo upload
- Expense categories customization
- Recurring expenses
- Budget alerts (push notifications)
- Currency rate history charts
- Export to CSV
- Multi-language support (EN, ES, FR, AR)
- Dark mode
- PWA install prompt
- Expense templates

---

## Success Metrics (MVP)
- User can create trip in < 2 minutes
- Can add 10 expenses without friction
- Sharing link works seamlessly
- PDF export looks professional
- Offline mode handles network loss
- Charts render smoothly on mobile
- No login required, full functionality as guest

---

## Deployment
- **Platform**: Vercel (Next.js optimal)
- **Environment Variables**:
  - `NEXT_PUBLIC_EXCHANGE_RATES_API_KEY` (free tier)
  - `NEXT_PUBLIC_APP_URL` (for share links)
- **Build**: `npm run build && npm start`
- **Testing**: Manual testing on mobile devices

---

## Code Quality Standards
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint + Prettier
- **Formatting**: 2-space indents
- **Comments**: Only for complex logic
- **Error Handling**: Graceful fallbacks, user-friendly messages
- **Testing**: (Optional MVP) Unit tests for currency logic, expense calculations

---

## Start Building!

**Next steps**:
1. Initialize Next.js project with this structure
2. Set up Tailwind + custom CSS variables
3. Create Zustand stores
4. Build landing page
5. Build trip wizard (3 steps)
6. Build trip dashboard (budget overview + expense list)
7. Add modal for expenses
8. Integrate charts
9. Build expense splitter
10. Add PDF export
11. Implement offline support (IndexedDB)
12. Polish mobile responsiveness
13. Test on real devices
14. Deploy to Vercel

**Good luck!** 🚀✈️