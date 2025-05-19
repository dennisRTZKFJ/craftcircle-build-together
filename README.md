
# CraftCircle - Frontend

A community platform for DIY enthusiasts to share projects, tutorials, and connect with each other.

## Tech Stack

- React with TypeScript
- React Router for navigation
- TanStack Query for data fetching and caching
- Tailwind CSS for styling
- Shadcn/UI for component library

## Backend Integration 

This React frontend is designed to connect with:
- **Spring Boot** REST API backend
- **MongoDB** database

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Configuration

The application uses environment variables for configuration:

```
REACT_APP_API_URL=https://api.craftcircle.com/v1  # Spring Boot API URL
```

## Authentication

The application is set up for JWT-based authentication with Spring Security:

- Login/Register forms ready for backend integration
- Token storage and refresh mechanisms in place
- Role-based access control (admin, creator, partner, diy)

## API Integration Points

All API service files are structured to make backend integration straightforward:

- Mock data is clearly marked with `// MOCK:` comments
- Placeholder API calls include `// 🔧 INTEGRATION:` comments showing Spring Boot endpoints
- Config toggle `useMockData` in `src/config/app.config.ts` to switch between mock and real data

## Folder Structure

```
src/
  ├── components/       # Reusable UI components
  ├── config/           # Application configuration
  ├── contexts/         # React contexts for global state
  ├── hooks/            # Custom React hooks
  ├── pages/            # Page components (routes)
  ├── services/         # API services and data fetching
  └── types/            # TypeScript type definitions
```

## MongoDB Integration

The frontend is prepared to handle MongoDB document structures:

- Field mapping from MongoDB `_id` to frontend `id` in place
- Support for MongoDB standard fields (`createdAt`, `updatedAt`)
- Flexible document structure handling
