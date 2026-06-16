// src/utils/carbonCalculator.js
import factors from '../data/emissionFactors.json';

/**
 * Calculates the annual carbon footprint in metric tonnes of CO2e.
 * 
 * @param {Object} inputs - User inputs from the wizard or simulator.
 * @returns {Object} - Footprint breakdown and total footprint.
 */
export const calculateCarbonFootprint = (inputs) => {
  const {
    householdSize = 1,
    electricity = 0,
    gas = 0,
    oil = 0,
    carType = 'petrol',
    carDistance = 0,
    publicTransitBus = 0,
    publicTransitTrain = 0,
    flightShort = 0,
    flightLong = 0,
    diet = 'medium_meat',
    consumption = 'average',
    recycling = 'partial'
  } = inputs;

  // 1. Home Energy (shared by household size, annualized: * 12)
  const electricityFootprint = ((Number(electricity) * 12) / Number(householdSize)) * factors.energy.electricity_per_kwh;
  const gasFootprint = ((Number(gas) * 12) / Number(householdSize)) * factors.energy.gas_per_m3;
  const oilFootprint = ((Number(oil) * 12) / Number(householdSize)) * factors.energy.oil_per_liter;
  const energyTotal = electricityFootprint + gasFootprint + oilFootprint;

  // 2. Transportation (personal, annualized: * 52)
  const carFactor = factors.transportation.car_types[carType] || factors.transportation.car_types.petrol;
  const carFootprint = Number(carDistance) * 52 * carFactor;
  
  const busFootprint = Number(publicTransitBus) * 52 * factors.transportation.public_transit.bus;
  const trainFootprint = Number(publicTransitTrain) * 52 * factors.transportation.public_transit.train;
  
  // Assume short flight ~ 800 km, long flight ~ 7000 km
  const shortFlightFootprint = Number(flightShort) * 800 * factors.transportation.flights.short_haul;
  const longFlightFootprint = Number(flightLong) * 7000 * factors.transportation.flights.long_haul;
  
  const transportTotal = carFootprint + busFootprint + trainFootprint + shortFlightFootprint + longFlightFootprint;

  // 3. Diet (annualized per person)
  const dietFootprint = factors.diet[diet] || factors.diet.medium_meat;

  // 4. Consumption / Shopping
  const consumptionFootprint = factors.consumption[consumption] || factors.consumption.average;

  // 5. Offsets / Recycling
  let recyclingOffset = 0;
  if (recycling === 'full') {
    recyclingOffset = factors.offsets.recycling_full; // negative value in json (-0.4)
  } else if (recycling === 'partial') {
    recyclingOffset = factors.offsets.recycling_partial; // negative value in json (-0.2)
  }

  // Calculate Subtotals
  const totalRaw = energyTotal + transportTotal + dietFootprint + consumptionFootprint + recyclingOffset;
  const total = Math.max(0.1, Number(totalRaw.toFixed(2))); // Floor at 0.1 tonnes

  return {
    breakdown: {
      energy: Number(energyTotal.toFixed(2)),
      transport: Number(transportTotal.toFixed(2)),
      diet: Number(dietFootprint.toFixed(2)),
      consumption: Number(consumptionFootprint.toFixed(2)),
      offset: Number(recyclingOffset.toFixed(2))
    },
    total,
    details: {
      electricity: Number(electricityFootprint.toFixed(2)),
      gas: Number(gasFootprint.toFixed(2)),
      oil: Number(oilFootprint.toFixed(2)),
      car: Number(carFootprint.toFixed(2)),
      transit: Number((busFootprint + trainFootprint).toFixed(2)),
      flights: Number((shortFlightFootprint + longFlightFootprint).toFixed(2))
    }
  };
};
