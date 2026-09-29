import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStartupStore } from '../../stores/useStartupStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Check, X, Award, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { AIOutputCard } from '../../components/trust/AIOutputCard';

export function StartupComparison() {
  const [searchParams] = useSearchParams();
  const { startups } = useStartupStore();
  const navigate = useNavigate();
  
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',') : [];
  
  const selectedStartups = startups.filter(s => ids.includes(s.id));

  if (selectedStartups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">No startups selected for comparison.</p>
        <Button onClick={() => navigate('/app/discovery')}>Go Back to Discovery</Button>
      </div>
    );
  }

  // Mock AI comparison insights
  const aiInsights = {
    'startup_1': {
      strengths: ['Highest technical capability', 'Proven track record in similar domain'],
      weaknesses: ['Higher cost relative to others'],
      matchScore: 92
    },
    'startup_2': {
      strengths: ['Most cost-effective solution', 'Agile team structure'],
      weaknesses: ['Limited experience with government contracts'],
      matchScore: 78
    },
    'startup_3': {
      strengths: ['Strong local presence', 'Good domain knowledge'],
      weaknesses: ['Lower revenue stability'],
      matchScore: 85
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Compare Startups</h1>
          <p className="text-sm text-slate-500">Evaluating {selectedStartups.length} candidates side-by-side.</p>
        </div>
      </div>

      <div className="mb-8">
        <AIOutputCard 
          output="OmniSense Analytics shows the highest technical capability match for the 'Smart City Traffic Optimization' challenge based on their previous work in predictive modeling. Nexus Tech offers a more cost-effective approach but lacks proven scale."
          confidence={88}
          rationale="Analyzed past DPIIT registry data, recent revenue filings, and domain match algorithms."
          evidence={['DPIIT Database Sync 2026-09-01', 'Startup self-reported domains']}
          humanControl={false}
        />
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 text-left bg-slate-50 w-48 font-medium text-slate-500 rounded-tl-lg">
                Criteria
              </th>
              {selectedStartups.map((startup, idx) => (
                <th key={startup.id} className={`p-4 border-b border-slate-200 bg-white text-left min-w-[250px] ${idx === selectedStartups.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-slate-900">{startup.name}</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {aiInsights[startup.id as keyof typeof aiInsights]?.matchScore || 80}% Match
                    </Badge>
                  </div>
                  <div className="text-xs font-medium text-slate-500">DPIIT: {startup.dpiitDpp}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Domain & Location */}
            <tr>
              <td className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-700">Domain & Location</td>
              {selectedStartups.map(startup => (
                <td key={startup.id} className="p-4 border-b border-slate-100 bg-white align-top">
                  <div className="font-medium text-slate-900 mb-1">{startup.domain}</div>
                  <div className="text-sm text-slate-500">{startup.district}, {startup.state}</div>
                </td>
              ))}
            </tr>
            
            {/* Company Metrics */}
            <tr>
              <td className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-700">Company Size</td>
              {selectedStartups.map(startup => (
                <td key={startup.id} className="p-4 border-b border-slate-100 bg-white align-top">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Employees:</span>
                      <span className="font-medium">{startup.metrics.employees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Years Active:</span>
                      <span className="font-medium">{startup.metrics.yearsActive}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Ann. Revenue:</span>
                      <span className="font-medium">₹{(startup.metrics.revenue/10000000).toFixed(1)} Cr</span>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* AI Strengths */}
            <tr>
              <td className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-700">AI Noted Strengths</td>
              {selectedStartups.map(startup => {
                const insights = aiInsights[startup.id as keyof typeof aiInsights];
                return (
                  <td key={startup.id} className="p-4 border-b border-slate-100 bg-white align-top bg-green-50/30">
                    <ul className="space-y-1">
                      {insights?.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                );
              })}
            </tr>

            {/* AI Weaknesses */}
            <tr>
              <td className="p-4 border-b border-slate-200 bg-slate-50 font-medium text-sm text-slate-700">AI Noted Risks</td>
              {selectedStartups.map(startup => {
                const insights = aiInsights[startup.id as keyof typeof aiInsights];
                return (
                  <td key={startup.id} className="p-4 border-b border-slate-200 bg-white align-top bg-red-50/30">
                    <ul className="space-y-1">
                      {insights?.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                );
              })}
            </tr>
            
            {/* Action */}
            <tr>
              <td className="p-4 bg-slate-50 rounded-bl-lg"></td>
              {selectedStartups.map((startup, idx) => (
                <td key={startup.id} className={`p-4 bg-white ${idx === selectedStartups.length - 1 ? 'rounded-br-lg' : ''}`}>
                  <Button className="w-full bg-[#0E2238] hover:bg-slate-800">
                    Invite to Pitch
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
