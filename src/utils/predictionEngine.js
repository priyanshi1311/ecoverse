// src/utils/predictionEngine.js

/**
 * Predicts and simulates cumulative carbon footprints over a 5-year period.
 * Compare Business-As-Usual (BAU) vs Active Sim Scenario vs Target Goal.
 * 
 * @param {number} currentAnnualFootprint - Current annual footprint in tonnes.
 * @param {number} simulatedAnnualReduction - Annual savings from active simulations/mitigation choices.
 * @param {number} targetGoal - Target target, e.g. 2.0 tonnes.
 * @returns {Array<Object>} - 5-year timeline data for charting.
 */
export const predictCarbonTrajectory = (currentAnnualFootprint, simulatedAnnualReduction, targetGoal = 2.0) => {
  const data = [];
  const years = [2026, 2027, 2028, 2029, 2030];

  years.forEach((year, index) => {
    // Business As Usual: stays flat or slightly increases (0.5% per year due to general consumption increase)
    const bauVal = currentAnnualFootprint * Math.pow(1.005, index);
    
    // Active Scenario: decreases gradually as changes are adopted over time
    // Year 0: current
    // Year 1-4: progressively phase in the active savings
    const adoptionRate = index === 0 ? 0 : index === 1 ? 0.4 : index === 2 ? 0.7 : index === 3 ? 0.9 : 1.0;
    const simulatedVal = Math.max(0.1, currentAnnualFootprint - (simulatedAnnualReduction * adoptionRate));

    // Target Scenario: gradual reduction down to sustainability target (2.0 tonnes) by year 5
    const targetVal = currentAnnualFootprint - ((currentAnnualFootprint - targetGoal) * (index / 4));

    data.push({
      year,
      label: `Year ${index}`,
      bau: Number(bauVal.toFixed(2)),
      simulated: Number(simulatedVal.toFixed(2)),
      target: Number(Math.max(targetGoal, targetVal).toFixed(2))
    });
  });

  return data;
};
