// Define TypeScript interfaces for API responses and requests
export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse extends User {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface UpdateUserRequest {
  _id: string;
  name: string;
  email: string;
  password?: string;
}
