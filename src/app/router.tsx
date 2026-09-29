import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { WorkQueueHome } from '../features/challenges/WorkQueueHome';
import { ChallengeStudioWizard } from '../features/challenges/ChallengeStudioWizard';
import { ChallengeDetail } from '../features/challenges/ChallengeDetail';
import { MatchWorkspace } from '../features/discovery/MatchWorkspace';
import { StartupComparison } from '../features/discovery/StartupComparison';
import { PilotDesigner } from '../features/pilots/PilotDesigner';
import { PilotWorkspace } from '../features/pilots/PilotWorkspace';
import { EvaluationWorkbench } from '../features/evaluation/EvaluationWorkbench';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        
        <Route path="/public" element={<PublicLayout><div className="p-8">Public Landing</div></PublicLayout>} />
        
        <Route path="/app" element={<AppLayout><WorkQueueHome /></AppLayout>} />
        <Route path="/app/challenges/new" element={<AppLayout currentStage="Challenge"><ChallengeStudioWizard /></AppLayout>} />
        <Route path="/app/challenges/:id" element={<AppLayout currentStage="Challenge"><ChallengeDetail /></AppLayout>} />
        <Route path="/app/challenges/:id/evaluation" element={<AppLayout currentStage="Evaluate" completedStages={['Challenge', 'Discover', 'Screen']}><EvaluationWorkbench /></AppLayout>} />
        
        <Route path="/app/discovery" element={<AppLayout currentStage="Discover" completedStages={['Challenge']}><MatchWorkspace /></AppLayout>} />
        <Route path="/app/discovery/compare" element={<AppLayout currentStage="Discover" completedStages={['Challenge']}><StartupComparison /></AppLayout>} />
        
        <Route path="/app/pilots/new" element={<AppLayout currentStage="Pilot" completedStages={['Challenge', 'Discover', 'Evaluate']}><PilotDesigner /></AppLayout>} />
        <Route path="/app/pilots/:id" element={<AppLayout currentStage="Pilot" completedStages={['Challenge', 'Discover', 'Evaluate']}><PilotWorkspace /></AppLayout>} />
        
        {/* We will add more routes here as we build them */}
      </Routes>
    </BrowserRouter>
  );
}
