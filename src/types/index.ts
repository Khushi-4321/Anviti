export type Role = 'nodal_officer' | 'startup' | 'evaluator' | 'admin';

export type ProvenanceTag = '[SOURCE: GFR 2017]' | '[SOURCE: DPIIT]' | '[DERIVED]' | '[SIMULATED]';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string; // e.g., Ministry of Defense
}

export interface AIResult<T> {
  output: T;
  evidence: string[];
  confidence: number;
  rationale: string;
  humanControl: boolean; // Needs human approval
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  department: string;
  budget: number;
  deadline: string;
  status: 'draft' | 'open' | 'evaluating' | 'awarded' | 'closed';
  tags: string[];
  createdAt: string;
}

export interface Startup {
  id: string;
  name: string; // Fictional name
  dpiitDpp: string; // DPIIT Recognition Number
  udyamAadhaar?: string;
  founderName: string;
  email: string;
  state: string; // Real Indian state
  district: string;
  domain: string;
  verified: boolean;
  metrics: {
    revenue: number;
    employees: number;
    yearsActive: number;
  };
}

export interface Proposal {
  id: string;
  challengeId: string;
  startupId: string;
  title: string;
  solutionText: string;
  estimatedCost: number;
  timelineMonths: number;
  status: 'submitted' | 'shortlisted' | 'rejected' | 'accepted';
  submittedAt: string;
}

export interface Pilot {
  id: string;
  challengeId: string;
  proposalId: string;
  startupId: string;
  status: 'initiated' | 'in_progress' | 'completed' | 'failed';
  milestones: Milestone[];
  totalAmount: number;
  amountDisbursed: number;
  startDate: string;
  endDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'submitted' | 'approved' | 'paid';
  evidenceUrl?: string;
}

export interface Evaluation {
  id: string;
  proposalId: string;
  evaluatorId: string;
  scores: {
    innovation: number;
    feasibility: number;
    impact: number;
    cost: number;
  };
  totalScore: number;
  comments: string;
  aiInsights?: AIResult<{ riskLevel: 'low' | 'medium' | 'high'; flags: string[] }>;
}

export interface Payment {
  id: string;
  pilotId: string;
  milestoneId: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  pfmsTransactionId?: string;
  initiatedAt: string;
  completedAt?: string;
}

export interface Policy {
  id: string;
  name: string;
  clause: string;
  description: string;
  provenance: ProvenanceTag;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  action: string;
  actorId: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, any>;
  previousHash: string;
  hash: string;
}
