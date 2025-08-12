import api from './api';
import { LoginDto, RegisterDto, AuthResponse } from '../types';

export const authService = {
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  },

  async register(registerData: RegisterDto): Promise<AuthResponse> {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  },
};

