import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useChallengeStore } from '../../stores/useChallengeStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, FileText, Activity } from 'lucide-react';

export function WorkQueueHome() {
  const { user } = useAuthStore();
  const { challenges } = useChallengeStore();
  const navigate = useNavigate();

  const activeChallenges = challenges.filter(c => c.status !== 'closed');
  
  // Mocks for different queues based on role
  const pendingActions = user?.role === 'nodal_officer' ? [
    { id: 1, title: 'Approve Milestone 2 for Traffic Opt', type: 'Payment', due: 'Today' },
    { id: 2, title: 'Review Evaluation Scores for Drone Mapping', type: 'Evaluation', due: 'Tomorrow' }
  ] : user?.role === 'startup' ? [
    { id: 1, title: 'Submit Proposal for Waste Mgmt', type: 'Proposal', due: 'In 3 days' },
    { id: 2, title: 'Upload Pilot Evidence', type: 'Pilot', due: 'Next week' }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {user?.name}</h1>
          <p className="text-slate-500 mt-1">Here is your {user?.role.replace('_', ' ')} workspace overview.</p>
        </div>
        {user?.role === 'nodal_officer' && (
          <Button onClick={() => navigate('/app/challenges/new')} className="gap-2">
            <FileText className="w-4 h-4" />
            Create Challenge
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#5B4FCF]" />
              Action Queue
            </CardTitle>
            <CardDescription>Items requiring your immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingActions.length > 0 ? (
              <div className="space-y-4">
                {pendingActions.map(action => (
                  <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Clock className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{action.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{action.type}</Badge>
                          <span className="text-xs text-slate-500">Due {action.due}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Action <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-3 opacity-20" />
                <p>You're all caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border border-slate-100">
              <span className="text-slate-600 text-sm">Active Challenges</span>
              <span className="font-bold text-slate-900">{activeChallenges.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border border-slate-100">
              <span className="text-slate-600 text-sm">Pending Proposals</span>
              <span className="font-bold text-slate-900">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md border border-slate-100">
              <span className="text-slate-600 text-sm">Active Pilots</span>
              <span className="font-bold text-slate-900">3</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-8 mb-4">Active Threads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeChallenges.map(challenge => (
          <Card key={challenge.id} className="cursor-pointer hover:shadow-md transition-all border-slate-200/60" onClick={() => navigate(`/app/challenges/${challenge.id}`)}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={
                  challenge.status === 'open' ? 'bg-green-100 text-green-800' :
                  challenge.status === 'draft' ? 'bg-slate-100 text-slate-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {challenge.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-slate-400">{new Date(challenge.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">{challenge.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{challenge.description}</p>
              <div className="flex items-center gap-2 mt-auto">
                <Badge variant="outline" className="text-xs bg-slate-50 font-normal">
                  ₹{(challenge.budget / 100000).toFixed(1)}L
                </Badge>
                <Badge variant="outline" className="text-xs bg-slate-50 font-normal">
                  {challenge.department}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
