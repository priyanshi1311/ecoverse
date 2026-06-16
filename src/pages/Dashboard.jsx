// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useSustainabilityScore } from '../hooks/useSustainabilityScore';
import SustainabilityScore from '../components/dashboard/SustainabilityScore';
import CarbonReductionChart from '../components/dashboard/CarbonReductionChart';
import ImpactSummaryCard from '../components/dashboard/ImpactSummaryCard';
import AIRecommendation from '../components/ai/AIRecommendation';
import ScenarioComparison from '../components/ai/ScenarioComparison';
import Button from '../components/common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Dashboard = () => {
  const { calculatorInputs, hasCompletedWizard } = useContext(UserContext);
  const { breakdown, footprint } = useSustainabilityScore();
  const navigate = useNavigate();

  // If the user has not completed the onboarding wizard, show lock screen
  if (!hasCompletedWizard) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Sparkles size={48} style={{ color: 'var(--primary-light)', animation: 'loader-pulse 1.5s infinite' }} />
          <h2>Dashboard Locked</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Please complete the onboarding wizard questionnaire first to generate your initial ecological footprint profile.
          </p>
          <Button variant="primary" onClick={() => navigate('/')} icon={ArrowRight}>
            Start Wizard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Dashboard Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--spacing-lg)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
            Sustainability <span className="text-gradient">Console</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Real-time tracking of carbon output, benchmarks, and AI reduction evaluation.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/simulator')} icon={ArrowRight}>
          Launch Simulator Lab
        </Button>
      </div>

      {/* Grid Layout Rows */}
      <div className="dashboard-grid">
        
        {/* Row 1: Rating Gauge & Breakdown Bar Chart */}
        <div className="col-4">
          <SustainabilityScore />
        </div>
        
        <div className="col-8">
          <CarbonReductionChart breakdown={breakdown} total={footprint} />
        </div>

        {/* Row 2: Metrics Summary & AI Report */}
        <div className="col-4">
          <ImpactSummaryCard />
        </div>
        
        <div className="col-8">
          <AIRecommendation inputs={calculatorInputs} />
        </div>

        {/* Row 3: Comparative Benchmarks */}
        <div className="col-12">
          <ScenarioComparison />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
