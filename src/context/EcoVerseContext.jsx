// src/context/EcoVerseContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { generateRecommendations } from '../utils/recommendationEngine';
import { calculateCarbonFootprint } from '../utils/carbonCalculator';
import { simulationService } from '../services/simulationService';

export const EcoVerseContext = createContext();

export const EcoVerseProvider = ({ children }) => {
  const { calculatorInputs, footprintResult } = useContext(UserContext);
  
  // Recommendations State
  const [recommendations, setRecommendations] = useState([]);
  const [appliedRecIds, setAppliedRecIds] = useState([]);

  // Simulator State
  const [simulatorState, setSimulatorState] = useState({
    treesPlanted: 0,
    solarCapacity: 0,
    wasteReducedKg: 0,
    waterSavedLiters: 0
  });

  // Load recommendations when calculator inputs change
  useEffect(() => {
    const recs = generateRecommendations(calculatorInputs);
    setRecommendations(recs);
    // Clear applied recommendations that no longer exist
    setAppliedRecIds(prev => prev.filter(id => recs.some(r => r.id === id)));
  }, [calculatorInputs]);

  // Toggle recommendation
  const toggleRecommendation = (id) => {
    setAppliedRecIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Update simulator state
  const updateSimulator = (key, value) => {
    setSimulatorState(prev => ({
      ...prev,
      [key]: Math.max(0, Number(value))
    }));
  };

  // Reset simulator
  const resetSimulator = () => {
    setSimulatorState({
      treesPlanted: 0,
      solarCapacity: 0,
      wasteReducedKg: 0,
      waterSavedLiters: 0
    });
    setAppliedRecIds([]);
  };

  // Calculate final simulated footprint
  // We apply the checked recommendation modifications to the base calculator inputs, recalculating emissions,
  // then subtract direct offsets from the simulator values (trees, solar capacity, water).
  const getSimulatedFootprint = () => {
    let simulatedInputs = { ...calculatorInputs };

    // Apply checked recommendations to inputs
    appliedRecIds.forEach(recId => {
      const rec = recommendations.find(r => r.id === recId);
      if (!rec) return;

      const { metricToModify, simulatorReduction, simulatorNewValue } = rec;

      if (metricToModify === 'electricity' || metricToModify === 'gas' || metricToModify === 'carDistance') {
        const factor = 1 - (simulatorReduction || 0);
        simulatedInputs[metricToModify] = Number(calculatorInputs[metricToModify]) * factor;
      } else if (metricToModify === 'diet') {
        if (simulatorNewValue === 'vegan_monday') {
          // Special case: vegan monday reduces diet factor
          // We don't change the diet input literally, but we'll apply a reduction during calculations.
          // For now, let's treat it as shifting diet partially
        } else {
          simulatedInputs.diet = simulatorNewValue;
        }
      } else if (metricToModify === 'carType') {
        simulatedInputs.carType = simulatorNewValue;
      } else if (metricToModify === 'recycling') {
        simulatedInputs.recycling = simulatorNewValue;
      } else if (metricToModify === 'consumption') {
        simulatedInputs.consumption = simulatorNewValue;
      } else if (metricToModify === 'flights') {
        simulatedInputs.flightShort = Number(calculatorInputs.flightShort) * (1 - (simulatorReduction || 0.5));
        simulatedInputs.flightLong = Number(calculatorInputs.flightLong) * (1 - (simulatorReduction || 0.5));
      }
    });

    // Run calculator on these adjusted inputs
    const recsAdjustedResult = calculateCarbonFootprint(simulatedInputs);

    // Calculate direct offsets from simulator items
    const simulatorSavings = simulationService.calculateSimulatorSavings(simulatorState);

    // If "Green Mondays" is applied (special diet case)
    let specialDietSavings = 0;
    const hasGreenMondays = appliedRecIds.includes('rec-vegan-days');
    if (hasGreenMondays && (calculatorInputs.diet === 'heavy_meat' || calculatorInputs.diet === 'medium_meat')) {
      const baseDietCO2 = recsAdjustedResult.breakdown.diet; // could have been modified, but let's take diet
      // 1 day out of 7 is vegan. vegan is 1.1 tonnes.
      const currentDietRate = baseDietCO2; 
      const veganRate = 1.1;
      specialDietSavings = (currentDietRate - veganRate) * (1 / 7);
    }

    // Combine results
    const recommendationSavings = Math.max(0, footprintResult.total - recsAdjustedResult.total) + specialDietSavings;
    const directOffsets = simulatorSavings.total;
    const totalSavings = recommendationSavings + directOffsets;
    const finalFootprint = Math.max(0.1, Number((footprintResult.total - totalSavings).toFixed(2)));

    // Breakdown for visualization
    const finalBreakdown = {
      energy: Math.max(0, Number((recsAdjustedResult.breakdown.energy - simulatorSavings.breakdown.solar).toFixed(2))),
      transport: recsAdjustedResult.breakdown.transport,
      diet: Math.max(0.1, Number((recsAdjustedResult.breakdown.diet - specialDietSavings).toFixed(2))),
      consumption: recsAdjustedResult.breakdown.consumption,
      offset: Number((recsAdjustedResult.breakdown.offset - simulatorSavings.breakdown.trees - simulatorSavings.breakdown.waste - simulatorSavings.breakdown.water).toFixed(2))
    };

    return {
      breakdown: finalBreakdown,
      total: finalFootprint,
      savings: {
        recommendations: Number(recommendationSavings.toFixed(2)),
        simulator: Number(directOffsets.toFixed(2)),
        total: Number(totalSavings.toFixed(2))
      }
    };
  };

  const simulatedResult = getSimulatedFootprint();

  return (
    <EcoVerseContext.Provider value={{
      recommendations,
      appliedRecIds,
      simulatorState,
      simulatedResult,
      toggleRecommendation,
      updateSimulator,
      resetSimulator
    }}>
      {children}
    </EcoVerseContext.Provider>
  );
};
