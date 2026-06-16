// src/services/scoreService.js
import { calculateSustainabilityScore } from '../utils/sustainabilityScore';
import benchmarks from '../data/sustainabilityBenchmarks.json';

export const scoreService = {
  getScoreDetails: (totalFootprint) => {
    return calculateSustainabilityScore(totalFootprint);
  },

  getRegionalComparison: (totalFootprint, regionCode = 'GL') => {
    const region = benchmarks.regions[regionCode] || benchmarks.regions.GL;
    const average = region.average_footprint;
    const difference = totalFootprint - average;
    const percentDiff = Math.abs((difference / average) * 100).toFixed(0);
    const isHigher = difference > 0;

    return {
      regionName: region.name,
      regionalAverage: average,
      target: region.sustainability_target,
      difference: Number(difference.toFixed(2)),
      percentDiff: Number(percentDiff),
      isHigher,
      summaryText: isHigher 
        ? `Your carbon footprint is ${percentDiff}% higher than the ${region.name} average.` 
        : `Congratulations! Your carbon footprint is ${percentDiff}% lower than the ${region.name} average.`
    };
  }
};
