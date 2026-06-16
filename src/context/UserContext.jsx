// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { calculateCarbonFootprint } from '../utils/carbonCalculator';

export const UserContext = createContext();

const DEFAULT_INPUTS = {
  location: 'GL',
  householdSize: 1,
  electricity: 250, // kWh/mo
  gas: 40, // m3/mo
  oil: 0, // liters/mo
  carType: 'petrol',
  carDistance: 120, // km/wk
  publicTransitBus: 20, // km/wk
  publicTransitTrain: 30, // km/wk
  flightShort: 2, // flights/yr
  flightLong: 0, // flights/yr
  diet: 'medium_meat',
  consumption: 'average',
  recycling: 'partial'
};

export const UserProvider = ({ children }) => {
  const [calculatorInputs, setCalculatorInputs] = useState(() => {
    const saved = localStorage.getItem('ecoverse_inputs');
    return saved ? JSON.parse(saved) : DEFAULT_INPUTS;
  });

  const [footprintResult, setFootprintResult] = useState(() => {
    return calculateCarbonFootprint(calculatorInputs);
  });

  const [hasCompletedWizard, setHasCompletedWizard] = useState(() => {
    return localStorage.getItem('ecoverse_wizard_completed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ecoverse_inputs', JSON.stringify(calculatorInputs));
    const result = calculateCarbonFootprint(calculatorInputs);
    setFootprintResult(result);
  }, [calculatorInputs]);

  const updateInputs = (newInputs) => {
    setCalculatorInputs(prev => ({
      ...prev,
      ...newInputs
    }));
  };

  const completeWizard = () => {
    setHasCompletedWizard(true);
    localStorage.setItem('ecoverse_wizard_completed', 'true');
  };

  const resetUser = () => {
    setCalculatorInputs(DEFAULT_INPUTS);
    setHasCompletedWizard(false);
    localStorage.removeItem('ecoverse_wizard_completed');
    localStorage.removeItem('ecoverse_inputs');
  };

  return (
    <UserContext.Provider value={{
      calculatorInputs,
      footprintResult,
      hasCompletedWizard,
      updateInputs,
      completeWizard,
      resetUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
