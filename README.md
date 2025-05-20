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
VITE_API_URL=https://api.craftcircle.com/v1  # Spring Boot API URL
```

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  │   ├── ui/           # Shadcn UI components
  │   └── ...           # Feature-specific components
  ├── config/           # Application configuration
  ├── contexts/         # React contexts for global state
  ├── hooks/            # Custom React hooks
  ├── pages/            # Page components (routes)
  ├── services/         # API services and data fetching
  └── types/            # TypeScript type definitions
```

## Authentication

The application is set up for JWT-based authentication with Spring Security:

- Login/Register forms ready for backend integration
- Token storage and refresh mechanisms in place
- Role-based access control (admin, creator, partner, diy)

Example authentication flow:
```typescript
// When connecting to production backend:
// 1. User submits login form
// 2. Frontend sends credentials to Spring Boot API
// 3. Backend validates credentials and returns JWT token
// 4. Frontend stores token in localStorage and sets Authorization header
// 5. Protected routes check for valid token before rendering
```

## MongoDB Integration

The frontend is prepared to handle MongoDB document structures:

- Field mapping from MongoDB `_id` to frontend `id` in place
- Support for MongoDB standard fields (`createdAt`, `updatedAt`)
- Flexible document structure handling

Example MongoDB document transformation:
```typescript
// MongoDB document from API
const mongoDocument = {
  _id: "60d21b4667d0d8992e610c85",
  name: "Wooden Shelf",
  createdAt: "2023-01-15T08:30:00Z"
};

// Transformed for frontend use
const frontendObject = {
  id: "60d21b4667d0d8992e610c85",  // _id -> id
  name: "Wooden Shelf",
  createdAt: "2023-01-15T08:30:00Z"
};
```

## API Integration

All API service files are structured to make backend integration straightforward:

- Mock data is clearly marked with `// MOCK:` comments
- API calls include `// 🔧 INTEGRATION:` comments showing Spring Boot endpoints
- Config toggle `useMockData` in `src/config/app.config.ts` to switch between mock and real data

Example of switching to real API:
```typescript
// In app.config.ts
export const AppConfig = {
  // Set to false when connecting to a real backend API
  useMockData: false,
  
  // Other config...
};
```

## Production Deployment Checklist

Before deploying to production:

1. **API Configuration**:
   - Set `useMockData: false` in `app.config.ts`
   - Configure `baseUrl` to point to your production API
   - Set appropriate `timeout` values

2. **Environment Variables**:
   - Set `VITE_API_URL` to your production API URL
   - Remove any development-specific variables

3. **Authentication**:
   - Ensure JWT token handling matches your backend implementation
   - Test token refresh mechanisms
   - Validate role-based permissions

4. **Error Handling**:
   - Review error handling in API services
   - Implement proper logging for production
   - Add fallback UI for API failures

5. **Performance**:
   - Enable React production build (`npm run build`)
   - Optimize asset sizes
   - Implement caching strategies

6. **Testing**:
   - Run all unit and integration tests
   - Perform manual testing of critical paths
   - Validate form submissions and API integrations

## Feature Overview

### User Authentication
- Login/Register with email and password
- Social login support (GitHub, Google)
- Password reset flow
- JWT-based session management

### Project Management
- Create and track DIY projects
- Manage materials and steps
- Share projects with community

### Tutorials
- Browse community tutorials
- Create and publish tutorials
- Like, comment, and rate tutorials

### Community
- Forum discussions
- Weekly challenges
- Project showcases

### Creator Dashboard
- Analytics for tutorial creators
- Revenue tracking
- Audience insights

### Partner Dashboard
- Product showcase
- Order management
- Integration with e-commerce

## Backend API Requirements

The Spring Boot backend should implement the following endpoints:

- Authentication endpoints (`/auth/*`)
- User management (`/users/*`)
- Project CRUD operations (`/projects/*`)
- Tutorial management (`/tutorials/*`)
- Community features (`/community/*`)
- Analytics (`/analytics/*`)
- Partner dashboard (`/partners/*`)
- Subscription management (`/subscriptions/*`)

See `src/config/app.config.ts` for the complete list of required endpoints.

## Common Gotchas

- **MongoDB ID Conversion**: The frontend expects `id` fields, but MongoDB provides `_id`. The API client handles this conversion automatically.
- **JWT Token Expiry**: Implement proper token refresh to avoid session timeouts.
- **Authorization Headers**: Ensure API requests include the proper Authorization headers.
- **CORS Configuration**: Configure your Spring Boot API to allow requests from the frontend domain.
