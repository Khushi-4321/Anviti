import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { AIOutputCard } from '../../components/trust/AIOutputCard';
import { Calendar, IndianRupee, Target, Milestone, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePilotStore } from '../../stores/usePilotStore';

export function PilotDesigner() {
  const navigate = useNavigate();
  const { addPilot } = usePilotStore();
  
  const [milestones, setMilestones] = useState([
    { id: 'm1', title: 'System Architecture & Design', amount: 1000000, month: 1 },
    { id: 'm2', title: 'Core Platform Development', amount: 2000000, month: 3 },
    { id: 'm3', title: 'Deployment & UAT', amount: 1500000, month: 5 },
  ]);

  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones, 
      { id: `m${Date.now()}`, title: '', amount: 0, month: milestones.length > 0 ? milestones[milestones.length-1].month + 1 : 1 }
    ]);
  };

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handleFinalize = () => {
    // Generate pilot
    const newPilot = {
      id: `plt_${Date.now()}`,
      challengeId: 'c_1',
      proposalId: 'prop_1',
      startupId: 'startup_1',
      status: 'initiated' as const,
      milestones: milestones.map(m => ({
        id: m.id,
        title: m.title,
        description: `Milestone description for ${m.title}`,
        dueDate: new Date(Date.now() + m.month * 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: m.amount,
        status: 'pending' as const
      })),
      totalAmount,
      amountDisbursed: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    addPilot(newPilot);
    navigate(`/app/pilots/${newPilot.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pilot Designer</h1>
        <p className="text-slate-500 mt-1">Structure milestone-based deliverables for OmniSense Analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Milestone Schedule</CardTitle>
            <CardDescription>Define clear deliverables and tied payments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={milestone.id} className="p-4 border border-slate-200 rounded-lg relative bg-slate-50">
                <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-[#0E2238] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                  {idx + 1}
                </div>
                <div className="ml-4 space-y-4">
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase">Deliverable Title</label>
                      <Input 
                        value={milestone.title} 
                        onChange={(e) => {
                          const newM = [...milestones];
                          newM[idx].title = e.target.value;
                          setMilestones(newM);
                        }}
                        className="bg-white"
                        placeholder="e.g. Architecture Sign-off"
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase">Month</label>
                      <Input 
                        type="number"
                        value={milestone.month}
                        onChange={(e) => {
                          const newM = [...milestones];
                          newM[idx].month = parseInt(e.target.value) || 0;
                          setMilestones(newM);
                        }}
                        className="bg-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-medium text-slate-500 uppercase">Payment Amount (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                          type="number" 
                          value={milestone.amount}
                          onChange={(e) => {
                            const newM = [...milestones];
                            newM[idx].amount = parseInt(e.target.value) || 0;
                            setMilestones(newM);
                          }}
                          className="pl-9 bg-white font-medium"
                        />
                      </div>
                    </div>
                    <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRemoveMilestone(milestone.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full border-dashed gap-2" onClick={handleAddMilestone}>
              <Plus className="w-4 h-4" /> Add Milestone
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                ₹{(totalAmount / 100000).toFixed(2)}L
              </div>
              <p className="text-sm text-slate-500 mb-6">Total Project Value</p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Challenge Budget</span>
                  <span className="font-medium text-slate-900">₹50.0L</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Milestone Count</span>
                  <span className="font-medium text-slate-900">{milestones.length}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-slate-100">
                  <span className="text-slate-600">Avg / Milestone</span>
                  <span className="font-medium text-[#2DB87D]">₹{(totalAmount / milestones.length / 100000).toFixed(2)}L</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <AIOutputCard 
            output="Milestone schedule is well-structured. Front-loading is within acceptable 20% limit for inception phase."
            confidence={95}
            rationale="Analysis of GFR 2017 advance payment norms vs proposed schedule."
            evidence={['GFR 2017 Rule 172 (Advance Payments)']}
            humanControl={false}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleFinalize} className="bg-[#0E2238] hover:bg-slate-800">Finalize Pilot Contract</Button>
      </div>
    </div>
  );
}
