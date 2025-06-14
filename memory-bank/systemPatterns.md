# System Patterns - MERN Job Application

## Architecture Overview
The application follows a traditional three-tier architecture with clear separation between presentation, business logic, and data layers.

```
Frontend (React/TS) <-> Backend API (Express/TS) <-> Database (MongoDB)
```

## Backend Architecture Patterns

### 1. Model-View-Controller (MVC) Pattern
- **Models**: MongoDB schemas with Mongoose (`models/`)
- **Controllers**: Business logic handlers (`jobController/`)
- **Routes**: HTTP endpoint definitions (`routes/`)

### 2. Middleware Pattern
Layered middleware for cross-cutting concerns:
- Authentication middleware for protected routes
- Validation middleware for input sanitization
- Error handling middleware for consistent error responses

### 3. Repository Pattern (Implicit)
- Mongoose models act as repositories
- Centralized data access through model methods
- Abstraction layer over MongoDB operations

## Frontend Architecture Patterns

### 1. Component-Based Architecture
- Reusable UI components (`components/`)
- Page-level components (`pages/`)
- Shared component exports via index files

### 2. Context Pattern
- `DashBoardContext` for global state management
- Custom hooks for context consumption (`useDashboardContext`)
- Centralized state for user and application data

### 3. Route-Based Code Splitting
- React Router for navigation
- Layout components for shared UI structure
- Nested routing for dashboard sections

## Key Technical Decisions

### 1. TypeScript Throughout
- **Benefit**: Type safety, better developer experience
- **Implementation**: Shared types between frontend/backend
- **Location**: `types/types.ts` for common interfaces

### 2. JWT with HTTP-Only Cookies
- **Security**: Prevents XSS attacks on tokens
- **Implementation**: `cookieUtilities.ts` for cookie management
- **Pattern**: Stateless authentication with server validation

### 3. Mongoose ODM
- **Benefit**: Schema validation, type safety with TypeScript
- **Pattern**: Schema definitions with enum validation
- **Relationships**: User-Job relationships via ObjectId references

### 4. Express Async Errors
- **Pattern**: Automatic error catching for async route handlers
- **Benefit**: Eliminates try-catch boilerplate
- **Implementation**: Imported globally in `server.ts`

## Component Relationships

### Backend Flow
```
Request -> Route -> Middleware -> Controller -> Model -> Database
Response <- Route <- Middleware <- Controller <- Model <- Database
```

### Frontend Flow
```
User Action -> Component -> Context/Hook -> API Call -> Backend
UI Update <- Component <- Context/Hook <- Response <- Backend
```

## Critical Implementation Paths

### 1. Authentication Flow
1. User submits credentials
2. Server validates and creates JWT
3. Token stored in HTTP-only cookie
4. Subsequent requests include token automatically
5. Middleware validates token on protected routes

### 2. Job CRUD Operations
1. Frontend form submission
2. Client-side validation
3. API request with authentication
4. Server-side validation middleware
5. Controller business logic
6. Database operation via Mongoose
7. Response back to client

### 3. Error Handling Chain
1. Error occurs in controller/middleware
2. Express async errors catches it
3. Error handling middleware processes it
4. Formatted response sent to client
5. Frontend displays user-friendly message

## Security Patterns
- Input validation on both client and server
- Password hashing with bcryptjs
- MongoDB sanitization to prevent injection
- Rate limiting to prevent abuse
- Helmet for security headers
- CORS configuration for cross-origin requests
