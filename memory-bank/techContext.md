# Tech Context - MERN Job Application

## Technology Stack

### Backend Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building RESTful APIs
- **TypeScript**: Type-safe JavaScript with compile-time checking
- **MongoDB**: NoSQL document database for flexible data storage
- **Mongoose**: ODM for MongoDB with schema validation

### Frontend Technologies
- **React 19.1.0**: Modern UI library with hooks and concurrent features
- **TypeScript**: Type safety for frontend development
- **Vite**: Fast build tool and development server
- **React Router Dom 7.6.1**: Client-side routing
- **Styled Components**: CSS-in-JS styling solution

### Key Dependencies

#### Backend Dependencies
```json
{
  "express": "^4.21.2",
  "mongoose": "^8.15.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cookie-parser": "^1.4.7",
  "express-validator": "^7.2.1",
  "express-async-errors": "^3.1.1",
  "helmet": "^8.1.0",
  "express-rate-limit": "^7.5.0",
  "morgan": "^1.10.0"
}
```

### Frontend Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.1",
  "@tanstack/react-query": "^5.79.0",
  "axios": "^1.9.0",
  "styled-components": "^6.1.18",
  "react-toastify": "^11.0.5",
  "dayjs": "^1.11.13",
  "recharts": "^2.15.3"
}
```

## Development Setup

### Build System
- **Backend**: TypeScript compilation with `tsc`
- **Frontend**: Vite for bundling and development server
- **Concurrent Development**: `concurrently` for running multiple processes

### Scripts Configuration
```json
{
  "build": "tsc",
  "start": "nodemon dist/server.js",
  "client": "cd client && pnpm run dev",
  "dev": "concurrently --kill-others-on-fail \"pnpm run dev:watch\" \"pnpm run start\" \"pnpm run client\"",
  "dev:watch": "tsc -w"
}
```

### Package Management
- **PNPM**: Fast, disk space efficient package manager
- **Workspace Structure**: Separate package.json for client and server
- **Type Definitions**: Comprehensive TypeScript types for all major dependencies

### TypeScript Configuration Enhancement ✨
- **Path Aliases**: Configured @ imports for cleaner code organization
- **Strict Settings**: erasableSyntaxOnly and verbatimModuleSyntax enabled
- **Types Organization**: 4-file structure for comprehensive type coverage

### Frontend Types System 🎯
```
client/src/types/
├── index.ts          # Main export - import all types here
├── shared.ts         # Business logic types synced with backend
├── components.ts     # React component and UI-specific types
├── api.ts           # API, HTTP, and data fetching types
└── README.md        # Documentation and usage examples
```

### Path Aliases Configuration
```typescript
// vite.config.ts
resolve: {
  alias: {
    "@": resolve(__dirname, "./src"),
    "@/types": resolve(__dirname, "./src/types"),
    "@/components": resolve(__dirname, "./src/components"),
    // ... more aliases
  }
}

// tsconfig.app.json
"paths": {
  "@/*": ["./src/*"],
  "@/types": ["./src/types"],
  "@/components/*": ["./src/components/*"],
  // ... more paths
}
```

## Technical Constraints

### Environment Requirements
- Node.js version compatible with ES modules
- MongoDB database (local or cloud)
- Modern browser with ES6+ support

### Development Environment
- **OS**: Cross-platform (Windows, macOS, Linux)
- **Editor**: VS Code recommended with TypeScript extensions
- **Node Version**: Latest LTS recommended
- **Package Manager**: PNPM preferred

### Production Considerations
- **Deployment**: Express server can be deployed to various platforms
- **Database**: MongoDB Atlas for cloud deployment
- **Build Output**: TypeScript compiled to JavaScript for production
- **Static Assets**: Frontend built and served by Express in production

## Tool Usage Patterns

### TypeScript Configuration
- **Backend**: ES modules with Node.js target
- **Frontend**: Modern ES target with React JSX
- **Shared Types**: Common type definitions in `types/types.ts`

### Development Workflow
1. **File Changes**: TypeScript watch mode rebuilds automatically
2. **Server Restart**: Nodemon detects changes and restarts
3. **Client Updates**: Vite hot module replacement for instant updates
4. **Type Checking**: Real-time TypeScript validation
5. **Clean Imports**: Path aliases provide professional import structure

### Code Quality Tools
- **ESLint**: JavaScript/TypeScript linting for frontend
- **TypeScript**: Compile-time type checking with strict configuration
- **Path Aliases**: @ imports for cleaner, more maintainable code
- **Types Documentation**: Comprehensive README for type usage patterns

### Types System Best Practices ✨
```typescript
// ✅ Clean imports using path aliases
import type { IJob, JobStatus, API_ENDPOINTS } from '@/types';

// ✅ Type-safe constants with const assertions
export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
} as const;

// ✅ Type-only imports for React types
import type { ReactNode } from 'react';
```

### Enhanced Environment Configuration 🔧
- **vite-env.d.ts**: Enhanced with comprehensive module declarations
- **Environment Variables**: Properly typed with ImportMetaEnv interface
- **Asset Declarations**: Support for images, CSS modules, SVGs
- **TypeScript Strict Mode**: erasableSyntaxOnly and verbatimModuleSyntax enabled

### Security Tools
- **Helmet**: HTTP security headers
- **Express Rate Limit**: API rate limiting
- **Express Mongo Sanitize**: NoSQL injection prevention
- **BCrypt**: Password hashing
- **JWT**: Secure authentication tokens

## API Design Patterns
- **RESTful Routes**: Standard HTTP methods and status codes
- **Middleware Chain**: Modular request processing
- **Error Handling**: Centralized error processing
- **Validation**: Input validation with express-validator
- **Authentication**: JWT-based stateless authentication

## State Management
- **Frontend**: React Context for global state
- **Backend**: Stateless design with database persistence
- **Caching**: React Query for server state caching
- **Local Storage**: Theme preferences and client-side settings
