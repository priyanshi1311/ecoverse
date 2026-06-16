// src/services/aiService.js

export const aiService = {
  /**
   * Generates a personalized AI analysis report of the user's carbon profile.
   */
  generateProfileReport: (inputs, score, comparison) => {
    const { diet, carType, carDistance, flightShort, flightLong } = inputs;
    
    // Analyze primary drivers
    const drivers = [];
    if (inputs.electricity > 400 || inputs.gas > 100) drivers.push("home utility heating and power");
    if (Number(carDistance) > 200 && (carType === 'petrol' || carType === 'diesel')) drivers.push("daily gasoline commuting");
    if (Number(flightShort) + Number(flightLong) > 3) drivers.push("frequent aviation travel");
    if (diet === 'heavy_meat' || diet === 'medium_meat') drivers.push("meat-intensive food consumption");

    const driverListText = drivers.length > 0 
      ? drivers.slice(0, -1).join(", ") + (drivers.length > 1 ? " and " : "") + drivers[drivers.length - 1]
      : "general shopping and miscellaneous activities";

    // Dynamic AI response text
    const greeting = `### 🌿 EcoVerse AI Carbon Evaluation Report
    
Based on your energy, transport, and dietary habits, your carbon score is **${score.score}/100** with a rating of **${score.label}**. Here is a tailored breakdown of your climate footprint and actionable mitigation paths:`;

    const summary = `
#### Key Emission Driver
* Your primary carbon drivers stem from **${driverListText}**.
* Compared to the **${comparison.regionName}** average of **${comparison.regionalAverage} tonnes**, you emit **${Math.abs(comparison.difference)} tonnes** ${comparison.isHigher ? 'more' : 'less'} carbon annually.
* To meet the Paris Climate Accord target, individual footprints should ideally not exceed **${score.benchmarkTarget} tonnes** annually.`;

    const dynamicAdvice = `
#### Tailored Action Recommendations
${inputs.electricity > 300 
  ? `* **Clean Power Switch**: Since your utility footprint is elevated, transitioning to a green energy tariff or solar panels would single-handedly slash your home emissions. Check if your state provides net-metering incentives.` 
  : `* **Energy Efficiency**: Your home electricity use is efficient! Maintain this by installing smart power strips to eliminate phantom power drain.`
}
${Number(carDistance) > 150 
  ? `* **Transit Alternatives**: With a weekly commute of **${carDistance} km**, switching even two days of driving to train/bus transit, or swapping to an EV when you next upgrade, could reduce transportation emissions by up to 50%.` 
  : `* **Low Transit Footprint**: Your commuting emissions are minimal. Keep walking or cycling to keep local air quality clean!`
}
${diet === 'heavy_meat' || diet === 'medium_meat'
  ? `* **Plant-Based Increments**: Animal agriculture is a massive greenhouse gas source. Introducing one or two plant-based days weekly (like 'Meatless Mondays') can shrink your diet's carbon footprint by 15-20% and lower water footprints.`
  : `* **Eco-Friendly Diet**: Your ${diet}-focused diet is highly sustainable! Supporting local organic farms can further reduce food-mile distribution emissions.`
}
${Number(flightShort) + Number(flightLong) > 0
  ? `* **Aviation Offsetting**: Flying is carbon-dense. For essential flights, consider using modern gold-standard offset projects, or explore train alternatives for short-haul trips under 4 hours.`
  : `* **Aviation Avoidance**: You avoided commercial flights this year, which is one of the most effective ways to prevent high-altitude carbon venting.`
}`;

    const pathForward = `
#### 🎯 Predictive Summary
By implementing our recommended options, our simulator estimates you can reduce your emissions by **up to 40%**, lifting your sustainability rating to **Eco-Conscious** and drawing closer to the climate goal of **2.0 tonnes** of $CO_2e$.`;

    return [greeting, summary, dynamicAdvice, pathForward].join("\n");
  }
};
