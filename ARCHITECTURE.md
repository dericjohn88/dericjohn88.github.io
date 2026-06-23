# Personal Meal Reminder Application - Architecture Documentation

## Current Architecture Overview

### Tech Stack

- **Frontend**: Vanilla JavaScript (ES modules)
- **Authentication**: Firebase Authentication with Google OAuth
- **Hosting**: GitHub Pages / Static hosting
- **Data Persistence**: Firebase Auth (browser local persistence)
- **Styling**: CSS with custom design system

### Core Components

#### 1. Frontend Application (`app.js`)

```
├── Firebase Initialization
│   ├── App initialization (v10.12.2)
│   └── Google Auth setup with popup/redirect handling
│
├── Authentication Flow
│   ├── Sign in with Google (popup + redirect fallback)
│   ├── Persistence: browserLocalPersistence
│   └── State management via onAuthStateChanged
│
├── UI Rendering
│   ├── Tool Grid (dynamic cards for each API)
│   ├── Detail Panel (public + private views)
│   └── Stats Dashboard (health metrics, activity)
│
└── Configuration-driven rendering
    └── site-config.js provides tool metadata
```

#### 2. Configuration Layer (`site-config.js`)

```javascript
{
  firebase: { /* Firebase config */ },
  owner: { previewLabel, previewSummary, publicSummary },
  tools: [
    { slug, name, health, status, publicRoute, activity, uptime, privateSurface }
  ]
}
```

#### 3. HTML Structure (`index.html`)

- Hero section with welcome message & auth buttons
- Stats grid showing aggregate metrics
- Tools grid with clickable cards
- Detail panel for selected tool (public + private views)

### Data Flow

```
User Action → Firebase Auth → State Update → UI Re-render
          ↓
    site-config.js loaded
          ↓
    Tools rendered from config
          ↓
    Selected tool shows in detail panel
```

## Current Architecture Strengths

1. **Separation of Concerns**: Config-driven rendering keeps HTML clean
2. **Security Model**: Public vs private surface separation
3. **Scalable Design**: Easy to add new tools via config
4. **Auth Integration**: Firebase provides secure, seamless auth
5. **Responsive**: Built for mobile-first experience

## Recommended Improvements

### 1. Add Meal Reminder Core Features

#### A. Data Models

```javascript
// meals/ - Add meal data structure
{
  id: string,
  name: string,
  category: 'breakfast'|'lunch'|'dinner'|'snack',
  ingredients: string[],
  prepTime: number (minutes),
  calories: number,
  instructions: string[],
  tags: string[],
  isFavorite: boolean,
  lastPrepared: timestamp|null
}

// reminders/ - Add reminder structure
{
  id: string,
  mealId: string,
  dateTime: timestamp,
  recurring: boolean,
  repeatPattern: 'daily'|'weekly'|'custom',
  notifications: {
    browser: boolean,
    email: boolean,
    push: boolean
  }
}

// shopping/ - Add shopping list
{
  id: string,
  name: string,
  quantity: number,
  unit: string,
  category: string,
  bought: boolean,
  notes: string
}
```

#### B. Database Schema (PostgreSQL via PostgREST)

Based on the meal-prep-reminders project structure visible:

```sql
-- Users & Auth
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Meals
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  ingredients JSONB,
  prep_time INTEGER,
  calories INTEGER,
  instructions JSONB,
  tags TEXT[],
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id UUID REFERENCES meals(id),
  user_id UUID REFERENCES users(id),
  scheduled_for TIMESTAMP NOT NULL,
  recurring BOOLEAN DEFAULT FALSE,
  repeat_pattern VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Shopping List
CREATE TABLE shopping_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2),
  unit VARCHAR(50),
  category VARCHAR(255),
  bought BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Push Notifications (Novu integration)
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  channel VARCHAR(50) NOT NULL, -- 'email'|'push'|'sms'
  endpoint TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Scheduler Events
CREATE TABLE scheduler_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reminder_id UUID REFERENCES reminders(id),
  scheduled_for TIMESTAMP NOT NULL,
  executed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Enhanced Frontend Architecture

#### A. Component Structure

```
frontend/src/
├── components/
│   ├── MealCard.jsx
│   ├── ReminderList.jsx
│   ├── ShoppingListItem.jsx
│   ├── CalendarView.jsx
│   └── AuthGuard.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Meals.jsx
│   ├── Reminders.jsx
│   ├── Shopping.jsx
│   └── Settings.jsx
├── hooks/
│   ├── useMeals.js
│   ├── useReminders.js
│   ├── useShoppingList.js
│   └── useNotifications.js
└── context/
    ├── AuthContext.jsx
    └── NotificationContext.jsx
```

#### B. State Management

```javascript
// Use React Context or Zustand for state
const store = {
  meals: [],
  reminders: [],
  shoppingList: [],
  user: null,
  notifications: {
    enabled: true,
    channels: ["browser", "email"],
  },
};
```

### 3. API Layer Architecture

#### A. REST Endpoints (PostgREST)

```
GET    /meals              - List all meals
GET    /meals/:id          - Get meal by ID
GET    /meals/favorites    - Get favorite meals
POST   /meals              - Create new meal
PUT    /meals/:id          - Update meal
DELETE /meals/:id          - Delete meal

GET    /reminders          - List all reminders
GET    /reminders/upcoming - Get upcoming reminders
POST   /reminders          - Create reminder
PUT    /reminders/:id      - Update reminder
DELETE /reminders/:id      - Delete reminder

GET    /shopping           - Get shopping list
POST   /shopping           - Add item
PUT    /shopping/:id       - Update/buy item
DELETE /shopping/:id       - Remove item

GET    /schedule           - Calendar view
POST   /schedule/event     - Create scheduled event
```

#### B. GraphQL Alternative (optional)

Consider adding Supabase or direct PostgREST with GraphQL layer for complex queries.

### 4. Notification System

#### A. Multi-Channel Notifications

```javascript
// useNotifications.js
const notificationChannels = {
  browser: new NotificationService(), // Service Worker + Web Notifications
  email: new EmailService(), // SendGrid/Sendy integration
  push: new PushService(), // Novu backend integration
};

// Trigger reminder
async function triggerReminder(reminder) {
  await notificationChannels.browser.show("Time to prepare " + meal.name);
  await notificationChannels.email.send({
    to: user.email,
    subject: `Meal Reminder: ${meal.name}`,
    body: `It's time to prepare your ${meal.name}!`,
  });

  // Push via Novu
  if (user.pushToken) {
    await novuClient.triggerPush({
      userId: user.id,
      channel: "push",
      message: `Time for ${meal.name}!`,
    });
  }
}
```

#### B. Scheduler Service

```javascript
// scheduler/src/index.js
import cron from "node-cron";
import { scheduleReminder } from "./scheduler.js";

// Daily check for reminders
cron.schedule("*/15 * * * *", async () => {
  const upcoming = await db.query(
    "SELECT * FROM reminders WHERE scheduled_for <= NOW() AND executed = false",
  );

  for (const reminder of upcoming) {
    await scheduleReminder(reminder);
  }
});
```

### 5. Security Enhancements

#### A. Row-Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- User can only see their own reminders
CREATE POLICY user_reminders ON reminders
  FOR SELECT USING (user_id = current_setting('app.user_id')::uuid);

-- Users can create/update/delete their own data
CREATE POLICY user_meals ON meals
  FOR ALL USING (true) -- Public access to meals
```

#### B. API Rate Limiting

```javascript
// Add rate limiting middleware
const rateLimit = require("express-rate-limit");

const mealLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many meal API requests",
});
```

### 6. Performance Optimizations

#### A. Caching Strategy

```javascript
// Redis or in-memory cache for frequently accessed data
const cache = new LRUCache({ max: 1000 });

async function getCachedMeals() {
  const cached = cache.get("meals");
  if (cached) return cached;

  const meals = await db.query("SELECT * FROM meals");
  cache.set("meals", meals, 300); // 5 min TTL
  return meals;
}
```

#### B. Service Worker for Offline Support

Already present in `frontend/public/service-worker.js` - enhance with:

- Offline-first caching strategy
- Background sync for reminders
- Queue management for API calls

### 7. Monitoring & Observability

#### A. Health Checks

```javascript
// Add /health endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});
```

#### B. Logging & Tracing

```javascript
// Add structured logging
const logger = winston.createLogger({
  format: formats.combine(timestamps(), json(), errorIfErrorLoggable()),
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});
```

### 8. Deployment Architecture

```
┌─────────────────────────────────────────────┐
│           GitHub Pages (Static)              │
│         index.html, app.js, styles.css      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Firebase Authentication            │
│        (Auth + Security Layer)              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         PostgREST API Server                │
│       PostgreSQL Database                   │
│     Scheduler Service (Node.js)             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Notification Services                │
│    Email (SendGrid), Push (Novu), SMS       │
└─────────────────────────────────────────────┘
```

## Implementation Priority

### Phase 1: Core Data & UI (Week 1-2)

1. Add meals CRUD to database
2. Create meal listing/detail views
3. Implement shopping list
4. Basic reminder scheduling

### Phase 2: Notifications (Week 3-4)

1. Browser notifications with Service Worker
2. Email notifications
3. Push notification integration (Novu)
4. Scheduler service setup

### Phase 3: Advanced Features (Week 5-6)

1. Recipe recommendations
2. Nutritional tracking
3. Meal planning calendar
4. Analytics dashboard

### Phase 4: Polish & Scale (Week 7-8)

1. Performance optimization
2. Security hardening
3. Monitoring setup
4. Documentation completion

## Next Steps

1. **Review current index.html** - Add new sections for meals, reminders, shopping
2. **Update site-config.js** - Add meal data and feature flags
3. **Create database migrations** - Set up PostgreSQL schema
4. **Implement API endpoints** - Build PostgREST queries
5. **Add notification services** - Integrate email/push/SMS

---

_Last updated: $(date +%Y-%m-%d)_
