# Information Architecture & User Flows

## 1. Information Architecture (Sitemap)

- **Landing Page (`/`)**
  - Navbar, Hero Section, Features Section, How It Works, Testimonials, Pricing, FAQ, Footer
- **Authentication**
  - Login (`/login`)
  - Signup (`/signup`)
  - Forgot Password (`/forgot-password`)
  - Reset Password (`/reset-password`)
- **Application Core (`/app`)**
  - Dashboard (`/app/dashboard`)
  - Profile (`/app/profile`)
  - Settings (`/app/settings`)
  - Notifications (`/app/notifications`)
  - Analytics (`/app/analytics`)
  - History (`/app/history`)
  - Admin Panel (`/app/admin`)
- **AI Workspace (`/app/workspace`)**
  - Chat Interface, Prompt Input, Conversation History, File Upload, AI Output Viewer, Export Functionality, Suggested Prompts.

## 2. User Flows

### A. Authentication Flow
1. User lands on `/` and clicks "Get Started".
2. Directed to `/signup`. User inputs credentials.
3. API validates input via Zod and creates DB record. Returns JWT.
4. User redirected to `/app/dashboard`.

### B. Core Dashboard Flow
1. User logs in and arrives at Dashboard.
2. Views KPI Cards, Activity Feed, Analytics Charts, and AI Insights Panel.
3. User selects a Quick Action or a Recommended Prompt.

### C. AI Workspace Flow
1. User navigates to `/app/workspace`.
2. Uploads a file (optional) and types a prompt.
3. System shows Loading State (Framer Motion skeleton/spinner).
4. Backend streams or returns AI Output.
5. User views output, saves to History, or Exports to PDF/Markdown.
