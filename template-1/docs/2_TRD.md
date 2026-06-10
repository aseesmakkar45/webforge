# Technical Requirements Document (TRD)

## 1. Tech Stack Overview
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui.
- **3D Engine (Visuals):** Three.js, React Three Fiber, Drei, custom GLSL shaders.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (accessed via Mongoose).
- **AI Provider:** Google Gemini API.

## 2. Security Architecture
- **Authentication:** Stateless JWT stored in secure HttpOnly cookies (or Memory + Refresh token).
- **Hashing:** `bcryptjs` (Cost factor: 10) for passwords.
- **Validation:** `zod` schemas for every API input body.
- **Rate Limiting:** IP-based rate limiter (e.g., `express-rate-limit`) on Auth and AI endpoints to prevent abuse.
- **Protected Routes:** Next.js middleware checking JWT before allowing access to `/app/*`.

## 3. Scalability Architecture
- **Horizontal Scaling:** Stateless Node.js backend can be replicated across Docker containers (Render/ECS).
- **API Layer:** Separated from frontend via `/api` routes (can be Serverless Next.js functions or dedicated Express server).
- **Database Scaling:** MongoDB Atlas auto-scaling, indexing on `userId` and `createdAt` for fast queries.
- **Caching:** Redis cache for frequent queries (e.g., User Settings, repeated AI prompts).
- **Future AI Scaling:** Message queues (RabbitMQ/Bull) for long-running AI background tasks.
