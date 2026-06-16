// src/hooks/useSustainabilityScore.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { scoreService } from '../services/scoreService';

export const useSustainabilityScore = () => {
  const { footprintResult, calculatorInputs } = useContext(UserContext);
  
  const scoreDetails = scoreService.getScoreDetails(footprintResult.total);
  const regionalComparison = scoreService.getRegionalComparison(footprintResult.total, calculatorInputs.location);

  return {
    footprint: footprintResult.total,
    breakdown: footprintResult.breakdown,
    details: footprintResult.details,
    score: scoreDetails.score,
    scoreLabel: scoreDetails.label,
    scoreColor: scoreDetails.color,
    benchmarkTarget: scoreDetails.benchmarkTarget,
    regionalComparison
  };
};
