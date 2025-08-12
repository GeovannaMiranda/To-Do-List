export interface User {
  id: number;
  username: string;
  createdAt: string;
}

export interface TodoTask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  category: string;
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
}

export interface RegisterDto {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

