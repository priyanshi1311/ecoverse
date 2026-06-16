// src/services/simulationService.js
import factors from '../data/emissionFactors.json';

export const simulationService = {
  /**
   * Calculates carbon savings from custom what-if actions.
   * 
   * @param {Object} simulatorState - User simulation values.
   * @returns {Object} - Breakdown of savings in tonnes.
   */
  calculateSimulatorSavings: (state) => {
    const {
      treesPlanted = 0,
      solarCapacity = 0, // kW
      wasteReducedKg = 0, // per week
      waterSavedLiters = 0 // per day
    } = state;

    // 1. Trees Planted: 1 tree = -22kg CO2 / year
    const treeSavings = Number(treesPlanted) * Math.abs(factors.offsets.tree_plantation_annual);

    // 2. Solar Panels: 1kW offsets approx 1.1 tonnes CO2 / year (assuming it replaces coal grid)
    const solarSavings = Number(solarCapacity) * 1.10;

    // 3. Waste reduction: 1kg/wk = 52kg/yr * factor (approx 0.05 tonnes CO2 offset)
    const wasteSavings = Number(wasteReducedKg) * 52 * 0.001; 

    // 4. Water: Liters saved per day * 365 * factor
    const waterSavings = Number(waterSavedLiters) * 365 * Math.abs(factors.offsets.water_liter_saved);

    const totalSavings = treeSavings + solarSavings + wasteSavings + waterSavings;

    return {
      breakdown: {
        trees: Number(treeSavings.toFixed(3)),
        solar: Number(solarSavings.toFixed(3)),
        waste: Number(wasteSavings.toFixed(3)),
        water: Number(waterSavings.toFixed(3))
      },
      total: Number(totalSavings.toFixed(3))
    };
  }
};
