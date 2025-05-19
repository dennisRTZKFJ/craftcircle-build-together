
# CraftCircle Frontend

A modern frontend for the CraftCircle platform built with React, TypeScript, Tailwind CSS, and ShadCN UI.

## Project Structure

```
src/
  ├── components/       # UI components
  ├── config/           # App configuration
  ├── contexts/         # React context providers
  ├── hooks/            # Custom hooks
  ├── lib/              # Utility functions
  ├── pages/            # Application pages
  ├── services/         # API services
  └── types/            # TypeScript type definitions
```

## Backend Integration Guide

This frontend is designed to integrate with a Spring Boot backend using MongoDB. Here's how to connect it:

### API Integration

1. Set `useMockData: false` in `src/config/app.config.ts`
2. Update the API base URL to point to your Spring Boot backend:

```ts
api: {
  baseUrl: 'https://your-api-domain.com/api',
  // ...
}
```

### Expected Backend Endpoints

The frontend expects the following RESTful endpoints:

#### Authentication (Spring Security)

- `POST /auth/login` - Login with email/password, returns JWT token
- `POST /auth/register` - Register new user
- `POST /auth/reset-password` - Request password reset
- `POST /auth/refresh-token` - Refresh JWT token

#### Users

- `GET /users/me` - Get current user profile
- `GET /users/{id}` - Get user by ID
- `PATCH /users/{id}` - Update user profile

#### Tutorials

- `GET /tutorials` - List tutorials
- `GET /tutorials/{id}` - Get tutorial details
- `POST /tutorials` - Create new tutorial
- `PUT /tutorials/{id}` - Update tutorial
- `DELETE /tutorials/{id}` - Delete tutorial
- `GET /tutorials/{id}/comments` - Get tutorial comments

#### Projects

- `GET /projects` - List user projects
- `GET /projects/{id}` - Get project details
- `POST /projects` - Create new project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

#### Subscriptions

- `GET /subscriptions/current` - Get user's subscription
- `POST /subscriptions` - Subscribe to plan
- `DELETE /subscriptions/current` - Cancel subscription

See `src/config/app.config.ts` for the complete list of endpoints.

### MongoDB Document Structure

The frontend expects MongoDB documents with the following structure:

- Documents use `_id` as the primary key (automatically converted to `id` in frontend)
- Documents typically include `createdAt` and `updatedAt` timestamps
- See `src/types/mongodb.types.ts` for detailed document structures

### Security & Authentication

- The frontend uses JWT tokens for authentication
- Include token in Authorization header: `Authorization: Bearer <token>`
- Implement refresh token mechanism via `/auth/refresh-token` endpoint
- Use Spring Security for role-based access control

### Mocking vs Real Implementation

Currently, mock data is used for development. To switch to real implementation:

1. Set `useMockData: false` in `src/config/app.config.ts`
2. Ensure all endpoints are implemented in your Spring Boot backend
3. Update any environment variables or configuration as needed

### Environment Variables

Set these environment variables for production:

- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ENV`: Set to `production` for production mode

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
