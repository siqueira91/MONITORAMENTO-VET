# Veterinary Animal Monitoring Platform

## Overview

This is a professional veterinary animal health monitoring platform built as a full-stack web application. The system allows veterinary professionals to track and monitor vital health metrics for animals under their care, including temperature, heart rate, and activity levels. The application provides real-time health status alerts based on species-specific normal ranges and enables CRUD operations for animal records through an intuitive dashboard interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing

**UI Component Strategy:**
- Shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design philosophy: Professional dashboard aesthetic optimized for data-intensive medical/veterinary workflows
- Responsive layout using Tailwind's grid system with mobile-first breakpoints

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form state and input validation
- No global client state management - server state is the source of truth

**Key Design Patterns:**
- Composition pattern using Radix UI primitives wrapped in custom components
- Form validation using Zod schemas shared between client and server
- Optimistic UI updates with automatic cache invalidation
- Species-specific health status calculation with color-coded badges (normal/warning/critical)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- ESM module system for modern JavaScript features
- Custom middleware for request logging and JSON parsing

**Data Layer:**
- Currently using in-memory storage (MemStorage class) as a temporary solution
- Schema defined using Drizzle ORM with PostgreSQL dialect
- Ready for migration to PostgreSQL via Neon Database (@neondatabase/serverless)

**API Design:**
- RESTful API endpoints following resource-based conventions
- CRUD operations: GET /api/animals, GET /api/animals/:id, POST /api/animals, PUT /api/animals/:id, DELETE /api/animals/:id
- Zod schema validation on all incoming requests with detailed error messages
- Consistent JSON response format with proper HTTP status codes

**Validation Strategy:**
- Shared Zod schemas between client and server (located in /shared/schema.ts)
- Species-specific validation rules (e.g., temperature 30-45°C, heart rate 20-300 bpm)
- Automatic TypeScript type generation from Drizzle schemas

### Data Model

**Animal Entity:**
```typescript
{
  id: string (UUID, auto-generated)
  nome: string (required)
  especie: string (required - Cão, Gato, Cavalo, Vaca, etc.)
  idade: number (required, >= 0)
  temperatura: number (required, 30-45°C range)
  frequenciaCardiaca: number (required, 20-300 bpm range)
  atividade: string (required - Ativo, Moderado, Repouso, Sedentário)
}
```

**Health Status Logic:**
- Species-specific normal ranges defined in HealthStatusBadge component
- Three-tier status system: normal (green), warning (yellow), critical (red)
- Real-time status calculation based on temperature and heart rate deviations from species norms

### External Dependencies

**Database:**
- Drizzle ORM v0.39.1 for type-safe database queries and migrations
- Configured for PostgreSQL via Neon Database serverless driver
- Migration system using drizzle-kit with schema in /shared/schema.ts
- Connection configured via DATABASE_URL environment variable

**UI Component Libraries:**
- Radix UI primitives (v1.x) for accessible, unstyled components
- Tailwind CSS v3 with custom theme configuration
- Lucide React for icons
- date-fns for date manipulation

**Development Tools:**
- TypeScript for type safety across the entire stack
- ESBuild for production server bundling
- TSX for development server with hot reload
- Replit-specific plugins for development environment integration

**Session & Storage:**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used in current implementation)

**Form & Validation:**
- React Hook Form for form state management
- @hookform/resolvers for Zod integration
- zod-validation-error for human-readable validation messages

**Notes:**
- The application is currently using in-memory storage but has a complete PostgreSQL schema ready for production deployment
- All validation rules are centralized in shared Zod schemas to maintain consistency
- The design system prioritizes clarity and efficiency for medical professionals with clear visual hierarchy and color-coded health alerts