// src/pages/Home.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Leaf, 
  Home as HomeIcon, 
  Car, 
  Apple, 
  CheckCircle,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { UserContext } from '../context/UserContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Loader from '../components/common/Loader';

export const Home = () => {
  const { calculatorInputs, updateInputs, completeWizard } = useContext(UserContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      setLoading(true);
      // Simulate carbon compilation latency
      setTimeout(() => {
        setLoading(false);
        completeWizard();
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // Choice Cards Selection Handlers
  const handleSelectDiet = (dietVal) => {
    updateInputs({ diet: dietVal });
  };

  const handleSelectCar = (carVal) => {
    updateInputs({ carType: carVal });
  };

  const handleSelectRecycling = (recVal) => {
    updateInputs({ recycling: recVal });
  };

  const handleSelectConsumption = (consVal) => {
    updateInputs({ consumption: consVal });
  };

  if (loading) {
    return <Loader fullPage size="lg" text="Analyzing emissions profiles & loading benchmark targets..." />;
  }

  // Region Choices
  const regionOptions = [
    { value: 'GL', label: 'Global Average' },
    { value: 'US', label: 'United States' },
    { value: 'EU', label: 'European Union' },
    { value: 'IN', label: 'India' }
  ];

  return (
    <div className="page-container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) 0' }}>
      
      {/* Wizard Header Progress */}
      <div className="wizard-header">
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>
          Calculate Your <span className="text-gradient">Eco Footprint</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Complete 4 quick stages to measure your environmental impact.
        </p>

        {/* Custom Progress Bar */}
        <div className="wizard-progress-bar">
          <div className="wizard-progress-line" />
          <div 
            className="wizard-progress-line-fill" 
            style={{ width: `${((step - 1) / 3) * 100}%` }} 
          />
          
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`wizard-progress-step ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
            >
              {step > s ? <CheckCircle size={16} /> : s}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Panels */}
      <div className="glass-panel" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div className="wizard-step-content">
          
          {/* STEP 1: PERSONAL PROFILE */}
          {step === 1 && (
            <div>
              <h2 className="wizard-step-title">
                <Leaf size={22} style={{ color: 'var(--primary-light)' }} /> Personal Profile
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                Your baseline calculations are calibrated relative to national carbon averages and targets.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                <Select
                  label="Select Region / Country"
                  id="location"
                  value={calculatorInputs.location}
                  onChange={(e) => updateInputs({ location: e.target.value })}
                  options={regionOptions}
                />
                
                <Input
                  label="Household Size (People)"
                  id="householdSize"
                  type="number"
                  min="1"
                  max="20"
                  value={calculatorInputs.householdSize}
                  onChange={(e) => updateInputs({ householdSize: e.target.value })}
                  suffix="people"
                  required
                />
              </div>
            </div>
          )}

          {/* STEP 2: HOME ENERGY */}
          {step === 2 && (
            <div>
              <h2 className="wizard-step-title">
                <HomeIcon size={22} style={{ color: 'var(--primary-light)' }} /> Home Utility Energy
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                Utility energy is shared across household members, reducing your individual footprint contribution.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <Input
                  label="Electricity Usage"
                  id="electricity"
                  type="number"
                  min="0"
                  value={calculatorInputs.electricity}
                  onChange={(e) => updateInputs({ electricity: e.target.value })}
                  suffix="kWh/mo"
                />
                
                <Input
                  label="Natural Gas"
                  id="gas"
                  type="number"
                  min="0"
                  value={calculatorInputs.gas}
                  onChange={(e) => updateInputs({ gas: e.target.value })}
                  suffix="m³ / mo"
                />

                <Input
                  label="Heating Oil"
                  id="oil"
                  type="number"
                  min="0"
                  value={calculatorInputs.oil}
                  onChange={(e) => updateInputs({ oil: e.target.value })}
                  suffix="L / mo"
                  className="col-12"
                />
              </div>
            </div>
          )}

          {/* STEP 3: MOBILITY & TRAVEL */}
          {step === 3 && (
            <div>
              <h2 className="wizard-step-title">
                <Car size={22} style={{ color: 'var(--secondary-light)' }} /> Mobility & Transit
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                Select your vehicle fuel type and weekly distance driven, plus public transit and flights.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                
                {/* Vehicle Choice Cards */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Car Fuel Type</label>
                  <div className="card-selector-grid">
                    {[
                      { val: 'petrol', label: 'Gasoline' },
                      { val: 'diesel', label: 'Diesel' },
                      { val: 'hybrid', label: 'Hybrid' },
                      { val: 'electric', label: 'Electric' }
                    ].map((car) => (
                      <div 
                        key={car.val} 
                        onClick={() => handleSelectCar(car.val)}
                        className={`card-option ${calculatorInputs.carType === car.val ? 'selected' : ''}`}
                      >
                        <Car size={20} className="card-option-icon" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{car.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                  <Input
                    label="Car Mileage"
                    id="carDistance"
                    type="number"
                    min="0"
                    value={calculatorInputs.carDistance}
                    onChange={(e) => updateInputs({ carDistance: e.target.value })}
                    suffix="km/wk"
                  />

                  <Input
                    label="Bus Transit"
                    id="publicTransitBus"
                    type="number"
                    min="0"
                    value={calculatorInputs.publicTransitBus}
                    onChange={(e) => updateInputs({ publicTransitBus: e.target.value })}
                    suffix="km/wk"
                  />
                  
                  <Input
                    label="Short flights (< 3hr)"
                    id="flightShort"
                    type="number"
                    min="0"
                    value={calculatorInputs.flightShort}
                    onChange={(e) => updateInputs({ flightShort: e.target.value })}
                    suffix="flights/yr"
                  />
                  
                  <Input
                    label="Long flights (> 3hr)"
                    id="flightLong"
                    type="number"
                    min="0"
                    value={calculatorInputs.flightLong}
                    onChange={(e) => updateInputs({ flightLong: e.target.value })}
                    suffix="flights/yr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DIET & CONSUMPTION */}
          {step === 4 && (
            <div>
              <h2 className="wizard-step-title">
                <Apple size={22} style={{ color: 'var(--accent-light)' }} /> Diet & Shopping Habits
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                Food and consumer purchasing constitute over 30% of global greenhouse emissions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {/* Diet choices */}
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Primary Diet Style</label>
                  <div className="card-selector-grid">
                    {[
                      { val: 'vegan', label: 'Vegan' },
                      { val: 'vegetarian', label: 'Vegetarian' },
                      { val: 'medium_meat', label: 'Moderate Meat' },
                      { val: 'heavy_meat', label: 'Heavy Meat' }
                    ].map((dietOpt) => (
                      <div 
                        key={dietOpt.val} 
                        onClick={() => handleSelectDiet(dietOpt.val)}
                        className={`card-option ${calculatorInputs.diet === dietOpt.val ? 'selected' : ''}`}
                      >
                        <Apple size={20} className="card-option-icon" />
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{dietOpt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                  {/* Shopping level */}
                  <Select
                    label="Shopping & Purchasing level"
                    id="consumption"
                    value={calculatorInputs.consumption}
                    onChange={(e) => updateInputs({ consumption: e.target.value })}
                    options={[
                      { value: 'thrifty', label: 'Minimal / Secondhand focus' },
                      { value: 'average', label: 'Average consumer' },
                      { value: 'shopper', label: 'Excessive / Retail buyer' }
                    ]}
                  />

                  {/* Recycling level */}
                  <Select
                    label="Recycling Habits"
                    id="recycling"
                    value={calculatorInputs.recycling}
                    onChange={(e) => updateInputs({ recycling: e.target.value })}
                    options={[
                      { value: 'full', label: 'Full recycling & composting' },
                      { value: 'partial', label: 'Partial recycling' },
                      { value: 'none', label: 'No recycling / Landfill' }
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Buttons footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '20px'
        }}>
          <Button
            variant="glass"
            onClick={handleBack}
            disabled={step === 1}
            icon={ArrowLeft}
          >
            Back
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            icon={step === 4 ? CheckCircle : ArrowRight}
          >
            {step === 4 ? 'Evaluate Footprint' : 'Next Step'}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Home;
