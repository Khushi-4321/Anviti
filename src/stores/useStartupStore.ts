import { create } from 'zustand';
import { Startup } from '../types';
import startupsData from '../data/seed/startups.json';

interface StartupState {
  startups: Startup[];
  addStartup: (startup: Startup) => void;
}

export const useStartupStore = create<StartupState>((set) => ({
  startups: startupsData as Startup[],
  addStartup: (startup) => set((state) => ({ startups: [...state.startups, startup] }))
}));
