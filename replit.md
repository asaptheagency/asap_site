# Overview

This is a modern digital agency website for ASAP Agency built with React, TypeScript, and Tailwind CSS. The application features a full-stack architecture with a React frontend and Express.js backend, including database integration for subscriber management, contact forms, and AI-powered review generation tools.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui components
- **Routing**: Wouter (lightweight React router)
- **State Management**: React hooks and React Query for server state
- **Animations**: Framer Motion for smooth transitions and effects
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with proper error handling
- **Session Management**: Express sessions with connect-pg-simple

## Database Layer
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle migrations and schema definitions
- **Connection**: Neon serverless client with WebSocket support

# Key Components

## Core Application Structure
- **Main App**: Single-page application with dynamic routing
- **Service Pages**: Lazy-loaded service-specific pages (Rise, SalesDrive, FollowUp, FrontDesk, etc.)
- **Review Generators**: Multiple AI-powered review generation tools with different complexity levels
- **Industry Pages**: Specialized landing pages for different business sectors

## UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Theme**: Consistent dark mode with custom color palette
- **Glassomorphic Design**: Card components with backdrop blur effects
- **Floating Elements**: Interactive background animations
- **Parallax Effects**: Smooth scrolling animations and depth effects
- **Custom Cursor**: Glow effects and interactive hover states

## Service Offerings
- **ASAP Connect**: Voice AI agents (Front Desk, Sales Drive, OutreachPro)
- **ASAP Chat**: Text-based AI assistants (Site Support, DM Dispatch, LeadLink)
- **R.I.S.E.**: Lead revival system for inactive sales engagements
- **Review Tools**: AI-powered review generation with multiple embedding options

# Data Flow

## Frontend Data Management
1. **React Query**: Handles server state caching and synchronization
2. **Context API**: Language preferences and global state
3. **Local Storage**: User preferences and rate limiting data
4. **URL Parameters**: Dynamic configuration for embedded tools

## Backend API Endpoints
- `/api/subscribers` - Newsletter subscription management
- `/api/contact` - Contact form submissions
- `/api/openai/generate-review` - AI review generation
- Static file serving for assets and images

## Database Schema
- **users**: User authentication and profiles
- **subscribers**: Newsletter subscriptions with preferences
- **contacts**: Contact form submissions and inquiries

# External Dependencies

## Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **AI Integration**: OpenAI API for review generation (GPT-4o model)
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Icons**: Lucide React icon library
- **Payments**: Stripe integration for premium services

## Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting
- **Drizzle Kit**: Database migrations and schema management

## Asset Management
- **Images**: WebP format optimization with fallback support
- **Fonts**: Google Fonts (Inter) with system font fallbacks
- **Build Assets**: Vite handles bundling and optimization

# Deployment Strategy

## Production Environment
- **Platform**: Replit with autoscale deployment target
- **Build Process**: Vite frontend build + esbuild backend compilation
- **Static Assets**: Served from dist/public directory
- **Environment Variables**: DATABASE_URL for Neon connection

## Alternative Deployment (Netlify)
- **Build Command**: Custom netlify-build.js preprocessing
- **Redirects**: SPA routing with catch-all redirects
- **Asset Optimization**: Image copying and path resolution
- **CDN**: Netlify's global CDN for static assets

## Database Deployment
- **Migrations**: Drizzle migrations for schema updates
- **Seeding**: Initial data population scripts
- **Connection Pooling**: Neon serverless handles scaling automatically

# Changelog
- June 25, 2025: Removed Sales Drive service completely (page, navigation, footer links, service card)
- June 14, 2025: Initial setup

# User Preferences

Preferred communication style: Simple, everyday language.