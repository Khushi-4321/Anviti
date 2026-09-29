import { AIResult } from '../../types';

export const AIService = {
  async evaluateProposalRisk(proposalText: string): Promise<AIResult<{ riskLevel: 'low' | 'medium' | 'high'; flags: string[] }>> {
    // Simulated AI Response
    return new Promise((resolve) => setTimeout(() => resolve({
      output: {
        riskLevel: 'medium',
        flags: ['Aggressive timeline for data collection', 'Budget allocation for hardware is lower than industry average']
      },
      evidence: ['Based on analysis of 150 similar past agrarian tech proposals'],
      confidence: 0.85,
      rationale: 'The proposal shows strong technical merit but lacks contingency planning for data collection delays typical in rural settings.',
      humanControl: true
    }), 1000));
  },
  
  async matchStartupToChallenge(startupDescription: string, challengeId: string): Promise<AIResult<{ matchScore: number; strengths: string[]; weaknesses: string[] }>> {
    return new Promise((resolve) => setTimeout(() => resolve({
      output: {
        matchScore: 88,
        strengths: ['Domain expertise aligns with challenge', 'Strong execution history'],
        weaknesses: ['Limited capacity (current employee count is low for scale)']
      },
      evidence: ['Startup domain tag matches challenge tags', 'DPIIT profile metrics'],
      confidence: 0.92,
      rationale: 'Strong alignment on the technical domain, though operational scale might be a constraint.',
      humanControl: false
    }), 800));
  }
};
