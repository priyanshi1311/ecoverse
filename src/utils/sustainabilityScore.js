// src/utils/sustainabilityScore.js
import benchmarks from '../data/sustainabilityBenchmarks.json';

/**
 * Calculates a sustainability score from 0 to 100 based on the total footprint.
 * 
 * @param {number} totalFootprint - Total annual footprint in tonnes of CO2e.
 * @returns {Object} - The score (0-100), label, and color theme.
 */
export const calculateSustainabilityScore = (totalFootprint) => {
  // Score mapping equation:
  // Footprint <= 2.0 -> Score >= 95
  // Footprint >= 20.0 -> Score <= 15
  // Interpolated in between
  let score = 100;
  
  if (totalFootprint <= 2.0) {
    // High score, linear map from [0, 2] -> [100, 95]
    score = 100 - (totalFootprint / 2.0) * 5;
  } else if (totalFootprint <= 6.0) {
    // Good/Average, linear map from [2.0, 6.0] -> [95, 70]
    score = 95 - ((totalFootprint - 2.0) / 4.0) * 25;
  } else if (totalFootprint <= 14.0) {
    // Average/Heavy, linear map from [6.0, 14.0] -> [70, 40]
    score = 70 - ((totalFootprint - 6.0) / 8.0) * 30;
  } else {
    // Excessive, linear map from [14.0, 30.0] -> [40, 10], min 5
    score = Math.max(5, 40 - ((totalFootprint - 14.0) / 16.0) * 30);
  }

  const finalScore = Math.round(score);

  // Find the threshold rating
  const threshold = benchmarks.rating_thresholds.find(t => totalFootprint <= t.max) || 
                    benchmarks.rating_thresholds[benchmarks.rating_thresholds.length - 1];

  return {
    score: finalScore,
    label: threshold.label,
    color: threshold.color,
    benchmarkTarget: 2.0 // Paris agreement target tonnes/year/person
  };
};
