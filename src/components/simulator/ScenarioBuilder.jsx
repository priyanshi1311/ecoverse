// src/components/simulator/ScenarioBuilder.jsx
import React from 'react';
import { RefreshCw, LayoutList } from 'lucide-react';
import TreePlantationForm from './TreePlantationForm';
import SolarPanelForm from './SolarPanelForm';
import WasteReductionForm from './WasteReductionForm';
import WaterConservationForm from './WaterConservationForm';
import Button from '../common/Button';

export const ScenarioBuilder = ({
  state = {},
  onChange,
  onReset,
  totalSavings = 0
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      {/* Simulation Header / Stats Summary */}
      <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutList size={18} style={{ color: 'var(--primary-light)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              SIMULATED ACTIONS
            </span>
          </div>
          <Button variant="glass" size="sm" onClick={onReset} icon={RefreshCw}>
            Reset Sim
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct Simulation Savings:</span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--primary-light)', fontWeight: '800' }}>
            -{totalSavings.toFixed(3)} t/yr
          </strong>
        </div>
      </div>

      {/* Grid of Simulation Sliders */}
      <div className="simulator-panel-grid">
        <TreePlantationForm
          value={state.treesPlanted || 0}
          onChange={(val) => onChange('treesPlanted', val)}
        />
        
        <SolarPanelForm
          value={state.solarCapacity || 0}
          onChange={(val) => onChange('solarCapacity', val)}
        />
        
        <WasteReductionForm
          value={state.wasteReducedKg || 0}
          onChange={(val) => onChange('wasteReducedKg', val)}
        />
        
        <WaterConservationForm
          value={state.waterSavedLiters || 0}
          onChange={(val) => onChange('waterSavedLiters', val)}
        />
      </div>
    </div>
  );
};

export default ScenarioBuilder;
