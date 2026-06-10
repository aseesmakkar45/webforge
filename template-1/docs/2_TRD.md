# Technical Requirements Document (TRD)

## 1. Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui.
- **3D Engine:** Three.js, React Three Fiber, Drei, custom GLSL shaders.
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Zod.
- **Database:** MongoDB Atlas (accessed via Mongoose).
- **AI Provider:** Google Gemini API.

## 2. System Architecture
- **Client:** Browser-rendered Next.js React application.
- **API Layer:** Express.js REST API providing JSON responses.
- **Database Layer:** Cloud-hosted MongoDB cluster.

## 3. Security Requirements
- All API requests to protected routes must include a valid JWT in the `Authorization: Bearer <token>` header.
- Passwords must be hashed using bcryptjs (salt rounds: 10) before saving to the database.
- CORS must be configured to only allow requests from the frontend domain/localhost port.
- `.env` files must NEVER be committed to version control.

## 4. Performance Requirements
- 3D assets must be optimized (e.g., compressed GLTF/GLB formats, low-poly models where possible).
- Next.js images must use the built-in `<Image />` component for automatic optimization.
