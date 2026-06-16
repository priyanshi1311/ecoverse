// src/data/sampleScenarios.js

export const sampleScenarios = [
  {
    id: "scen-student",
    name: "Eco-Friendly Student",
    description: "Vegan diet, uses public transport, lives in a shared flat, low consumption.",
    values: {
      location: "EU",
      householdSize: 3,
      electricity: 100, // kWh/mo
      gas: 20, // m3/mo
      oil: 0,
      carType: "electric",
      carDistance: 0, // km/wk
      publicTransitBus: 80, // km/wk
      publicTransitTrain: 120, // km/wk
      flightShort: 0, // flights/yr
      flightLong: 0, // flights/yr
      diet: "vegan",
      consumption: "thrifty",
      recycling: "full"
    },
    calculatedFootprint: 1.45 // in tonnes
  },
  {
    id: "scen-suburban",
    name: "Suburban Family",
    description: "Average meat consumption, heating gas, 2 gasoline cars, average purchases.",
    values: {
      location: "US",
      householdSize: 4,
      electricity: 900,
      gas: 150,
      oil: 0,
      carType: "petrol",
      carDistance: 450,
      publicTransitBus: 10,
      publicTransitTrain: 0,
      flightShort: 4,
      flightLong: 1,
      diet: "medium_meat",
      consumption: "average",
      recycling: "partial"
    },
    calculatedFootprint: 14.85
  },
  {
    id: "scen-executive",
    name: "Jet-Setter Corporate",
    description: "Heavy meat eater, luxury fossil fuel vehicle, high consumption, frequent flights.",
    values: {
      location: "US",
      householdSize: 2,
      electricity: 1400,
      gas: 250,
      oil: 50,
      carType: "petrol",
      carDistance: 700,
      publicTransitBus: 0,
      publicTransitTrain: 0,
      flightShort: 12,
      flightLong: 6,
      diet: "heavy_meat",
      consumption: "shopper",
      recycling: "none"
    },
    calculatedFootprint: 29.54
  }
];
