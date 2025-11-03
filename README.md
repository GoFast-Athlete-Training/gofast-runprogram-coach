# Boys Gotta Run - Coach Portal

Coach & Head Coach management portal for Boys Gotta Run program. Manage rosters, mark attendance, push lesson recaps. Head Coach sees everything; normal coach sees their site only.

## Overview

This is a **Pattern 2 (Demo/Scaffold)** application following GoFast Frontend Build Standards. Demo-only build with mock data, ready for backend integration.

**Deployment**: `coach.gofast.com`

## Features

- Simple email authentication (demo)
- Coach Dashboard with weekly stats
- Athlete Roster & Attendance management
- Workout/Lesson plan viewer
- Weekly feedback submission (1-10 rating + notes)
- Head Coach HQ (all sites, broadcast, overall stats)

## Tech Stack

- **React** 18.3.1
- **Vite** 5.4.10
- **React Router** 6.28.0
- **Tailwind CSS** 3.4.15
- **Lucide React** (icons)
- **shadcn/ui** patterns

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_BASE=https://api.gofast.com/api
VITE_PROJECT_KEY=bgr
```

## Project Structure

```
src/
├── pages/           # Page components
│   ├── Login.jsx    # Simple email auth
│   ├── Dashboard.jsx # Coach's Corner main view
│   ├── Roster.jsx   # Athlete list + attendance
│   ├── Workout.jsx  # Lesson plan of the week
│   ├── Report.jsx   # Feedback form
│   └── HeadCoach.jsx # Head Coach HQ
├── components/      # Reusable components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── LessonCard.jsx
│   ├── AttendanceTable.jsx
│   ├── ReportForm.jsx
│   └── BroadcastForm.jsx
├── hooks/           # Custom hooks
│   └── useHydrateCoach.js
├── data/            # Mock data (demo)
│   └── workouts.json
└── lib/             # Utilities
    └── utils.js
```

## Routes

- `/` - Login screen
- `/dashboard` - Weekly banner + quick stats
- `/roster` - Athlete list + attendance
- `/workout` - Lesson plan of the week
- `/report` - Feedback form (1-10 rating + notes)
- `/headcoach` - HQ view (Head Coach only)

## Authentication

**Demo Mode**: Simple email-based authentication stored in localStorage.

- Any email works for demo
- Add "headcoach" in email to access Head Coach features
- In production, this will use backend JWT or magic-link auth

## Backend Integration

Currently using mock data. Ready to connect to GoFast Backend:

- `GET /api/bgr/coach/:coachId/hydrate`
- `GET /api/bgr/coach/:coachId/roster?siteId=:siteId`
- `GET /api/bgr/workout/current?siteId=:siteId`
- `GET /api/bgr/attendance?siteId=:siteId&week=:week`
- `POST /api/bgr/report` (submit feedback)

See `useHydrateCoach.js` hook for integration points.

## Logo

Place `logo.jpg` in the `public/` folder (from `gofastfrontend-demo/public/logo.jpg`).

## Documentation

See `gofastfrontend-demo/RunProgramBuild.md` for complete build documentation.

---

**Pattern**: Demo/Scaffold  
**Status**: ✅ Ready for demo, backend integration pending

