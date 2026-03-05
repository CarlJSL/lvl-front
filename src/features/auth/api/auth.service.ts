import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../../../data/models';
import { mockUsers, delay } from './mockData';

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await delay(500);

    const existingUser = mockUsers.find((u) => u.email === credentials.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      email: credentials.email,
      username: credentials.username,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;

    return {
      user: newUser,
      token,
    };
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500);

    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    if (credentials.password.length < 1) {
      throw new Error('Credenciales incorrectas');
    }

    const token = `mock-token-${user.id}-${Date.now()}`;

    return {
      user,
      token,
    };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No autenticado');
    }

    const userId = token.split('-')[2];
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  },
};
