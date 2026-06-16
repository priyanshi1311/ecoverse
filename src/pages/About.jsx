// src/pages/About.jsx
import React from 'react';
import { Award, ShieldAlert, BookOpen, ExternalLink, Leaf } from 'lucide-react';

export const About = () => {
  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
          About <span className="text-gradient">EcoVerse</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Underlying mathematical methodologies, carbon constants, and references.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Card 1: Methodology */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <BookOpen size={20} style={{ color: 'var(--primary-light)' }} /> Methodology & Constants
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
            Our mathematical model calculates emissions in metric tonnes of Carbon Dioxide equivalent (\(CO_2e\)) per year, consolidating $CO_2$, $CH_4$ (Methane), and $N_2O$ (Nitrous Oxide) contributions.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Constants are derived from standard databases published by the **US Environmental Protection Agency (EPA)** and the **IPCC Greenhouse Gas Protocol**. Utility data scales with household size to prevent penalizing shared domiciles.
          </p>
        </div>

        {/* Card 2: Standards Table */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award size={20} style={{ color: 'var(--secondary-light)' }} /> Primary Emission Rates
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Constant Rate Unit</th>
                  <th style={{ padding: '10px' }}>Value (\(t\ CO_2e\))</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px' }}>Grid Electricity</td>
                  <td style={{ padding: '10px' }}>per kWh</td>
                  <td style={{ padding: '10px' }}>0.00038</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px' }}>Natural Gas</td>
                  <td style={{ padding: '10px' }}>per cubic meter</td>
                  <td style={{ padding: '10px' }}>0.00203</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px' }}>Gasoline Vehicle</td>
                  <td style={{ padding: '10px' }}>per km driven</td>
                  <td style={{ padding: '10px' }}>0.00018</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px' }}>Aviation Travel</td>
                  <td style={{ padding: '10px' }}>per passenger km (short)</td>
                  <td style={{ padding: '10px' }}>0.00015</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px' }}>Diet: Vegan</td>
                  <td style={{ padding: '10px' }}>per person per year</td>
                  <td style={{ padding: '10px' }}>1.10</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Diet: Heavy Meat</td>
                  <td style={{ padding: '10px' }}>per person per year</td>
                  <td style={{ padding: '10px' }}>3.30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: Paris Goal Alert */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          background: 'var(--primary-glow)',
          border: '1px solid rgba(76, 175, 80, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px'
        }}>
          <Leaf size={24} style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              The Paris Climate Accord Limit
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              To limit global warming to 1.5°C above pre-industrial levels, the global average footprint per person must drop below **2.0 metric tonnes** annually by 2030. Currently, the global average stands at 4.8 tonnes, with developed nations averaging 10-16 tonnes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
