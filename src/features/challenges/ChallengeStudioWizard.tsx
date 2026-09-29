import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { AIOutputCard } from '../../components/trust/AIOutputCard';
import { ProvenanceChip } from '../../components/trust/ProvenanceChip';
import { useChallengeStore } from '../../stores/useChallengeStore';
import { Check, ChevronRight, Wand2, ArrowLeft } from 'lucide-react';

const STEPS = [
  'Overview',
  'Problem Statement',
  'Eligibility',
  'Milestones',
  'Budget',
  'AI Structurer',
  'Publish'
];

export function ChallengeStudioWizard() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { addChallenge } = useChallengeStore();
  
  const [formData, setFormData] = useState({
    title: '',
    department: 'Ministry of Urban Affairs',
    description: '',
    budget: 5000000,
  });

  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (step === 5 && !aiAnalysis) {
      generateAiAnalysis();
    } else if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      // Publish
      const newChallenge = {
        id: `c_${Date.now()}`,
        title: formData.title || 'Untitled Challenge',
        description: formData.description || 'No description',
        department: formData.department,
        budget: formData.budget,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'open' as const,
        tags: ['Smart City', 'AI'],
        createdAt: new Date().toISOString()
      };
      addChallenge(newChallenge);
      navigate(`/app/challenges/${newChallenge.id}`);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
    else navigate('/app');
  };

  const generateAiAnalysis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiAnalysis({
        riskLevel: 'low',
        flags: ['Budget aligns with GFR 2017 Chapter 6', 'Milestone dates are feasible'],
        evidence: ['GFR 2017 Rule 133', 'DPIIT Startup Guidelines']
      });
      setIsGenerating(false);
      setStep(s => s + 1);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-[#5B4FCF]" />
          Challenge Studio Wizard
        </h1>
        <p className="text-slate-500">Design an outcome-based problem statement.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border-2 ${
              i === step ? 'border-[#0E2238] bg-[#0E2238] text-white' :
              i < step ? 'border-green-500 bg-green-500 text-white' :
              'border-slate-200 text-slate-400'
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium whitespace-nowrap ${i <= step ? 'text-slate-900' : 'text-slate-400'}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-slate-200" />}
          </div>
        ))}
      </div>

      <Card className="min-h-[400px] flex flex-col">
        <CardContent className="pt-6 flex-1">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Challenge Title</label>
                <Input 
                  placeholder="e.g. Smart City Traffic Optimization" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Department</label>
                <Input 
                  value={formData.department}
                  disabled
                  className="mt-1 bg-slate-50"
                />
                <p className="text-xs text-slate-400 mt-1">Pre-filled from your Nodal Officer profile.</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Problem Description</label>
                <textarea 
                  className="w-full mt-1 min-h-[150px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Describe the current problem and desired outcomes..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="p-4 bg-[#5B4FCF]/5 rounded-lg border border-[#5B4FCF]/20">
                <div className="flex items-start gap-2 text-sm text-[#5B4FCF]">
                  <Wand2 className="w-5 h-5 shrink-0" />
                  <p><strong>AI Tip:</strong> Focus on <em>what</em> needs to be achieved, not <em>how</em> it should be built. This allows startups to propose innovative technical architectures.</p>
                </div>
              </div>
            </div>
          )}

          {(step === 2 || step === 3 || step === 4) && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">{STEPS[step]} Section</h3>
              <p className="text-slate-500 max-w-sm">This is a structural placeholder for the {STEPS[step].toLowerCase()} form in the wizard.</p>
              <ProvenanceChip type="simulated" label="Mock Step" />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-900 mb-2">AI Compliance & Structure Review</h3>
                <p className="text-slate-500 mb-6">Running ANVITI semantic checks against GFR 2017 and DPIIT guidelines...</p>
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E2238]"></div>
                    <span className="text-sm text-slate-500">Analyzing proposal structure...</span>
                  </div>
                ) : aiAnalysis ? (
                  <div className="text-left">
                    <AIOutputCard 
                      output={{
                        riskLevel: aiAnalysis.riskLevel,
                        flags: aiAnalysis.flags
                      }}
                      confidence={92}
                      rationale="The budget matches GFR Rule 133 bounds for pilot innovation procurement."
                      evidence={aiAnalysis.evidence}
                      humanControl={true}
                    />
                  </div>
                ) : (
                  <Button onClick={generateAiAnalysis} className="gap-2 bg-[#5B4FCF] hover:bg-[#4A40A3]">
                    <Wand2 className="w-4 h-4" /> Run Structural Analysis
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Publish</h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Your challenge "{formData.title || 'Untitled'}" is structured, compliant, and ready to be broadcasted to verified DPIIT startups.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="outline" className="bg-slate-50">Budget: ₹{(formData.budget/100000).toFixed(1)}L</Badge>
                <ProvenanceChip type="source" label="GFR 2017 Verified" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-slate-100 p-6 bg-slate-50/50">
          <Button variant="outline" onClick={handleBack}>
            {step === 0 ? 'Cancel' : <><ArrowLeft className="w-4 h-4 mr-2" /> Back</>}
          </Button>
          <Button onClick={handleNext} disabled={step === 5 && !aiAnalysis && !isGenerating} className="gap-2">
            {step === STEPS.length - 1 ? 'Publish Challenge' : (
              <>
                {step === 4 ? 'Review & Finalize' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
