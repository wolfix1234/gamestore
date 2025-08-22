export interface ServiceContent {
    id: number;
    title: string;
    content: string;
  }
  

export interface SkillsContent {
    id: number;
    title: string;
    content: string;
  }


export interface DatabaseOptions {
  uri: string;
  dbName: string;
}

// Auth Types
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
  role: 'user' | 'admin';
  lastLogin?: Date;
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
