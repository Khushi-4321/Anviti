import React, { useState } from 'react';
import { useStartupStore } from '../../stores/useStartupStore';
import { useChallengeStore } from '../../stores/useChallengeStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Filter, ShieldCheck, MapPin, Building, ArrowRight, BarChart3, CheckSquare } from 'lucide-react';
import { ProvenanceChip } from '../../components/trust/ProvenanceChip';
import { useNavigate } from 'react-router-dom';

export function MatchWorkspace() {
  const { startups } = useStartupStore();
  const { challenges } = useChallengeStore();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartups, setSelectedStartups] = useState<string[]>([]);
  
  const activeChallenge = challenges.find(c => c.status === 'open') || challenges[0];

  const filteredStartups = startups.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompare = () => {
    if (selectedStartups.length > 0) {
      navigate(`/app/discovery/compare?ids=${selectedStartups.join(',')}`);
    }
  };

  const toggleSelection = (id: string) => {
    if (selectedStartups.includes(id)) {
      setSelectedStartups(prev => prev.filter(sid => sid !== id));
    } else {
      if (selectedStartups.length < 3) {
        setSelectedStartups(prev => [...prev, id]);
      } else {
        alert("You can compare up to 3 startups at once.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Discovery Workspace</span>
            <ProvenanceChip type="source" label="DPIIT Verified Registry" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Startup Matching</h1>
          <p className="text-slate-500 mt-1">
            Finding matches for <span className="font-semibold text-slate-700">{activeChallenge?.title}</span>
          </p>
        </div>
        
        {selectedStartups.length > 0 && (
          <Button onClick={handleCompare} className="gap-2 bg-[#5B4FCF] hover:bg-[#4A40A3]">
            <BarChart3 className="w-4 h-4" />
            Compare ({selectedStartups.length}) Startups
          </Button>
        )}
      </div>

      {/* Funnel Visualization Mock */}
      <Card className="bg-slate-900 text-white overflow-hidden border-0">
        <div className="absolute top-0 right-0 p-32 bg-[#5B4FCF]/20 rounded-full blur-[100px] pointer-events-none" />
        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-2 md:py-0">
              <div className="text-4xl font-bold mb-2">1,204</div>
              <div className="text-sm text-slate-400">Total DPIIT Startups in Domain</div>
            </div>
            <div className="py-2 md:py-0">
              <div className="text-4xl font-bold mb-2 text-[#F2A93B]">342</div>
              <div className="text-sm text-slate-400">Met Eligibility Criteria</div>
            </div>
            <div className="py-2 md:py-0">
              <div className="text-4xl font-bold mb-2 text-[#2DB87D]">84</div>
              <div className="text-sm text-slate-400">High Match Score</div>
            </div>
            <div className="py-2 md:py-0">
              <div className="text-4xl font-bold mb-2 text-blue-400">{filteredStartups.length}</div>
              <div className="text-sm text-slate-400">Shortlisted for Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name, domain, or technology..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map(startup => {
          const isSelected = selectedStartups.includes(startup.id);
          
          return (
            <Card 
              key={startup.id} 
              className={`transition-all ${isSelected ? 'ring-2 ring-[#5B4FCF] shadow-md border-transparent' : 'hover:border-slate-300'}`}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-lg font-bold text-slate-700">
                    {startup.name.substring(0, 2).toUpperCase()}
                  </div>
                  <button 
                    onClick={() => toggleSelection(startup.id)}
                    className={`p-1.5 rounded-md transition-colors ${isSelected ? 'text-[#5B4FCF] bg-[#5B4FCF]/10' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    <CheckSquare className={`w-5 h-5 ${isSelected ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1">{startup.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DPIIT: {startup.dpiitDpp}</span>
                </div>
                
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                  Specialized in {startup.domain.toLowerCase()} solutions for enterprise and government clients.
                </p>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{startup.district}, {startup.state}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{startup.metrics.employees} Emp.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-slate-700">₹{(startup.metrics.revenue/10000000).toFixed(1)}Cr</span>
                    <span className="text-xs">Rev</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-slate-700">{startup.metrics.yearsActive}</span>
                    <span className="text-xs">Yrs Active</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full justify-between mt-auto bg-slate-50 hover:bg-slate-100 border border-slate-200">
                  View Full Profile <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
