// src/pages/Simulator.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useRecommendations } from '../hooks/useRecommendations';
import { useSimulation } from '../hooks/useSimulation';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import ScenarioBuilder from '../components/simulator/ScenarioBuilder';
import ImpactPrediction from '../components/ai/ImpactPrediction';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import Button from '../components/common/Button';
import { Sparkles, ArrowLeft, Leaf, ChevronRight } from 'lucide-react';

export const Simulator = () => {
  const { hasCompletedWizard } = useContext(UserContext);
  const { recommendations, appliedRecIds, toggleRecommendation } = useRecommendations();
  const { 
    simulatorState, 
    updateSimulator, 
    resetSimulator, 
    totalSavings, 
    simulatedFootprint,
    simulatedResult
  } = useSimulation();
  
  const navigate = useNavigate();

  // If user hasn't completed wizard
  if (!hasCompletedWizard) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Sparkles size={48} style={{ color: 'var(--primary-light)', animation: 'loader-pulse 1.5s infinite' }} />
          <h2>Simulator Locked</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Please complete the onboarding wizard questionnaire first before running sustainability simulations.
          </p>
          <Button variant="primary" onClick={() => navigate('/')} icon={ChevronRight}>
            Start Onboarding
          </Button>
        </div>
      </div>
    );
  }

  // Base footprint (from inputs without recommendation toggles)
  const baseFootprintResult = simulatedResult.total + simulatedResult.savings.total;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--spacing-lg)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '8px' }} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={16} /> <span>Back to Dashboard</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
            Eco-Simulation <span className="text-gradient-accent">Laboratory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Toggle custom recommendations and what-if variables to see 5-year carbon trajectory impacts.
          </p>
        </div>
        
        {/* Dynamic header savings indicator */}
        <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROJECTED CARBON SAVINGS</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--primary-light)' }}>
              -{simulatedResult.savings.total.toFixed(2)} tonnes / yr
            </strong>
          </div>
        </div>
      </div>

      {/* Main Grid Panels */}
      <div className="dashboard-grid">
        
        {/* Left Side: Recommendations List */}
        <div className="col-6" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <div className="glass-panel">
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
              AI MITIGATION CHECKLIST
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }}>
              Toggle customized recommendation cards to check the reduction in home utilities, travel, and food.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    isApplied={appliedRecIds.includes(rec.id)}
                    onToggle={toggleRecommendation}
                  />
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customized recommendations available. Ensure your base footprint values are filled in.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: What-if Sliders + Trajectory Chart */}
        <div className="col-6" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* Target Progress Gauge */}
          <ProgressTracker 
            currentFootprint={baseFootprintResult} 
            simulatedFootprint={simulatedFootprint} 
            targetGoal={2.0} 
          />

          {/* Slider Forms */}
          <ScenarioBuilder
            state={simulatorState}
            onChange={updateSimulator}
            onReset={resetSimulator}
            totalSavings={simulatedResult.savings.simulator}
          />
          
          {/* Predictive Chart */}
          <ImpactPrediction />

        </div>

      </div>
    </div>
  );
};

export default Simulator;
