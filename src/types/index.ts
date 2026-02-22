export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name?: string;
}

