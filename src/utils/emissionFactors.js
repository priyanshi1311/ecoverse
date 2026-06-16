// src/utils/emissionFactors.js
import factors from '../data/emissionFactors.json';

export const getEnergyFactors = () => factors.energy;
export const getTransportationFactors = () => factors.transportation;
export const getDietFactors = () => factors.diet;
export const getConsumptionFactors = () => factors.consumption;
export const getOffsetFactors = () => factors.offsets;

export default factors;
