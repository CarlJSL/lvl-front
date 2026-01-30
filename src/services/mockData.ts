import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'miguel@lvlconsulting.com',
    username: 'miguel',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'admin@lvlconsulting.com',
    username: 'admin',
    createdAt: '2024-01-10T10:00:00Z',
  },
];

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
