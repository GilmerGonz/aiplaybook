---
name: Aura Digital Editorial
colors:
  surface: '#0f131f'
  surface-dim: '#0f131f'
  surface-bright: '#353946'
  surface-container-lowest: '#0a0e1a'
  surface-container-low: '#171b28'
  surface-container: '#1b1f2c'
  surface-container-high: '#262a37'
  surface-container-highest: '#313442'
  on-surface: '#dfe2f3'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dfe2f3'
  inverse-on-surface: '#2c303d'
  outline: '#859398'
  outline-variant: '#3c494e'
  surface-tint: '#3cd7ff'
  primary: '#a8e8ff'
  on-primary: '#003642'
  primary-container: '#00d4ff'
  on-primary-container: '#00586b'
  inverse-primary: '#00677e'
  secondary: '#bdc7de'
  on-secondary: '#273143'
  secondary-container: '#3f495d'
  on-secondary-container: '#aeb8d0'
  tertiary: '#dedfdf'
  on-tertiary: '#2f3131'
  tertiary-container: '#c2c3c3'
  on-tertiary-container: '#4f5051'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b4ebff'
  primary-fixed-dim: '#3cd7ff'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#d9e3fb'
  secondary-fixed-dim: '#bdc7de'
  on-secondary-fixed: '#121c2d'
  on-secondary-fixed-variant: '#3d475a'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#0f131f'
  on-background: '#dfe2f3'
  surface-variant: '#313442'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 3px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  section-padding: 120px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for a premium digital editorial experience, specifically tailored for high-end ebook showcases. It leans into **Minimalism** with a heavy emphasis on structural integrity and negative space. The goal is to evoke a sense of intellectual authority and technological precision.

The visual language is characterized by "Digital Brutalism Lite"—stripping away unnecessary ornamentation like gradients and heavy shadows in favor of raw typography and thin, precise lines. The emotional response should be one of clarity, sophistication, and focus, allowing the content of the ebook to take center stage without visual distraction.

## Colors

The palette is anchored in a deep midnight foundation to provide a cinematic, high-contrast environment. 

- **Primary (#00D4FF):** Used sparingly as a high-energy accent for interactive states, key call-to-actions, and structural highlights.
- **Surface (#0A0E1A):** The singular background color to ensure a seamless, immersive experience.
- **Text Primary (#FFFFFF):** High-contrast white for maximum legibility in headlines and body copy.
- **Text Secondary (#8892A8):** A muted gray-blue for metadata, labels, and auxiliary information to establish visual hierarchy.
- **Dividers:** Use 1px solid lines in either the primary accent color (for emphasis) or a 20% opacity white (for subtle containment).

## Typography

This design system utilizes **Inter** exclusively to maintain a utilitarian, Swiss-inspired aesthetic. The hierarchy is driven by extreme scale contrasts—pairing massive display headlines with hyper-organized, widely-spaced labels.

- **Headlines:** Should use tight letter-spacing and substantial font weights to feel impactful.
- **Labels:** Small caps or all-caps with 3px letter-spacing are mandatory for secondary navigation and category tags.
- **Editorial Spacing:** Maintain generous paragraph spacing (minimum 24px) to ensure the reading experience mirrors a physical premium book.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, transitioning to a fluid system on mobile devices.

- **Grid:** A 12-column grid with a 1280px max-width. Elements should be strictly aligned to these columns to reinforce the structured, editorial feel.
- **Whitespace:** Use "negative space as a feature." Section transitions should have a minimum of 120px vertical padding.
- **Dividers:** Use 1px horizontal and vertical rules to separate grid sections rather than background color shifts. This mimics the layout of a technical manual or a high-end broadsheet.

## Elevation & Depth

This design system rejects traditional depth markers like heavy shadows or blurs.

- **Flat Architecture:** Depth is communicated through **Tonal Layers** and **Low-contrast Outlines**.
- **The 1px Rule:** Instead of shadows, use 1px solid borders (#8892A8 at 30% opacity) to define cards and containers.
- **Subtle Elevation:** In rare cases where a hover state requires depth, use a minimal, sharp shadow: `0px 4px 0px 0px rgba(0, 212, 255, 0.2)`.

## Shapes

The shape language is sharp and precise. A maximum border-radius of 4px is allowed for interactive elements to prevent the UI from feeling overly aggressive, but 0px is preferred for larger structural containers and images.

- **Buttons:** 4px radius for a "soft-sharp" tech feel.
- **Input Fields:** 0px (Sharp) to maintain the grid-based editorial look.
- **Images/Cards:** 0px (Sharp).

## Components

### Buttons
- **Primary:** Solid Cyan (#00D4FF) background with Black (#0A0E1A) text. On hover, transition to White (#FFFFFF) text over 0.3s.
- **Secondary:** 1px Cyan border, transparent background. Hover fills the background with Cyan.

### Cards
- Background: Transparent or slightly lighter than the base (#141925).
- Border: 1px solid #8892A8 (muted).
- Hover: Border color transitions to #00D4FF.

### Lists
- Use thin 1px horizontal dividers between items.
- Bullet points should be replaced with small 4px cyan squares or simple SVG checkmarks.

### Input Fields
- Underline style only: A 1px bottom border in #8892A8. On focus, the border becomes #00D4FF.

### Icons
- Use thin-stroke (1.5px) SVG icons. Avoid filled icons unless it is a primary action state.

### Animations
- **Entrance:** All sections must use a 0.8s fade-in with a 20px upward slide on scroll.
- **Transitions:** Use `cubic-bezier(0.16, 1, 0.3, 1)` for all hover transitions to ensure a snappy, premium feel.