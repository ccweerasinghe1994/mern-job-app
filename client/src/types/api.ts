// API and HTTP-related types

import type {
  AuthResponse,
  IJob,
  IUser,
  JobsResponse,
  JobStatsResponse,
} from "./shared";

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",

  // User endpoints
  CURRENT_USER: "/users/current-user",
  UPDATE_USER: "/users/update-user",

  // Job endpoints
  JOBS: "/jobs",
  JOB_BY_ID: (id: string) => `/jobs/${id}`,
  JOB_STATS: "/jobs/stats",
} as const;

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// API Request types
export interface ApiRequest<T = unknown> {
  url: string;
  method: HttpMethod;
  data?: T;
  params?: Record<string, string | number>;
}

// Custom fetch response type
export interface CustomFetchResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

// Query parameters for jobs
export interface JobQueryParams {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

// React Query keys
export const QUERY_KEYS = {
  CURRENT_USER: ["currentUser"] as const,
  JOBS: ["jobs"] as const,
  JOB_STATS: ["jobStats"] as const,
  JOB_BY_ID: (id: string) => ["job", id] as const,
} as const;

// Mutation types for React Query
export interface CreateJobMutation {
  position: string;
  company: string;
  jobLocation: string;
  jobStatus?: string;
  jobType?: string;
}

export interface UpdateJobMutation extends Partial<CreateJobMutation> {
  id: string;
}

export interface UpdateUserMutation {
  name?: string;
  lastName?: string;
  email?: string;
  location?: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
}

// Form submission types
export interface FormSubmissionState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

// Upload types (if you have file uploads)
export interface FileUpload {
  file: File;
  progress: number;
  error?: string;
}

// WebSocket types (if you plan to add real-time features)
export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: Date;
}

// Axios interceptor types
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  baseURL?: string;
}

export interface ResponseInterceptor {
  onFulfilled?: (response: unknown) => unknown;
  onRejected?: (error: unknown) => unknown;
}

// API response wrappers
export type ApiPromise<T> = Promise<CustomFetchResponse<T>>;

// Specific API function return types
export type LoginApiResponse = ApiPromise<AuthResponse>;
export type RegisterApiResponse = ApiPromise<AuthResponse>;
export type JobsApiResponse = ApiPromise<JobsResponse>;
export type JobStatsApiResponse = ApiPromise<JobStatsResponse>;
export type CurrentUserApiResponse = ApiPromise<{ user: IUser }>;
export type CreateJobApiResponse = ApiPromise<{ job: IJob }>;
export type UpdateJobApiResponse = ApiPromise<{ job: IJob }>;
export type DeleteJobApiResponse = ApiPromise<{ message: string }>;
