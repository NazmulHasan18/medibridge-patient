# MediBridge

MediBridge is a modern healthcare platform designed to simplify doctor discovery and appointment booking for patients. The project combines a polished patient-facing experience with role-based dashboards for patients, doctors, and administrators.

## Why this project?

Healthcare access should be simple, fast, and trustworthy. MediBridge aims to make that possible by providing a digital experience where users can discover services, book appointments, and manage healthcare interactions in one place.

## Key Features

- Role-based access for patients, doctors, and admins
- Secure authentication and protected routes
- Appointment booking and management flow
- Doctor and service browsing experience
- Responsive, modern UI for desktop and mobile
- AI assistant support for appointment-related guidance
- Blog, testimonial, and healthcare content sections

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- NextAuth
- shadcn/ui-style component system

## Project Highlights

- Built as a full-stack healthcare application with a strong focus on user experience
- Designed with scalability and maintainability in mind
- Structured using a modular component-based architecture
- Includes dedicated dashboard flows for different user roles

## Project Structure

```bash
src/
├── app/           # App routes and layouts
├── components/    # Reusable UI and feature components
├── hooks/         # Custom hooks
├── apis/          # API integration layer
├── lib/           # Shared utilities and helpers
├── types/         # TypeScript interfaces and models
└── utils/         # Utility functions
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open http://localhost:3000 to view it in the browser.

### Build for production

```bash
npm run build
```

## Live Demo

- Frontend: https://medibridge-patient.vercel.app

## GitHub Repositories

- Client: https://github.com/NazmulHasan18/medibridge-patient
- Server/API: https://github.com/NazmulHasan18/medibridge-api

## Contact

For inquiries or collaboration opportunities, feel free to connect with me on GitHub.

```
🎨 MediBridge Design System Migration Prompt
Objective

I want you to redesign my entire project so that every page and component follows the same premium design language as my existing Navbar and Hero Section.

The Navbar and Hero are the design source of truth. Every other section should feel like it was designed by the same designer.

Do NOT redesign the Navbar or Hero unless necessary. Instead, redesign everything else to match them.

Brand Identity

MediBridge is a modern healthcare platform.

The UI should feel

trustworthy
premium
minimal
modern
calm
accessible
medical
clean
professional

Think of a combination of

Stripe
Vercel
Linear
Notion
Apple
Modern Healthcare SaaS

NOT corporate.

NOT old hospital websites.

Overall Design Language

Use the Navbar and Hero as the visual reference for

spacing
colors
typography
border radius
shadows
gradients
animations
interaction
cards
buttons

Everything should look consistent.

Color Palette

Continue using the existing blue healthcare theme.

Characteristics:

soft blue primary
white backgrounds
subtle gradients
very light borders
glass effects where appropriate
soft shadows
muted gray text
high contrast headings

Avoid

overly saturated colors
heavy gradients
dark heavy borders
Layout Rules

Use generous whitespace.

Every section should breathe.

Maintain consistent

container width
padding
spacing
vertical rhythm

Use

rounded cards
soft elevation
layered backgrounds
subtle separators
Typography

Maintain hierarchy similar to Hero.

Use

Large bold headings

Comfortable paragraph width

Readable body text

Consistent font sizes

Good line height

Strong visual hierarchy

Component Style

Every component should match the Hero style.

Examples

Cards

rounded-xl / rounded-2xl
soft border
subtle shadow
hover elevation
smooth transitions

Buttons

premium appearance
consistent height
subtle hover animation
slightly rounded

Inputs

clean
spacious
minimal
soft border
clear focus state

Badges

minimal
soft colors

Tables

modern
airy
card-like
not traditional HTML tables

Dialogs

rounded
blurred backdrop
premium spacing
Animations

Introduce tasteful micro-interactions.

Use Framer Motion where appropriate.

Examples

fade in
slide up
stagger animations
hover lift
image scale
button ripple/hover
floating elements
smooth page transitions

Animations should feel

subtle

professional

never distracting.

Respect reduced motion preferences.

Section Consistency

Redesign all homepage sections so they visually align with the Hero.

Examples

Services

Doctors

Testimonials

Blogs

Appointment

About

Contact

Why Choose Us

Every section should feel like it belongs in the same design system.

Dashboard

Apply the same design language to the dashboard.

Improve

cards
charts
tables
sidebar
forms
statistics
profile pages

Dashboard should feel like a premium SaaS product.

Visual Style

Introduce

soft gradients

glassmorphism (light usage)

floating cards

layered backgrounds

blur accents

gradient blobs

subtle background patterns

decorative medical illustrations where appropriate

without making the interface busy.

Icons

Use a single icon library consistently.

Icons should

match stroke width
have consistent sizing
align perfectly with text
Accessibility

Maintain

WCAG-compliant contrast
keyboard navigation
visible focus states
semantic HTML
responsive layouts
Responsive Design

The redesign must work perfectly on

Desktop

Laptop

Tablet

Mobile

Maintain spacing and hierarchy across breakpoints.

Technical Constraints

Keep the existing

Next.js structure
Tailwind CSS
shadcn/ui components
routing
business logic
API integrations
authentication
state management

Focus only on improving the presentation layer unless a structural change significantly improves UX.

Refactoring Rules

When updating components

reuse existing UI primitives
avoid duplicate code
create reusable components
maintain consistent naming
improve maintainability
keep TypeScript types intact
Design Goal

The final product should feel like a polished production-ready healthcare SaaS.

When a user moves from the Navbar to the Hero, then to Services, Doctors, Testimonials, Dashboard, and Forms, it should feel like everything was designed together as one cohesive design system.

Never introduce components that feel visually disconnected from the Navbar and Hero.

Working Style

Analyze the Navbar and Hero before making changes.

Extract their design language.

Then systematically update every page and component to match that design language.

Maintain visual consistency throughout the entire application.

Prioritize quality over speed.

Think like a senior product designer and frontend engineer, not just a code generator.
```
