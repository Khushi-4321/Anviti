import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChallengeStore } from '../../stores/useChallengeStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, IndianRupee, Building2, Tag, ArrowRight } from 'lucide-react';
import { ProvenanceChip } from '../../components/trust/ProvenanceChip';

export function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const { challenges, updateChallengeStatus } = useChallengeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const challenge = challenges.find(c => c.id === id);

  if (!challenge) {
    return <div className="p-8 text-center text-slate-500">Challenge not found.</div>;
  }

  const handleApply = () => {
    // In a real app, opens a modal or navigates to application form
    alert("Application flow initiated");
  };

  const handleMoveToEvaluation = () => {
    updateChallengeStatus(challenge.id, 'evaluating');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={
              challenge.status === 'open' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
              challenge.status === 'draft' ? 'bg-slate-100 text-slate-800 hover:bg-slate-100' :
              'bg-blue-100 text-blue-800 hover:bg-blue-100'
            }>
              {challenge.status.toUpperCase()}
            </Badge>
            <span className="text-sm text-slate-500">ID: {challenge.id}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{challenge.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === 'startup' && challenge.status === 'open' && (
            <Button onClick={handleApply} className="bg-[#5B4FCF] hover:bg-[#4A40A3]">
              Submit Proposal
            </Button>
          )}
          {user?.role === 'nodal_officer' && challenge.status === 'open' && (
            <Button onClick={handleMoveToEvaluation} variant="outline">
              Close & Start Evaluation
            </Button>
          )}
          {user?.role === 'nodal_officer' && challenge.status === 'evaluating' && (
            <Button onClick={() => navigate(`/app/challenges/${challenge.id}/evaluation`)} className="gap-2">
              Go to Evaluation Workbench <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Problem Statement</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{challenge.description}</p>
            
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Required Outcomes</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5B4FCF] shrink-0" />
                  <span>Scalable technical architecture with open API standards.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5B4FCF] shrink-0" />
                  <span>Demonstrable pilot implementation within 3 months of award.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5B4FCF] shrink-0" />
                  <span>Compliance with national data security standards.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-900">Department</div>
                  <div className="text-sm text-slate-600">{challenge.department}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-900">Allocated Budget</div>
                  <div className="text-sm text-slate-600">₹{(challenge.budget / 100000).toFixed(2)} Lakhs</div>
                  <div className="mt-1">
                    <ProvenanceChip type="source" label="GFR 2017 Rule 133" />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-slate-900">Submission Deadline</div>
                  <div className="text-sm text-slate-600">{new Date(challenge.deadline).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
