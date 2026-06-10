# Application Flow

## 1. Landing Page (`/`)
- **Visuals:** Immersive 3D hero background (WebGL) with dynamic text.
- **Action:** "Get Started" button leading to Registration.

## 2. Authentication Flow
- **Registration (`/register`):** User inputs Email, Username, and Password. Zod validates the form. Data is sent to `/api/auth/register`.
- **Login (`/login`):** User inputs Email and Password. Backend returns a JWT. Frontend stores the token (localStorage/cookies) and redirects to the Dashboard.

## 3. Main Dashboard (`/dashboard`)
- **State:** Protected route. Redirects to `/login` if no valid JWT is found.
- **Features:** 
  - Displays user profile data fetched from `/api/user/profile`.
  - Main interface for the AI Interaction module.

## 4. AI Interaction Flow
- User types a prompt into a chat interface or configuration panel.
- Frontend sends the prompt to the backend (`/api/ai/generate`).
- Backend authenticates the request, forwards the prompt to the Gemini API, and processes the response.
- Backend saves the interaction to MongoDB and returns the result to the Frontend.
- Frontend updates the UI (or 3D scene) based on the AI response.
