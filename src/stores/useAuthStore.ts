import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr_nodal_1',
    name: 'Nodal Officer Ananya',
    email: 'ananya.officer@gov.in',
    role: 'nodal_officer',
    department: 'Ministry of Agriculture'
  }, // Pre-authenticated for simulation
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
