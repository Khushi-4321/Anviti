import { create } from 'zustand';
import { Pilot, Milestone } from '../types';
import pilotsData from '../data/seed/pilots.json';

interface PilotState {
  pilots: Pilot[];
  updateMilestoneStatus: (pilotId: string, milestoneId: string, status: Milestone['status']) => void;
  addPilot: (pilot: Pilot) => void;
}

export const usePilotStore = create<PilotState>((set) => ({
  pilots: pilotsData as Pilot[],
  addPilot: (pilot) => set((state) => ({ pilots: [...state.pilots, pilot] })),
  updateMilestoneStatus: (pilotId, milestoneId, status) => set((state) => ({
    pilots: state.pilots.map((p) => {
      if (p.id === pilotId) {
        return {
          ...p,
          milestones: p.milestones.map((m) => m.id === milestoneId ? { ...m, status } : m)
        };
      }
      return p;
    })
  }))
}));
