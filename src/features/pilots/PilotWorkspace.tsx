import React from 'react';
import { useParams } from 'react-router-dom';
import { usePilotStore } from '../../stores/usePilotStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { CheckCircle2, Clock, UploadCloud, AlertTriangle, FileText, Check } from 'lucide-react';
import { ProvenanceChip } from '../../components/trust/ProvenanceChip';

export function PilotWorkspace() {
  const { id } = useParams<{ id: string }>();
  const { pilots } = usePilotStore();
  
  const pilot = pilots.find(p => p.id === id) || pilots[0];

  if (!pilot) {
    return <div className="p-8 text-center">Pilot not found</div>;
  }

  const progress = (pilot.amountDisbursed / pilot.totalAmount) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-100 text-blue-800">ACTIVE PILOT</Badge>
            <span className="text-sm text-slate-500">ID: {pilot.id}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Traffic Opt Pilot</h1>
          <p className="text-slate-500 mt-1">Executing partner: OmniSense Analytics</p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-slate-500 mb-1">Financial Progress</div>
          <div className="text-2xl font-bold text-slate-900">
            ₹{(pilot.amountDisbursed/100000).toFixed(1)}L <span className="text-sm font-normal text-slate-500">/ ₹{(pilot.totalAmount/100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Project Timeline & Disbursal</span>
            <span className="text-sm font-bold text-[#5B4FCF]">{progress.toFixed(0)}% Completed</span>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Milestones</h2>
          
          <div className="space-y-4">
            {pilot.milestones.map((m, i) => (
              <Card key={m.id} className={m.status === 'paid' ? 'bg-slate-50/50 border-slate-200' : m.status === 'submitted' ? 'border-[#F2A93B]' : ''}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        m.status === 'paid' ? 'bg-green-100 text-green-600' :
                        m.status === 'submitted' ? 'bg-amber-100 text-amber-600' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {m.status === 'paid' ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${m.status === 'paid' ? 'text-slate-600' : 'text-slate-900'}`}>{m.title}</h3>
                        <div className="text-sm text-slate-500">Due: {new Date(m.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">₹{(m.amount/100000).toFixed(1)}L</div>
                      <Badge variant="outline" className={`mt-1 ${
                        m.status === 'paid' ? 'text-green-600 bg-green-50' :
                        m.status === 'submitted' ? 'text-amber-600 bg-amber-50' : ''
                      }`}>
                        {m.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {m.status === 'submitted' && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                      <Button className="flex-1 bg-[#2DB87D] hover:bg-[#259b69] gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Approve & Pay
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <FileText className="w-4 h-4" /> View Evidence
                      </Button>
                    </div>
                  )}

                  {m.status === 'pending' && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3 justify-end">
                      <Button variant="outline" className="gap-2">
                        <UploadCloud className="w-4 h-4" /> Upload Evidence
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Live Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="text-sm font-medium text-amber-900 mb-1">API Latency Spike</div>
                <div className="text-xs text-amber-700">The staging server reported 400ms latency (threshold: 200ms) over the last 24h.</div>
                <div className="mt-2 text-xs text-amber-600 font-medium">Source: AWS CloudWatch</div>
              </div>
              
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-md">
                <div className="text-sm font-medium text-slate-700 mb-1">Uptime SLA</div>
                <div className="text-2xl font-bold text-green-600 mb-1">99.98%</div>
                <Progress value={99.98} className="h-1.5 [&>div]:bg-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Lock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 bg-slate-50 rounded-md border border-slate-200 border-dashed">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">Smart Contract Active</h4>
                  <p className="text-xs text-slate-500 mb-3">Escrow rules engaged via Hashgraph.</p>
                  <ProvenanceChip type="derived" label="0x8f...4a2b" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
