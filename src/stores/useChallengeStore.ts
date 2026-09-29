import { create } from 'zustand';
import { Challenge } from '../types';
import challengesData from '../data/seed/challenges.json';

interface ChallengeState {
  challenges: Challenge[];
  addChallenge: (challenge: Challenge) => void;
  updateChallengeStatus: (id: string, status: Challenge['status']) => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenges: challengesData as Challenge[],
  addChallenge: (challenge) => set((state) => ({ challenges: [...state.challenges, challenge] })),
  updateChallengeStatus: (id, status) => set((state) => ({
    challenges: state.challenges.map((c) => c.id === id ? { ...c, status } : c)
  }))
}));
