# Component Structure Documentation

## Overview
This document describes the organized component structure for the WebScale landing page project.

## Directory Structure

```
src/components/
├── landing/                    # Main landing page components
│   ├── AboutSection.jsx        # About WebScale section (vision, mission, values)
│   ├── CommunitySection.jsx    # Community section with experts and features
│   ├── TrainingSpeakersSection.jsx  # Training courses with speaker cards
│   ├── EventsSection.jsx       # Events and activities section
│   ├── SmartManagerSection.jsx # Smart Manager AI section
│   └── index.js                # Barrel export for clean imports
│
├── registration/               # Registration page specific components
│   ├── ApplicationForm.jsx     # Main application form
│   ├── ContactSection.jsx      # Contact information
│   ├── FAQSection.jsx          # Frequently asked questions
│   ├── FAQItem.jsx            # Individual FAQ item
│   ├── Hero.jsx               # Landing page hero section
│   ├── PricingSection.jsx     # Pricing information
│   ├── RegistrationForm.jsx   # Registration form component
│   ├── AsideInfo.jsx          # Sidebar information
│   ├── OptionPills.jsx        # Selection pills
│   └── SectionTitle.jsx       # Section title component
│
├── shared/                     # Shared components across pages
│   ├── Navbar.jsx             # Navigation bar
│   ├── Footer.jsx             # Footer component
│   └── AlgeriaWilayas.jsx     # Algeria provinces dropdown
│
├── sponsoring/                 # Event/sponsoring page components
│   ├── AboutEvent.jsx
│   ├── AboutWebscale.jsx      # Event-specific about section
│   ├── Agenda.jsx
│   ├── FeatureSection.jsx
│   ├── HeroSection.jsx
│   ├── ImportanceSection.jsx
│   ├── PartnersMarquee.jsx
│   ├── RegistrationTitle.jsx
│   ├── Sponsors.jsx
│   └── UnifiedRegistrationForm.jsx
│
├── investor/                   # Investor page components
│   └── InvestorHero.jsx
│
├── workshop/                   # Workshop page components
│   └── WorkshopRegistrationForm.jsx
│
└── ui/                        # Reusable UI components (shadcn-based)
    ├── button.jsx
    ├── card.jsx
    ├── checkbox.jsx
    ├── command.jsx
    ├── dialog.jsx
    ├── input.jsx
    ├── label.jsx
    ├── popover.jsx
    ├── radio-group.jsx
    ├── scroll-area.jsx
    ├── select.jsx
    └── textarea.jsx
```

## Component Organization Principles

### 1. **Landing Components** (`/landing`)
- Contains general platform information components
- Used on the main landing page (Registration page at `/` route)
- Reusable across multiple pages if needed
- Examples: AboutSection, OfferingsSection

### 2. **Registration Components** (`/registration`)
- Specific to the registration/landing page functionality
- Contains forms, hero sections, pricing, FAQs
- Focused on user onboarding and registration flow

### 3. **Shared Components** (`/shared`)
- Components used across multiple pages
- Navigation, Footer, and common utilities
- Should be page-agnostic

### 4. **Page-Specific Components** (`/sponsoring`, `/investor`, `/workshop`)
- Components tied to specific pages/routes
- Isolated to their respective use cases

### 5. **UI Components** (`/ui`)
- Reusable, atomic UI components
- Based on shadcn/ui library
- Used throughout the application

## Usage Examples

### Clean Imports
```jsx
// Good - Using barrel exports
import { AboutSection, CommunitySection, EventsSection, SmartManagerSection, TrainingSpeakersSection } from '@/components/landing';

// Good - Direct import
import AboutSection from '@/components/landing/AboutSection';

// Avoid - Cross-category imports
// Don't import landing components from registration folder
```

### Component Naming Conventions
- **Section components**: End with "Section" (e.g., AboutSection, HeroSection)
- **Feature components**: Descriptive names (e.g., ApplicationForm, Navbar)
- **UI components**: Simple, atomic names (e.g., Button, Input)

## Key Features

### Landing Page Components
Each offering now has its own dedicated section for better visual hierarchy and user experience:

1. **AboutSection**: Displays who WebScale is, with vision, mission, and values
   
2. **CommunitySection**: مجتمع واب سكايل
   - 4 expert cards with circular avatars (سليم بن اعراب, عبد الرحيم عبداللاوي, عبدالمالك شتى, نورالدين هواري)
   - Weekly consultation meetings
   - Community features grid
   - Amber/gold color scheme
   
3. **TrainingSpeakersSection**: دورات تدريبية
   - عبد الرحيم عبداللاوي - Marketing Day (Blue)
   - سليم بن اعراب - دورة جودة الادارة (Indigo)
   - راسلام - دورة الاتمتة بالذكاء الاصطناعي (Purple)
   - Individual speaker cards with circular avatars
   - Gradient headers and hover effects
   
4. **EventsSection**: احداث وفعاليات
   - 4 major event cards (CRM, AI agents, business trips, networking)
   - Location and timing information
   - Purple color scheme
   
5. **SmartManagerSection**: المسير الذكي
   - AI-powered management assistant
   - Features and use cases
   - "Coming Soon" banner
   - Green/emerald color scheme

### Benefits of This Structure
- ✅ Clear separation of concerns
- ✅ Easy to locate components
- ✅ Better code organization
- ✅ Scalable architecture
- ✅ Reusable components
- ✅ Clean imports with barrel exports

## Maintenance Notes

- Keep components in their appropriate directories
- Use barrel exports (index.js) for cleaner imports
- Avoid circular dependencies
- Follow the established naming conventions
- Keep page-specific components isolated

