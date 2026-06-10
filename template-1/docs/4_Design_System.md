# Design System

**Inspiration:** Linear, Vercel, Stripe, OpenAI, Notion, Raycast.
**Vibe:** Premium, Minimal, Modern, Clean, Professional.

## 1. Typography
- **Font Family:** `Inter` (UI) and `Geist` or `Outfit` (Headings)
- **Heading Scale:** H1 (3.75rem), H2 (3rem), H3 (2.25rem), H4 (1.875rem), H5 (1.5rem), H6 (1.25rem)
- **Body Scale:** Base (1rem), Sm (0.875rem), Xs (0.75rem)

## 2. Color Palette
- **Primary:** Black (`#000000`) or White (`#ffffff`) depending on Dark/Light mode.
- **Secondary:** Neutral Gray (`#737373`)
- **Accent:** Electric Blue (`#3b82f6`) or Purple (`#8b5cf6`)
- **Success:** Emerald (`#10b981`)
- **Warning:** Amber (`#f59e0b`)
- **Error:** Rose (`#e11d48`)
- **Background:** Slate 950 (`#020617`) for Dark Mode.
- **Surface:** Slate 900 (`#0f172a`)
- **Border:** Slate 800 (`#1e293b`)
- **Text:** Slate 50 (`#f8fafc`)

## 3. Spacing & Shape System
- **Spacing:** standard Tailwind scale (4px base) -> `p-4`, `p-8`, `gap-6`
- **Radius:** `rounded-xl` (12px) for Cards/Modals, `rounded-md` (6px) for Buttons/Inputs.
- **Shadow:** `shadow-sm` (subtle border shadow), `shadow-lg` (glassmorphism elevations), `shadow-2xl` (Modals).

## 4. Component Standards (shadcn/ui base)
- **Buttons:** Subtle hover state scaling (`scale: 0.98`), disabled opacity (0.5).
- **Cards:** Border-gradient or glassmorphism (backdrop-blur-md, bg-white/5).
- **Inputs:** Clean bottom borders or subtly rounded boxes with primary color focus rings.
- **Command Palette:** Centralized global search (Cmd+K).
- **Toast:** Bottom-right slide-in notifications.

## 5. Animation System (Framer Motion)
- **Page Transitions:** Fade in + Slide up (`opacity: [0, 1]`, `y: [10, 0]`, `duration: 0.3`).
- **Hover States:** Button scale down, Card slight lift (`y: -2`).
- **Loading:** Shimmer skeletons, elegant spinner.
- **Scroll Animations:** Fade-in text as it enters viewport (Landing page).

## 6. 3D & Visual Layer (Three.js/R3F)
*Use WebGL sparingly for performance.*
- **Aurora Hero:** A slow-moving, elegant GLSL Aurora shader behind the main landing page text.
- **Interactive Cursor:** A subtle particle system or glow that follows the cursor across dark backgrounds.
- **Mesh Gradients:** Smooth, animated gradient backgrounds for auth screens.
