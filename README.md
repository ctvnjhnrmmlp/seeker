# Seeker

_A productivity dashboard for job seekers to manage applications and track upskilling progress — integrated with Google and powered by modern web technologies._

> Stay organized. Stay focused. Stay job-ready.

## Overview

**Seeker** helps job seekers streamline their job search by combining application tracking with upskilling insights — all in one simple, integrated interface.

It’s designed for:

- Recent graduates and job hunters managing multiple applications
- Career switchers wanting to visualize their growth
- Professionals staying accountable in their upskilling journey

## Why This Project?

Job seekers often juggle spreadsheets, task managers, and scattered notes to stay on top of applications and self-learning. This dashboard solves that by:

- **Consolidating** application status and upskilling data
- **Visualizing** your job hunt journey
- **Integrating** with your Google account for seamless access

Our goal is to make job-seeking **organized**, **motivating**, and **actionable**.

## Features

- **Job Application Pipeline**
  Track jobs through the funnel — **Applied**, **Interview**, **Offer**
- **Detailed Application Entries**
  Add company, position, source, date, and notes
- **Progress Visualization**
  See your application funnel and learning goals on a single dashboard
- **Authentication with GitHub & LinkedIn**
  Sign in easily with your professional profiles

- **Skill Up Section** _(coming soon)_
  Track online courses, certifications, and skill-building progress

## Roadmap

- [x] Phase 1: Job Application Tracking MVP
- [x] Phase 2: Authentication via GitHub & LinkedIn
- [ ] Phase 3: Skill Up Progress Tracking
- [ ] Phase 4: Analytics & Suggestions Engine
- [ ] Phase 5: Mobile-first Design & Notifications

## Tech Stack

| Category     | Tools & Frameworks                  |
| ------------ | ----------------------------------- |
| **Frontend** | Next.js 15, Tailwind CSS            |
| **Backend**  | Next.js API Routes, Prisma ORM      |
| **Database** | MongoDB                             |
| **Auth**     | Auth.js (GitHub & LinkedIn OAuth)   |
| **Hosting**  | Vercel (or your preferred platform) |

## Getting Started

### Prerequisites

- Node.js & npm
- Git
- MongoDB URI
- OAuth credentials for GitHub and/or LinkedIn

### Installation

```bash
git clone https://github.com/ctvnjhnrmmlp/seeker.git
cd seeker
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory and define:

```env
NEXT_PUBLIC_BASE_URL=""
ENVIRONMENT=""
AUTH_SECRET=""
DATABASE_URI=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
UPLOADTHING_TOKEN=""
VAPID_PUBLIC_KEY=""
VAPID_PRIVATE_KEY=""
```

## Usage

```bash
# Run development server
npm run dev

# Optional: run any custom scripts or seed database
npm run seed
```

## Architecture

```
[Next.js + Tailwind (Frontend)]
         |
   API Routes (Backend)
         |
     Prisma ORM
         |
      MongoDB
         |
   OAuth via Auth.js
```

## Deployment

- **Hosting**: Vercel (or alternative like Netlify, Render)
- **Database**: MongoDB Atlas
- **Auth**: GitHub & LinkedIn OAuth via Auth.js

## Contributing

We welcome your ideas, fixes, and improvements!

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Inspired by tools like Huntr, Notion Job Boards, and Trello pipelines
- Built by John Rommel Octaviano
- Powered by: Next.js · Prisma · MongoDB · Tailwind CSS · Auth.js
