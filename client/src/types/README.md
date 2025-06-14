# Types Setup Guide

This document explains the types organization and best practices for the frontend TypeScript project.

## 📁 Types Folder Structure

```
src/types/
├── index.ts          # Main export file - import all types from here
├── shared.ts         # Business logic types shared with backend
├── components.ts     # React component and UI-specific types
├── api.ts           # API, HTTP, and data fetching types
└── README.md        # This documentation file
```

## 📦 Usage Examples

### Basic Import Pattern
```typescript
// ✅ Good - Import from main types index
import type { IJob, JobStatus, ApiResponse } from '@/types';

// ❌ Avoid - Direct imports from specific files
import type { IJob } from '@/types/shared';
```

### Component Typing
```typescript
import type { FormRowProps, LoadingState } from '@/types';

const FormRow: React.FC<FormRowProps> = ({ name, type = 'text', ...props }) => {
  // Component implementation
};
```

### API/Data Fetching
```typescript
import type { JobsResponse, ApiError } from '@/types';

const fetchJobs = async (): Promise<JobsResponse> => {
  try {
    const response = await customFetch.get('/jobs');
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
```

### React Query Usage
```typescript
import { useQuery } from '@tanstack/react-query';
import type { JobsResponse, QUERY_KEYS } from '@/types';

const useJobs = () => {
  return useQuery({
    queryKey: QUERY_KEYS.JOBS,
    queryFn: (): Promise<JobsResponse> => fetchJobs(),
  });
};
```

## 🎯 Type Organization Guidelines

### 1. Shared Types (`shared.ts`)
- Business domain types (Job, User, etc.)
- Enums and constants
- API response interfaces
- Types that match backend models

### 2. Component Types (`components.ts`)
- React component props interfaces
- UI state types
- Form data types
- Event handler types

### 3. API Types (`api.ts`)
- HTTP request/response types
- API endpoint constants
- React Query keys
- Error handling types

### 4. Index File (`index.ts`)
- Re-exports all types
- Utility types
- Common type aliases

## 🛠️ Best Practices

### Type Naming Conventions
- **Interfaces**: PascalCase with descriptive names (`UserFormData`, `ApiResponse`)
- **Types**: PascalCase (`JobStatus`, `LoadingState`)
- **Enums**: PascalCase for enum, SCREAMING_SNAKE_CASE for values
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`, `QUERY_KEYS`)

### Import/Export Patterns
```typescript
// ✅ Use type-only imports with verbatimModuleSyntax
import type { ReactNode } from 'react';
import type { IUser } from './shared';

// ✅ Use const assertions for immutable objects
export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
} as const;

// ✅ Derive types from const objects
export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];
```

### Generic Types
```typescript
// ✅ Use descriptive generic constraints
interface ApiResponse<TData = unknown> {
  success: boolean;
  data?: TData;
  message?: string;
}

// ✅ Use utility types for variations
type CreateJobRequest = Omit<IJob, '_id' | 'createdAt' | 'updatedAt'>;
type UpdateJobRequest = Partial<CreateJobRequest> & { id: string };
```

## 🔧 TypeScript Configuration Notes

This project uses strict TypeScript settings:
- `erasableSyntaxOnly: true` - Use const assertions instead of enums
- `verbatimModuleSyntax: true` - Explicit type-only imports required
- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - No unused variables allowed

## 🚀 Adding New Types

1. **Determine the category**: Does it belong to shared, components, or api?
2. **Add to appropriate file**: Keep types organized by domain
3. **Export from index.ts**: Make it available via main export
4. **Update this README**: Document new patterns or conventions

## 🔄 Syncing with Backend

The `shared.ts` file should stay in sync with backend types:
- Copy relevant interfaces from backend `types/types.ts`
- Remove Mongoose-specific types (Document, ObjectId)
- Convert to frontend-appropriate types (string IDs, etc.)
- Use const assertions instead of enums for strict TS config

## 📚 Related Files

- `vite-env.d.ts` - Vite environment and module declarations
- `tsconfig.app.json` - TypeScript compiler configuration
- Backend `types/types.ts` - Source of truth for shared business types
