
# CraftCircle Tutorial Backend

A robust Express.js backend API with MongoDB for managing DIY tutorials, built specifically for the CraftCircle platform.

## Features

- **Tutorial Management**: Full CRUD operations for tutorials
- **MongoDB Integration**: Robust data modeling with Mongoose
- **TypeScript**: Full type safety throughout the application
- **Validation**: Request validation with express-validator
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Helmet, CORS, and rate limiting
- **Logging**: Structured logging system
- **Performance**: Compression and optimized database queries

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and other settings

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Tutorials

- **GET** `/api/tutorials` - Get all tutorials (paginated)
- **GET** `/api/tutorials/featured` - Get featured tutorials
- **GET** `/api/tutorials/trending` - Get trending tutorials
- **GET** `/api/tutorials/:id` - Get single tutorial by ID
- **POST** `/api/tutorials` - Create new tutorial
- **PUT** `/api/tutorials/:id` - Update existing tutorial
- **DELETE** `/api/tutorials/:id` - Delete tutorial

### Health Check

- **GET** `/health` - Server health status

## Data Models

### Tutorial Model

```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  content: {
    category: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    duration: number,
    availability: 'free' | 'premium',
    price?: string,
    tools: string[],
    recommendations?: string,
    estimatedCostLow?: string,
    estimatedCostHigh?: string,
    videoDescription?: string,
    sections: Array<{
      id: number,
      title: string,
      content: string,
      imageUrl?: string
    }>
  },
  materials: Array<{
    name: string,
    quantity: number,
    unit: string,
    cost?: number,
    where_to_buy?: string,
    amazon_link?: string
  }>,
  status: 'draft' | 'published' | 'archived',
  views: number,
  likes: number,
  comments: number,
  revenue?: string,
  image?: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Environment Variables

See `.env.example` for all available environment variables:

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode
- `FRONTEND_URL` - Frontend URL for CORS
- `RATE_LIMIT_*` - Rate limiting configuration

## Development

### Project Structure

```
backend/
├── src/
│   ├── config/         # Database and app configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── server.ts       # Main server file
├── dist/               # Compiled JavaScript (generated)
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

### Adding New Features

1. Define types in `src/types/`
2. Create/update models in `src/models/`
3. Add controllers in `src/controllers/`
4. Define routes in `src/routes/`
5. Update validation middleware as needed

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include input validation
4. Write descriptive commit messages
5. Update documentation as needed
