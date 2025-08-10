Whenever you want to ask a question, always call the MCP interactive_feedback.
Whenever you’re about to complete a user request, call the MCP interactive_feedback instead of simply ending the process. Keep calling MCP until the user’s feedback is empty, then end the request.

# AI Coding Agent Instructions for CLEO

## Project Overview

CLEO is a streetwear & rock-themed e-commerce site built with Next.js 15, featuring dynamic animations, custom cursor effects, and a dark aesthetic. The brand identity blends urban streetwear with rock rebellion culture.

## Architecture & Stack

### Core Technologies

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** with strict typing patterns
- **Tailwind CSS v4** with custom dark theme
- **Framer Motion** (`motion` package) for complex animations
- **Radix UI** components with shadcn/ui architecture
- **PNPM** for package management

### Key Directories

```
app/                    # Next.js App Router pages
├── products/[segment]/ # Dynamic product/category routes
components/
├── ui/                 # shadcn/ui base components
├── magicui/           # Custom enhanced UI components
data/                  # Static JSON data store
lib/                   # Utility functions and API layers
```

## Design System & Visual Identity

### Brand Aesthetic

- **Dark theme mandatory**: All components use `dark:` classes
- **Rock/streetwear theme**: Guitar pick shapes, fret lines, music notes
- **Color palette**: Dark grays (`dark-100` to `dark-900`), white accents, red/purple gradients
- **Typography**: Bold contrast - thin/light vs black weights

### Animation Patterns

1. **Scroll-based reveals**: Use `useScroll` + `useTransform` from motion
2. **Glitch effects**: Text with colored shadows (red/cyan) and transforms
3. **Guitar-themed backgrounds**: Horizontal "fret lines" with decreasing opacity
4. **Custom cursors**: Mix-blend-mode difference effect
5. **Floating elements**: Music notes, geometric shapes with staggered delays

### Component Conventions

- Prefix streetwear/rock components with theme descriptors
- Use `clipPath: "polygon(50% 0%, 0% 40%, 50% 100%, 100% 40%)"` for guitar pick shapes
- Background overlays: `bg-linear-to-br from-purple-900/20 via-black to-red-900/20`
- Corner accents: Border lines in corners with `opacity-50`

## Data & State Management

### Product Architecture

- **Static data**: `/data/products.json` contains all products and categories
- **API layer**: `/lib/products-api.ts` simulates async calls with delays
- **Types**: Consistent `Product` and `Category` interfaces across files

### Dynamic Routing

- `/products/[segment]` handles both individual products AND categories
- `generateStaticParams()` creates routes for all products and categories
- Client/server split: Server components fetch data, client components handle interactions

## Development Workflows

### Component Creation

1. **Base components**: Extend shadcn/ui components in `/components/ui/`
2. **Feature components**: Create in `/components/` with descriptive names
3. **Animation components**: Always include motion imports and scroll-based triggers
4. **Responsive patterns**: Mobile-first with `md:` and `lg:` breakpoints

### Styling Patterns

- **Backgrounds**: Layer multiple elements with decreasing opacity
- **Responsiveness**: `text-base md:text-lg lg:text-xl` scaling
- **Interactions**: `group-hover:` effects with transitions
- **Gradients**: Use custom CSS variables from globals.css

### Animation Guidelines

- Use `useScroll({ target: ref })` for scroll-triggered animations
- Stagger animations with `animationDelay` styles
- Implement glitch effects with multiple positioned spans
- Add `perspective: "1000px"` for 3D transforms

## Key Integration Points

### Custom Cursor System

- Global cursor replacement with mix-blend-mode
- Click animations via class toggling
- Implemented in layout.tsx for site-wide effect

### Navigation & Routing

- Smooth scroll behaviors between sections
- Dynamic product pages with SSG
- Category filtering and product carousels

### Performance Considerations

- Image optimization with Next.js Image component
- Staggered loading animations
- Touch-friendly mobile carousels with snap scrolling

## Critical Files to Understand

- `/app/globals.css` - Custom animations, dark theme variables
- `/components/reveal-products.tsx` - Complex animation patterns
- `/lib/products-api.ts` - Data fetching patterns
- `/app/products/[segment]/page.tsx` - Dynamic routing implementation

When creating new components, follow the established patterns of layered backgrounds, scroll-triggered animations, and rock/streetwear visual elements. Always test animations on both desktop and mobile viewports.
