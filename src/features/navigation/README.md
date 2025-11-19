# Navigation Feature

## Purpose
This feature handles all site navigation, menus, headers, and global navigation elements.

## Components

### SiteHeader
Main site header with logo, navigation links, and actions.

**Location:** `components/site-header.tsx`

**Usage:**
```tsx
import { SiteHeader } from '@/features/navigation';

<SiteHeader />
```

### Logo
Company logo component used in header and other navigation contexts.

**Location:** `components/logo.tsx`

### HamburgerMenu
Mobile navigation menu toggle and drawer.

**Location:** `components/hamburger-menu.tsx`

### StickyWhatsAppButton
Floating WhatsApp contact button that stays visible on scroll.

**Location:** `components/sticky-whatsapp-button-dark.tsx`

## Dependencies
- `@/shared/ui` - UI primitives
- `@/shared/effects` - Visual effects
- `next/link` - Next.js routing

## Key Patterns
- All navigation components use dark theme variants
- Responsive design with mobile-first approach
- Sticky positioning for persistent navigation elements