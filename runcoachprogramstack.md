# Run Coach Program Stack - Architecture & Use Cases

## Overview

Multi-site youth running program management system with three distinct user roles: **Head Coach**, **Coaches**, and **Parents**. The system enables head coaches to manage multiple sites, coaches to deliver workouts and provide feedback, and parents to register their children and track progress.

---

## System Architecture

### Three-Tier Application Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Applications                     │
├─────────────────────────────────────────────────────────────┤
│  Parent Portal    │  Coach Portal    │  Head Coach Portal  │
│  (parent.gofast)  │  (coach.gofast)   │  (coach.gofast)      │
│                   │                   │  (role-based)        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (GoFast v2)                   │
│              /api/bgr/* endpoints                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Database                                │
│  Sites │ Coaches │ Athletes │ Workouts │ Feedback │ Reports │
└─────────────────────────────────────────────────────────────┘
```

---

## User Roles & Use Cases

### 1. Head Coach

**Role**: Program administrator managing multiple sites and all program operations.

**Responsibilities**:
- Manage multiple program sites (e.g., Discovery Elementary, Hydrate, etc.)
- Onboard new coaches and assign them to sites
- Create and distribute weekly workout plans to all sites
- Monitor program-wide statistics (attendance, feedback submissions, athlete progress)
- Broadcast messages to all coaches
- View aggregated data across all sites

**Key Features**:
- **Site Management**: View all sites, their coaches, and athlete counts
- **Coach Onboarding**: Add new coaches and assign them to specific sites
- **Workout Distribution**: Create weekly workout plans that automatically sync to all coaches
- **Program Analytics**: 
  - Total sites across program
  - Total active coaches
  - Total registered athletes
  - Program-wide attendance rate
  - Feedback submission rates
- **Broadcasting**: Send messages to all coaches simultaneously
- **Multi-Site Visibility**: Drill down into any site's performance

**Use Case Flow**:
1. Head Coach logs in → Sees Head Coach HQ dashboard
2. Creates weekly workout plan (Week 7: Dependability & Loyalty) with:
   - Character focus theme
   - Workout exercises (warm up, conditioning, runs)
   - Discussion topics
   - Coach instructions (e.g., "Map out the 5K course")
   - Home assignments
3. Workout automatically appears in all coaches' dashboards
4. Monitors feedback submissions across all sites
5. Sends broadcast message: "Remember to coordinate with Extended Day for 5K spectating"

**Technical Implementation**:
- Role-based access: `role: 'headcoach'` in authentication
- Head Coach sees all sites, regular coaches see only their assigned site
- Workout plans created by Head Coach propagate to all coach portals
- Dashboard shows aggregated stats from all sites

---

### 2. Coaches

**Role**: Site-level instructors who deliver workouts and provide athlete feedback.

**Responsibilities**:
- Receive weekly workout plans from Head Coach
- View detailed workout plans with character themes, exercises, and discussion topics
- Manage athlete rosters for their assigned site
- Track attendance for weekly sessions
- Provide feedback to athletes (ratings + comments)
- Execute coach instructions from Head Coach

**Key Features**:
- **Dashboard**: 
  - Weekly workout banner with character focus
  - School/site name display
  - Quick stats (athletes, workout plan, feedback submitted)
- **Workout View**: 
  - Full lesson plan with character theme (e.g., "Dependability & Loyalty")
  - Goal (e.g., "2 ¾ miles")
  - Workout plan breakdown:
    - Warm up exercises
    - Body weight conditioning (sets, reps, exercise list)
    - Running exercises
  - Discussion topics with examples and definitions
  - Coach instructions (e.g., "Map out the 5K run course")
  - Home assignments to share with parents
- **Give Feedback**: 
  - List of athletes (Discovery, Hydrate, etc. - ~10 kids per coach)
  - Star ratings (1-5) for each category:
    - Effort
    - Attitude
    - Performance
    - Listening
    - Working with Others
  - Written comments
  - Track which athletes have received feedback
- **Roster Management**: 
  - View all athletes at their site
  - Mark attendance
  - Search athletes

**Use Case Flow**:
1. Coach logs in → Sees dashboard with current week's workout
2. Clicks "View Full Workout Plan" → Sees detailed lesson:
   - Week 7: Dependability & Loyalty
   - Goal: 2 ¾ miles
   - Exercises: 3 lap warm up, body weight conditioning, 8 laps at tempo
   - Discussion talking points about loyalty and dependability
   - Coach instruction: "Map out the 5K course (600-800m laps)"
3. Prepares session using workout plan
4. After session → Navigates to "Give Feedback"
5. Selects athlete → Rates performance → Adds comments → Submits
6. Repeats for all athletes who attended

**Technical Implementation**:
- Role-based access: `role: 'coach'` with `siteId` assignment
- Coaches only see athletes from their assigned site
- Workout plans synced from Head Coach's weekly plan
- Feedback stored per athlete per week
- Attendance tracked per session

---

### 3. Parents

**Role**: Register children and track their progress in the program.

**Responsibilities**:
- Register child for program at specific site
- View weekly workout plans their child will be doing
- See coach feedback on their child's performance
- Track progress over time
- RSVP for sessions
- Complete weekly surveys

**Key Features**:
- **Registration**: 
  - Select site/location
  - Enter parent and child information
  - Payment information
  - Registration confirmation
- **Dashboard**: 
  - School/site banner
  - Current week's lesson focus
  - Weekly workout banner with character theme
  - RSVP functionality
  - Weekly survey forms
- **Lesson Details**: 
  - Full workout plan view
  - Character focus explanation
  - Discussion topics
  - Home assignments
- **Athlete Progress**: 
  - View feedback by week
  - Star ratings across categories
  - Coach comments (available after 24-hour delay)
  - Progress tracking over time
- **Homework Logging**: Track at-home running assignments

**Use Case Flow**:
1. Parent visits parent portal → Sees welcome page
2. Selects site (e.g., "Discovery Elementary")
3. Completes registration form:
   - Parent name, email, phone
   - Child name, age, grade
   - Payment method
4. Receives confirmation → Redirected to dashboard
5. Views weekly workout: "Week 7: Dependability & Loyalty"
6. Clicks "View Full Lesson Plan" → Sees what child will do:
   - 3 lap warm up
   - Body weight conditioning (squats, jumping jacks, etc.)
   - Run 8 laps at tempo
   - Discussion about loyalty and dependability
7. After session → Checks "Athlete Progress"
8. Sees coach feedback (24h delay):
   - Effort: 4/5 stars
   - Attitude: 5/5 stars
   - Performance: 4/5 stars
   - Comments: "Alex showed great improvement in endurance..."

**Technical Implementation**:
- Site-based registration
- Parent-child relationship in database
- Feedback visibility delayed by 24 hours
- Weekly lesson plans synced from Head Coach's plans

---

## Data Flow

### Workout Distribution Flow

```
Head Coach creates workout
    ↓
Stored in database (workout table)
    ↓
All coaches' dashboards automatically update
    ↓
Coaches view detailed workout plan
    ↓
Parents see workout in their dashboard
    ↓
Coaches deliver workout to athletes
    ↓
Coaches submit feedback
    ↓
Parents see feedback (24h delay)
```

### Feedback Flow

```
Coach completes session
    ↓
Coach navigates to "Give Feedback"
    ↓
Selects athlete from roster (~10 kids)
    ↓
Rates athlete (1-5 stars) in 5 categories
    ↓
Adds written comments
    ↓
Submits feedback
    ↓
Feedback stored with timestamp
    ↓
After 24 hours → Parent can view feedback
    ↓
Head Coach sees submission in program stats
```

### Registration Flow

```
Parent visits parent portal
    ↓
Selects site (Discovery, Hydrate, etc.)
    ↓
Completes registration form
    ↓
Payment processed
    ↓
Athlete added to site roster
    ↓
Coach sees new athlete in roster
    ↓
Parent receives confirmation
    ↓
Parent can now access dashboard
```

---

## Multi-Site Architecture

### Site Structure

Each site is an independent program location with:
- **Site ID**: Unique identifier
- **Site Name**: e.g., "Discovery Elementary", "Hydrate"
- **Assigned Coaches**: 2-3 coaches per site typically
- **Athlete Roster**: 10-20 athletes per site
- **Site-Specific Stats**: Attendance, feedback rates, etc.

### Site Assignment

- **Head Coach**: Sees all sites, can manage any site
- **Coaches**: Assigned to ONE site, only see their site's athletes
- **Parents**: Register for ONE site, see only their child's site

### Cross-Site Operations

Head Coach can:
- View aggregated stats across all sites
- Create workout plans that apply to all sites
- Broadcast messages to all coaches (all sites)
- Compare performance across sites
- Onboard coaches and assign to specific sites

---

## Key Features by Role

### Head Coach Features

| Feature | Description |
|---------|-------------|
| **Site Management** | View all sites, coaches, athlete counts |
| **Coach Onboarding** | Add new coaches, assign to sites |
| **Workout Creation** | Create weekly workout plans with character themes |
| **Program Analytics** | View aggregated stats across all sites |
| **Broadcasting** | Send messages to all coaches |
| **Multi-Site Dashboard** | See all sites' performance at a glance |

### Coach Features

| Feature | Description |
|---------|-------------|
| **Workout View** | Detailed weekly workout plans from Head Coach |
| **Character Themes** | See weekly character focus (e.g., Dependability & Loyalty) |
| **Give Feedback** | Rate athletes (1-5 stars) + comments |
| **Roster Management** | View and manage athlete roster |
| **Attendance Tracking** | Mark attendance for sessions |
| **Coach Instructions** | See specific tasks from Head Coach |

### Parent Features

| Feature | Description |
|---------|-------------|
| **Registration** | Register child for program at specific site |
| **Workout View** | See weekly workout plans child will do |
| **Progress Tracking** | View coach feedback by week |
| **RSVP** | RSVP for upcoming sessions |
| **Surveys** | Complete weekly program surveys |
| **Homework Logging** | Track at-home running assignments |

---

## Technical Stack

### Frontend Applications

1. **Coach Portal** (`gofast-runprogram-coach`)
   - React 18.3.1
   - Vite 5.4.10
   - React Router 6.28.0
   - Tailwind CSS 3.4.15
   - Lucide React (icons)
   - shadcn/ui patterns

2. **Parent Portal** (`gofast_runprogram_parent`)
   - Same tech stack as Coach Portal
   - Separate deployment (`parent.gofast.com`)

### Backend Integration

**API Endpoints** (GoFast Backend v2):

```
# Head Coach
GET    /api/bgr/headcoach/sites              # All sites
POST   /api/bgr/headcoach/workout             # Create workout
GET    /api/bgr/headcoach/stats               # Program stats
POST   /api/bgr/headcoach/broadcast           # Broadcast to coaches
POST   /api/bgr/headcoach/coach               # Onboard coach

# Coaches
GET    /api/bgr/coach/:coachId/hydrate        # Dashboard data
GET    /api/bgr/coach/:coachId/roster         # Athlete roster
GET    /api/bgr/workout/current?siteId=:id   # Current workout
POST   /api/bgr/feedback                      # Submit feedback
POST   /api/bgr/attendance                    # Mark attendance

# Parents
GET    /api/bgr/parent/:parentId/hydrate      # Dashboard data
POST   /api/bgr/parent/register               # Register child
GET    /api/bgr/feedback?athleteId=:id         # View feedback
GET    /api/bgr/lesson/:lessonId              # Lesson details
```

---

## Database Schema (Conceptual)

### Core Tables

**Sites**
- `id`, `name`, `location`, `created_at`

**Coaches**
- `id`, `name`, `email`, `role` ('coach' | 'headcoach'), `site_id` (nullable for head coach)

**Parents**
- `id`, `name`, `email`, `phone`, `site_id`

**Athletes**
- `id`, `name`, `age`, `grade`, `parent_id`, `site_id`

**Workouts**
- `id`, `week`, `week_focus`, `title`, `description`, `goal`, `workout_data` (JSON), `discussion_data` (JSON), `instructor_notes`, `created_by` (head coach id), `created_at`

**Feedback**
- `id`, `athlete_id`, `coach_id`, `week`, `effort`, `attitude`, `performance`, `listening`, `working_with_others`, `comments`, `created_at`

**Attendance**
- `id`, `athlete_id`, `session_date`, `present`, `coach_id`

---

## Onboarding Flow

### Head Coach Onboarding

1. System administrator creates Head Coach account
2. Head Coach logs in → Sees Head Coach HQ
3. Head Coach creates first site (e.g., "Discovery Elementary")
4. Head Coach adds coaches to site
5. Head Coach creates first weekly workout
6. System is ready for parent registration

### Coach Onboarding

1. Head Coach creates coach account
2. Head Coach assigns coach to site
3. Coach receives login credentials
4. Coach logs in → Sees dashboard with assigned site
5. Coach can now view workouts and manage roster

### Parent Onboarding

1. Parent visits parent portal
2. Selects site from available options
3. Completes registration form
4. Payment processed
5. Athlete added to site roster
6. Coach sees new athlete in roster
7. Parent can access dashboard

---

## Future Enhancements

### Planned Features

- **Head Coach Workout Builder**: Rich text editor for creating workout plans
- **Coach Scheduling**: Assign coaches to specific sessions
- **Parent Messaging**: Direct communication between coaches and parents
- **Analytics Dashboard**: Advanced reporting for Head Coach
- **Mobile App**: Native mobile apps for coaches and parents
- **Photo Uploads**: Coaches can upload session photos
- **Achievement Badges**: Track athlete achievements over time
- **Multi-Program Support**: Head Coach can manage multiple programs

---

## Deployment

### Frontend Applications

- **Coach Portal**: `coach.gofast.com` (Vercel)
- **Parent Portal**: `parent.gofast.com` (Vercel)
- **Head Coach**: Same as Coach Portal (role-based access)

### Environment Variables

```env
VITE_API_BASE=https://api.gofast.com/api
VITE_PROJECT_KEY=bgr
```

---

## Security Considerations

- **Role-Based Access Control**: Head Coach, Coach, Parent roles
- **Site Isolation**: Coaches only see their assigned site
- **Feedback Delay**: 24-hour delay before parents see feedback
- **Authentication**: JWT tokens or magic-link auth
- **Data Privacy**: Parent data only visible to assigned coach

---

## Status

**Current State**: ✅ Demo/Scaffold Pattern Complete

- All three user roles implemented
- Multi-site architecture scaffolded
- Workout distribution flow working
- Feedback system functional
- Ready for backend integration

**Next Steps**:
1. Connect to GoFast Backend API
2. Implement real authentication
3. Add payment processing
4. Deploy to production
5. User testing with real data

---

*Last Updated: January 2025*

