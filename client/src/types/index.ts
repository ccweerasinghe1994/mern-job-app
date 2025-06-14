// Main types export file
// Re-export all types from different modules for easy importing

// Shared types (business logic)
export * from "./shared";

// Component and UI types
export * from "./components";

// API and HTTP types
export * from "./api";

// Type utilities and helpers
export type Nullable<T> = T | null;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Common utility types
export type ID = string;
export type Timestamp = string;
export type Email = string;

// Event handler types
export type ChangeHandler = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type ClickHandler = (
  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
) => void;

// Common status types
export type LoadingStatus = "idle" | "loading" | "success" | "error";
export type RequestStatus = "pending" | "fulfilled" | "rejected";
