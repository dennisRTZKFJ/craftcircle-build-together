
# CraftCircle Backend API

A complete, production-ready REST API for the CraftCircle DIY tutorial and community platform. Built with Node.js, Express.js, TypeScript, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd craftcircle-backend
   npm install
   ```

2. **Environment configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📋 Environment Configuration

Create a `.env` file with these essential settings:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/craftcircle

# Server
PORT=8080
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Email (for password reset, notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081
```

## 🏗️ Architecture Overview

### Folder Structure
```
src/
├── controllers/     # Business logic and request handling
├── models/          # MongoDB schemas and models
├── routes/          # API route definitions
├── services/        # External services (email, file storage)
├── middlewares/     # Authentication, validation, error handling
├── utils/           # Helper functions and utilities
├── config/          # Database and app configuration
└── types/           # TypeScript type definitions
```

### Key Design Principles

- **RESTful API** design with consistent endpoints
- **JWT-based authentication** with refresh token support
- **Role-based access control** (user, creator, partner, admin)
- **Input validation** and sanitization on all endpoints
- **Comprehensive error handling** with meaningful messages
- **Scalable database design** with proper indexing
- **Production-ready logging** and monitoring

## 🔐 Authentication & Authorization

### Authentication Flow

1. **User Registration/Login** → Receive JWT access token + refresh token
2. **API Requests** → Include `Authorization: Bearer <token>` header
3. **Token Refresh** → Use refresh token to get new access token
4. **Role Verification** → Endpoints check user roles automatically

### User Roles

- **user**: Basic access to tutorials, projects, community
- **creator**: Can upload tutorials, access creator analytics
- **partner**: Access to partner dashboard and business features
- **admin**: Full system access and moderation capabilities

### Protected Endpoints Example

```typescript
// Requires authentication
GET /api/users/me

// Requires creator or admin role
POST /api/tutorials

// Requires admin role only
GET /api/admin/users

// Resource ownership or admin
PUT /api/projects/:id
```

## 📚 API Endpoints

### Core Features

#### Authentication (`/api/auth`)
- `POST /register` - Create new user account
- `POST /login` - Authenticate user
- `POST /logout` - End user session
- `POST /refresh-token` - Refresh access token
- `POST /reset-password` - Request password reset
- `PUT /update-password` - Update password with reset token

#### Users (`/api/users`)
- `GET /me` - Get current user profile
- `PUT /me` - Update profile
- `GET /me/settings` - Get user preferences
- `PUT /me/settings` - Update preferences
- `POST /me/avatar` - Upload profile picture

#### Tutorials (`/api/tutorials`)
- `GET /` - List tutorials (with search, filters)
- `GET /featured` - Get featured tutorials
- `GET /trending` - Get trending tutorials
- `GET /:id` - Get tutorial details
- `POST /` - Create tutorial (creator/admin)
- `PUT /:id` - Update tutorial (owner/admin)
- `DELETE /:id` - Delete tutorial (owner/admin)
- `POST /:id/like` - Like/unlike tutorial
- `POST /:id/rate` - Rate tutorial (1-5 stars)

#### Projects (`/api/projects`)
- `GET /` - List user projects
- `GET /:id` - Get project details
- `POST /` - Create new project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `POST /:id/share` - Share project publicly

#### Community (`/api/community`)
- `GET /posts` - List forum posts
- `GET /posts/:id` - Get post details
- `POST /posts` - Create forum post
- `POST /posts/:id/comments` - Add comment
- `POST /posts/:id/like` - Like post

### Advanced Features

#### Analytics (`/api/analytics`)
- `GET /overview` - Dashboard overview stats
- `GET /tutorials` - Tutorial performance metrics
- `GET /revenue` - Earnings and revenue data
- `GET /audience` - Audience demographics

#### Challenges (`/api/challenges`)
- `GET /` - List active challenges
- `GET /:id` - Get challenge details
- `POST /:id/submit` - Submit challenge entry
- `GET /:id/submissions` - View submissions

#### Admin (`/api/admin`)
- `GET /users` - List all users
- `PUT /users/:id/status` - Activate/deactivate user
- `GET /tutorials/pending` - Pending tutorial reviews
- `PUT /tutorials/:id/approve` - Approve/reject tutorial

## 💾 Database Design

### User Model
```typescript
{
  name: string;
  email: string;
  password: string;        // Hashed with bcrypt
  role: 'user' | 'creator' | 'partner' | 'admin';
  avatar?: string;
  preferences: {
    emailNotifications: boolean;
    showProfile: boolean;
    // ... more settings
  };
  subscription?: {
    plan: 'free' | 'premium';
    status: 'active' | 'cancelled';
    // ... billing info
  };
  stats: {
    tutorialsCreated: number;
    projectsCompleted: number;
    totalViews: number;
  };
}
```

### Tutorial Model
```typescript
{
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author: ObjectId;        // Reference to User
  materials: [Material];   // Embedded documents
  tools: [Tool];          // Embedded documents
  steps: [Step];          // Embedded documents
  stats: {
    views: number;
    likes: number;
    averageRating: number;
  };
  status: 'draft' | 'published' | 'archived';
}
```

### Key Database Features

- **Optimized Indexes** for search and filtering
- **Reference vs Embedded** documents for optimal performance
- **Aggregation Pipelines** for complex analytics
- **Text Search** for tutorial and user discovery
- **Data Validation** at the database level

## 🔍 API Usage Examples

### User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Get Tutorials with Filters
```bash
curl "http://localhost:8080/api/tutorials?category=woodworking&difficulty=beginner&page=1&limit=10" \
  -H "Authorization: Bearer your-jwt-token"
```

### Create a Project
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{
    "title": "My First Bookshelf",
    "description": "Building a simple wooden bookshelf",
    "tutorial": "tutorial-object-id",
    "difficulty": "beginner"
  }'
```

## 🚀 Production Deployment

### Pre-Deployment Checklist

1. **Environment Variables:**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb://your-production-db
   JWT_SECRET=strong-production-secret
   EMAIL_HOST=your-smtp-server
   ```

2. **Security Configuration:**
   - Use HTTPS (SSL certificates)
   - Configure proper CORS origins
   - Set up rate limiting
   - Enable request logging
   - Configure MongoDB authentication

3. **Performance Optimization:**
   - Enable MongoDB indexes
   - Use MongoDB connection pooling
   - Set up caching (Redis recommended)
   - Configure file upload limits
   - Enable response compression

### Deployment Options

#### Option 1: Traditional VPS/Server
```bash
# Build the application
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start dist/server.js --name "craftcircle-api"
pm2 startup
pm2 save
```

#### Option 2: Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

#### Option 3: Cloud Platforms
- **Heroku**: Add `Procfile` with `web: node dist/server.js`
- **AWS/GCP/Azure**: Use their container services
- **Vercel/Netlify**: For serverless deployment (requires modifications)

### MongoDB Production Setup

1. **Atlas Cloud Database** (Recommended):
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/craftcircle
   ```

2. **Self-hosted MongoDB**:
   - Enable authentication
   - Configure replica sets for high availability
   - Set up regular backups
   - Monitor performance metrics

### Monitoring & Maintenance

1. **Application Monitoring:**
   - Set up error tracking (Sentry, Bugsnag)
   - Monitor API response times
   - Track database performance
   - Set up uptime monitoring

2. **Log Management:**
   ```bash
   # In production, consider using:
   # - Winston for advanced logging
   # - ELK stack for log analysis
   # - CloudWatch, DataDog, or similar services
   ```

3. **Regular Maintenance:**
   - Update dependencies monthly
   - Monitor database size and optimize queries
   - Review and rotate JWT secrets
   - Backup database regularly

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm test             # Run test suite
npm run lint         # Lint code
npm run seed         # Seed database with sample data
```

### Adding New Features

1. **Create Model** (if needed):
   ```typescript
   // src/models/NewFeature.ts
   import mongoose, { Schema } from 'mongoose';
   // ... define schema
   ```

2. **Add Routes**:
   ```typescript
   // src/routes/newFeature.ts
   import express from 'express';
   import { authenticateToken } from '@/middlewares/auth';
   // ... define routes
   ```

3. **Create Controller**:
   ```typescript
   // src/controllers/newFeatureController.ts
   import { Request, Response } from 'express';
   // ... implement business logic
   ```

4. **Register Routes** in `src/server.ts`:
   ```typescript
   import newFeatureRoutes from '@/routes/newFeature';
   app.use('/api/new-feature', newFeatureRoutes);
   ```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- user.test.ts
```

## 🤝 API Integration Guide

### Connecting Your Frontend

1. **Install HTTP client** (axios, fetch, etc.)
2. **Set base URL**: `http://localhost:8080/api`
3. **Handle authentication**:
   ```javascript
   // Store JWT token after login
   localStorage.setItem('token', response.data.token);
   
   // Include in API requests
   const token = localStorage.getItem('token');
   headers: { Authorization: `Bearer ${token}` }
   ```

4. **Handle token refresh**:
   ```javascript
   // When token expires, use refresh token
   if (response.status === 401) {
     await refreshToken();
     // Retry original request
   }
   ```

### Error Handling

All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": any,           // Present on success
  "error": string,       // Present on failure
  "pagination": {        // Present for paginated results
    "page": number,
    "limit": number,
    "total": number,
    "pages": number
  }
}
```

## 📞 Support & Contributing

### Getting Help

1. **Check this README** for common setup issues
2. **Review API documentation** for endpoint usage
3. **Check logs** for error details
4. **Test with curl/Postman** to isolate issues

### Common Issues

**Database Connection:**
```bash
# Check MongoDB is running
mongosh

# Verify connection string
echo $MONGODB_URI
```

**JWT Issues:**
```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Check token format
echo "Bearer your-token-here"
```

**Email Issues:**
```bash
# Test email configuration
npm run test-email
```

### Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Submit pull request with clear description

---

**Happy coding! 🚀**

This backend provides everything your CraftCircle frontend needs, both now and for future growth. It's production-ready, scalable, and follows industry best practices.
