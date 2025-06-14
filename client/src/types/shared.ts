// Shared types between frontend and backend
// Keep in sync with backend types

export const JOB_STATUS = {
  PENDING: "pending",
  INTERVIEW: "interview",
  DECLINED: "declined",
} as const;

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  INTERNSHIP: "internship",
} as const;

export const JOB_SORT_TYPE = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
} as const;

export const TUserRole = {
  ADMIN: "admin",
  USER: "user",
} as const;

// Type definitions from const objects
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortType = (typeof JOB_SORT_TYPE)[keyof typeof JOB_SORT_TYPE];
export type UserRole = (typeof TUserRole)[keyof typeof TUserRole];

// Base interfaces (without Mongoose-specific types)
export interface IJob {
  _id?: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  lastName?: string;
  location?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalJobs?: number;
  numOfPages?: number;
  currentPage?: number;
}

// Job-related types
export type JobsResponse = PaginatedResponse<IJob>;

export type JobStatsResponse = ApiResponse<{
  pending: number;
  interview: number;
  declined: number;
}>;

// Auth-related types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  lastName?: string;
  location?: string;
}

export interface AuthResponse extends ApiResponse {
  data?: {
    user: IUser;
  };
}
