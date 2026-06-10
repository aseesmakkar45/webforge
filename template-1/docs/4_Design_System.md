# UI/UX Design System

## 1. Color Palette
- **Primary:** `[Insert Hex, e.g., #3b82f6]`
- **Secondary:** `[Insert Hex, e.g., #8b5cf6]`
- **Background:** `[Insert Hex, e.g., #0f172a]` (Dark mode preferred for 3D/GLSL backgrounds)
- **Text:** `[Insert Hex, e.g., #f8fafc]`

## 2. Typography
- **Headings:** Inter or Outfit (Google Fonts).
- **Body:** Roboto or standard sans-serif.

## 3. Component Library (shadcn/ui)
- We will rely on shadcn/ui for consistent, accessible components.
- **Buttons:** Rounded corners, subtle hover state scaling via Framer Motion.
- **Inputs:** Dark backgrounds with subtle glowing borders on focus.
- **Cards:** Glassmorphism effect (semi-transparent background with backdrop blur).

## 4. Animation & 3D Guidelines
- **Framer Motion:** Used for page transitions and micro-interactions (e.g., button clicks, modal popups).
- **React Three Fiber:** Used for the main interactive background. 
  - *Rule:* The 3D canvas must sit behind the UI layer (`z-index: -1`) and must not block pointer events for UI elements.
