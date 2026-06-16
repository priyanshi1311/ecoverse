// src/utils/recommendationEngine.js
import factors from '../data/emissionFactors.json';

/**
 * Generates custom carbon reduction recommendations based on user answers.
 * 
 * @param {Object} inputs - User calculator inputs.
 * @returns {Array<Object>} - Actionable reduction plans with estimated annual savings.
 */
export const generateRecommendations = (inputs) => {
  const {
    householdSize = 1,
    electricity = 0,
    gas = 0,
    carDistance = 0,
    carType = 'petrol',
    flightShort = 0,
    flightLong = 0,
    diet = 'medium_meat',
    consumption = 'average',
    recycling = 'partial'
  } = inputs;

  const recommendations = [];

  // 1. Home Energy Recommendations
  if (Number(electricity) > 200) {
    const solarSavings = (Number(electricity) * 12 * 0.7 * factors.energy.electricity_per_kwh) / Number(householdSize); // Assume solar offsets 70% of electricity
    recommendations.push({
      id: "rec-solar",
      title: "Transition to Solar Panels",
      description: "Install solar panels on your rooftop to generate clean, renewable electricity.",
      impact: Number(solarSavings.toFixed(2)),
      difficulty: "Hard",
      cost: "$$$",
      category: "energy",
      metricToModify: "electricity",
      simulatorReduction: 0.7 // offsets 70% of electricity
    });

    const ledSavings = (Number(electricity) * 12 * 0.15 * factors.energy.electricity_per_kwh) / Number(householdSize); // Assume LED saves 15% of electricity
    recommendations.push({
      id: "rec-led",
      title: "Switch to LED Lighting & Smart Outlets",
      description: "Replace standard halogen bulbs with highly energy-efficient LEDs and turn off standby devices.",
      impact: Number(ledSavings.toFixed(2)),
      difficulty: "Easy",
      cost: "$",
      category: "energy",
      metricToModify: "electricity",
      simulatorReduction: 0.15
    });
  }

  if (Number(gas) > 50) {
    const heatPumpSavings = (Number(gas) * 12 * 0.8 * factors.energy.gas_per_m3) / Number(householdSize); // Assume heat pump replaces 80% gas
    recommendations.push({
      id: "rec-heat-pump",
      title: "Install a Smart Thermostat & Electric Heat Pump",
      description: "Transition home heating from fossil-fuel natural gas to an electric heat pump, managed via a smart thermostat.",
      impact: Number(heatPumpSavings.toFixed(2)),
      difficulty: "Hard",
      cost: "$$$",
      category: "energy",
      metricToModify: "gas",
      simulatorReduction: 0.8
    });
  }

  // 2. Transportation Recommendations
  if (Number(carDistance) > 100) {
    if (carType === 'petrol' || carType === 'diesel') {
      const evSavings = Number(carDistance) * 52 * (factors.transportation.car_types[carType] - factors.transportation.car_types.electric);
      recommendations.push({
        id: "rec-ev",
        title: "Transition to an Electric Vehicle",
        description: "Swap your standard fossil fuel car for a hybrid or fully electric vehicle.",
        impact: Number(evSavings.toFixed(2)),
        difficulty: "Hard",
        cost: "$$$",
        category: "transport",
        metricToModify: "carType",
        simulatorNewValue: "electric"
      });
    }

    const transitSavings = Number(carDistance) * 52 * 0.3 * (factors.transportation.car_types[carType] - factors.transportation.public_transit.train);
    recommendations.push({
      id: "rec-transit",
      title: "Replace 30% of Car Trips with Public Transit",
      description: "Utilize rail, subway, or bus routes instead of personal car journeys for local commuting.",
      impact: Number(transitSavings.toFixed(2)),
      difficulty: "Medium",
      cost: "$",
      category: "transport",
      metricToModify: "carDistance",
      simulatorReduction: 0.3
    });
  }

  // 3. Flights Recommendations
  if (Number(flightShort) > 0 || Number(flightLong) > 0) {
    const totalFlightCO2 = (Number(flightShort) * 800 * factors.transportation.flights.short_haul) + 
                         (Number(flightLong) * 7000 * factors.transportation.flights.long_haul);
    const flightSavings = totalFlightCO2 * 0.5; // Cut flights in half
    recommendations.push({
      id: "rec-flight",
      title: "Reduce Air Travel by 50%",
      description: "Substitute business meetings with video conferencing and opt for local vacation destinations accessible by train.",
      impact: Number(flightSavings.toFixed(2)),
      difficulty: "Medium",
      cost: "Free",
      category: "transport",
      metricToModify: "flights", // Custom behavior in simulator
      simulatorReduction: 0.5
    });
  }

  // 4. Food & Diet Recommendations
  if (diet === 'heavy_meat' || diet === 'medium_meat') {
    const targetDiet = diet === 'heavy_meat' ? 'medium_meat' : 'vegetarian';
    const dietSavings = factors.diet[diet] - factors.diet[targetDiet];
    recommendations.push({
      id: "rec-diet",
      title: diet === 'heavy_meat' ? "Reduce Red Meat Consumption" : "Adopt a Vegetarian Diet",
      description: diet === 'heavy_meat' 
        ? "Reduce high-impact red meats (beef, lamb) and swap for poultry, pork, or plant-based proteins."
        : "Swap dairy and meats for plant-based proteins, reducing dietary emissions substantially.",
      impact: Number(dietSavings.toFixed(2)),
      difficulty: "Medium",
      cost: "Free",
      category: "diet",
      metricToModify: "diet",
      simulatorNewValue: targetDiet
    });

    const veganMondaysSavings = (factors.diet[diet] - factors.diet.vegan) * (1 / 7); // One day a week vegan
    recommendations.push({
      id: "rec-vegan-days",
      title: "Implement 'Green Mondays'",
      description: "Commit to eating 100% plant-based (vegan) foods just one day per week.",
      impact: Number(veganMondaysSavings.toFixed(2)),
      difficulty: "Easy",
      cost: "Free",
      category: "diet",
      metricToModify: "diet",
      simulatorNewValue: "vegan_monday" // Special toggle in code
    });
  }

  // 5. Consumption & Recycling Recommendations
  if (consumption === 'shopper') {
    const shoppingSavings = factors.consumption.shopper - factors.consumption.average;
    recommendations.push({
      id: "rec-shopping",
      title: "Mindful Consumerism",
      description: "Embrace a minimalist purchasing philosophy: buy secondhand, rent outfits, and repair gadgets instead of replacing them.",
      impact: Number(shoppingSavings.toFixed(2)),
      difficulty: "Medium",
      cost: "Free",
      category: "consumption",
      metricToModify: "consumption",
      simulatorNewValue: "average"
    });
  }

  if (recycling !== 'full') {
    const currentOffset = recycling === 'partial' ? factors.offsets.recycling_partial : 0;
    const fullOffset = factors.offsets.recycling_full;
    const recyclingSavings = Math.abs(fullOffset - currentOffset);

    recommendations.push({
      id: "rec-recycling",
      title: "Establish Comprehensive Recycling & Composting",
      description: "Recycle plastics, glass, paper, metal, and compost organic food waste to divert it from landfills.",
      impact: Number(recyclingSavings.toFixed(2)),
      difficulty: "Easy",
      cost: "$",
      category: "consumption",
      metricToModify: "recycling",
      simulatorNewValue: "full"
    });
  }

  return recommendations;
};
