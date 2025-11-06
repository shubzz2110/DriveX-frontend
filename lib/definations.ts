export interface RegisterUserApiModel {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  date_joined: Date;
  storage_used: number; // in bytes
  storage_assigned: number; // in bytes
}

export interface FileItem {
  id: number;
  file?: string | null;            // File URL from Django (optional for folders)
  file_name: string;               // Actual file or folder name
  file_extension?: string | null;  // e.g. 'csv', 'pdf', 'jpg' (null for folders)
  file_size?: number | null;       // File size in bytes
  is_folder: boolean;              // True if folder, false if file
  parent?: number | null;          // Parent folder ID (null = root)
  uploaded_by: number;             // User ID who uploaded it
  created_at: string;              // ISO timestamp
  updated_at: string;              // ISO timestamp

  // Optional frontend helpers (not from API)
  full_path?: string;              // e.g. "/reports/2025/summary.csv"
  children?: FileItem[];           // Nested files/folders (if you build a tree)
}