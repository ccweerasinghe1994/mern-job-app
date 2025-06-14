// React and UI-specific types

import type { ReactNode } from "react";
import type { IUser } from "./shared";

// Component Props Types
export interface LayoutProps {
  children: ReactNode;
}

export interface FormRowProps {
  type?: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface NavLinkProps {
  text: string;
  path: string;
  icon: ReactNode;
}

export interface StatItemProps {
  title: string;
  count: number;
  color: string;
  bcg: string;
  icon: ReactNode;
}

// Theme Types
export interface ThemeContextType {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

// Form Types
export interface JobFormData {
  position: string;
  company: string;
  jobLocation: string;
  jobStatus: string;
  jobType: string;
}

export interface UserFormData {
  name: string;
  lastName: string;
  email: string;
  location: string;
}

// Dashboard Context Types
export interface DashboardContextType {
  user: IUser | null;
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: () => void;
}

// Page Component Props
export interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

// Loading and Error States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Pagination Props
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Search and Filter Types
export interface JobFilters {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: number;
}

// Chart Data Types (for recharts)
export interface ChartDataItem {
  date: string;
  count: number;
}

export interface StatsData {
  pending: number;
  interview: number;
  declined: number;
}
