// src/hooks/useSimulation.js
import { useContext } from 'react';
import { EcoVerseContext } from '../context/EcoVerseContext';
import { predictCarbonTrajectory } from '../utils/predictionEngine';
import { UserContext } from '../context/UserContext';

export const useSimulation = () => {
  const { footprintResult } = useContext(UserContext);
  const {
    simulatorState,
    simulatedResult,
    updateSimulator,
    resetSimulator
  } = useContext(EcoVerseContext);

  // Generate 5-year predictive trajectory comparing business as usual, target, and simulated scenarios
  const trajectory = predictCarbonTrajectory(
    footprintResult.total,
    simulatedResult.savings.total
  );

  return {
    simulatorState,
    simulatedResult,
    updateSimulator,
    resetSimulator,
    trajectory,
    totalSavings: simulatedResult.savings.total,
    simulatedFootprint: simulatedResult.total,
    simulatedBreakdown: simulatedResult.breakdown
  };
};
