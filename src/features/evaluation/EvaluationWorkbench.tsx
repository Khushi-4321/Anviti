import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import { ShieldAlert, CheckCircle2, Lock, FileText, ChevronRight, BarChart } from 'lucide-react';
import { AIOutputCard } from '../../components/trust/AIOutputCard';
import { HumanControl } from '../../components/trust/HumanControl';

export function EvaluationWorkbench() {
  const [coiCleared, setCoiCleared] = useState(false);
  const [scores, setScores] = useState({
    innovation: 50,
    feasibility: 50,
    impact: 50,
    cost: 50
  });

  const totalScore = Math.round((scores.innovation * 0.3) + (scores.feasibility * 0.3) + (scores.impact * 0.2) + (scores.cost * 0.2));

  if (!coiCleared) {
    return (
      <div className="max-w-3xl mx-auto mt-12">
        <Card className="border-amber-200">
          <CardHeader className="bg-amber-50 border-b border-amber-100">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Conflict of Interest (COI) Declaration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <p className="text-slate-700">
              Before accessing the blind evaluation workbench for <strong>Proposal #PRP-892</strong>, you must declare that you have no financial, personal, or professional conflicts of interest with the participating entities.
            </p>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Automated Check:</h4>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> No cross-directorships found in MCA database.
              </p>
              <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> No prior financial transactions detected.
              </p>
            </div>
            <HumanControl 
              title="Acknowledge & Unlock" 
              description="I legally attest to having no conflict of interest."
              onApprove={() => setCoiCleared(true)}
              onReject={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-slate-100"><Lock className="w-3 h-3 mr-1" /> BLIND EVALUATION</Badge>
            <span className="text-sm text-slate-500">Proposal #PRP-892</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Scoring Workbench</h1>
        </div>
        <Button className="bg-[#0E2238] hover:bg-slate-800 gap-2">
          Submit Evaluation <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-500" />
                Solution Architecture Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-slate-700">
              <p>The proposed solution leverages a microservices architecture to ingest real-time traffic camera feeds. It utilizes a lightweight edge-computing model to process initial bounding boxes before sending compressed payload to the central cloud for long-term anomaly detection.</p>
              <ul>
                <li>Latency: &lt;200ms per frame</li>
                <li>Bandwidth saving: ~40% vs traditional streaming</li>
                <li>Stack: Rust (Edge), Go (Cloud), PostgreSQL</li>
              </ul>
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-900 mt-4">
                <strong>Anonymization Note:</strong> All vendor identifying marks have been scrubbed from this document by the Anviti proxy layer.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scoring Rubric</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {[
                { key: 'innovation', label: 'Technical Innovation', weight: '30%' },
                { key: 'feasibility', label: 'Implementation Feasibility', weight: '30%' },
                { key: 'impact', label: 'Expected Impact', weight: '20%' },
                { key: 'cost', label: 'Cost Efficiency', weight: '20%' },
              ].map(metric => (
                <div key={metric.key} className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-900">{metric.label} <span className="text-slate-500 font-normal text-sm">({metric.weight})</span></span>
                    <span className="font-bold text-[#5B4FCF]">{scores[metric.key as keyof typeof scores]}/100</span>
                  </div>
                  <Slider 
                    defaultValue={[50]} 
                    max={100} 
                    step={1} 
                    value={[scores[metric.key as keyof typeof scores]]}
                    onValueChange={(val) => setScores({...scores, [metric.key]: val[0]})}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-0">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">Weighted Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold mb-4 text-[#F2A93B]">
                {totalScore}<span className="text-2xl text-slate-500">/100</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#F2A93B] transition-all" style={{ width: `${totalScore}%` }} />
              </div>
            </CardContent>
          </Card>

          <AIOutputCard 
            output="The proposed architecture aligns well with modern scalable practices. However, relying on Rust for the edge component may increase hiring costs for future maintenance by the department."
            confidence={82}
            rationale="Cross-referenced proposed tech stack with NIC standard technology guidelines."
            evidence={['NIC Technical Standards v2.4']}
            humanControl={false}
          />
        </div>
      </div>
    </div>
  );
}
