// src/components/ai/AIRecommendation.jsx
import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Sparkles, RefreshCw } from 'lucide-react';
import { useSustainabilityScore } from '../../hooks/useSustainabilityScore';
import { aiService } from '../../services/aiService';
import Button from '../common/Button';

export const AIRecommendation = ({ inputs }) => {
  const { scoreDetails, regionalComparison } = useSustainabilityScore();
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const generated = aiService.generateProfileReport(
        inputs,
        { score: scoreDetails?.score || 50, label: scoreDetails?.label || 'Average', benchmarkTarget: 2.0 },
        regionalComparison
      );
      setReport(generated);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (inputs) {
      generateReport();
    }
  }, [inputs]);

  // A very simple markdown-like renderer to parse our specific reports cleanly
  const renderFormattedReport = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('###')) {
        return (
          <h3 key={idx} style={{ 
            fontSize: '1.2rem', 
            fontWeight: '800', 
            color: 'var(--primary-light)', 
            marginTop: '1.5rem', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} /> {trimmed.replace('###', '').trim()}
          </h3>
        );
      }
      
      if (trimmed.startsWith('####')) {
        return (
          <h4 key={idx} style={{ 
            fontSize: '1.05rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)', 
            marginTop: '1.2rem', 
            marginBottom: '0.4rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: '4px'
          }}>
            {trimmed.replace('####', '').trim()}
          </h4>
        );
      }
      
      if (trimmed.startsWith('*')) {
        // Find bold markers **
        const parts = trimmed.replace('*', '').trim().split('**');
        return (
          <li key={idx} style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)', 
            marginLeft: '1rem', 
            marginBottom: '0.5rem',
            listStyleType: 'square'
          }}>
            {parts.map((part, pIdx) => {
              // Odd indices are bolded
              return pIdx % 2 === 1 ? <strong key={pIdx} style={{ color: 'var(--text-primary)' }}>{part}</strong> : part;
            })}
          </li>
        );
      }

      if (trimmed === '') return <div key={idx} style={{ height: '8px' }} />;

      return (
        <p key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="glass-panel" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      
      {/* Panel Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={18} style={{ color: 'var(--primary-light)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            ECOVERSE AI ASSISTANT
          </span>
        </div>
        
        <Button variant="glass" size="sm" onClick={generateReport} disabled={loading} icon={RefreshCw}>
          {loading ? 'Analyzing...' : 'Recalculate'}
        </Button>
      </div>

      {/* Report Panel */}
      <div style={{
        background: 'rgba(5, 6, 8, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        minHeight: '280px',
        maxHeight: '450px',
        overflowY: 'auto',
        fontFamily: 'inherit',
        position: 'relative'
      }}>
        {loading ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: 'rgba(10, 11, 14, 0.8)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--radius-md)'
          }}>
            <Terminal size={32} style={{ color: 'var(--primary-light)', animation: 'loader-pulse 1.2s infinite' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Parsing carbon footprint nodes...
            </span>
          </div>
        ) : null}

        {renderFormattedReport(report)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <Sparkles size={10} style={{ color: 'var(--primary-light)' }} />
        <span>Generated client-side via EcoVerse heuristic prediction models.</span>
      </div>

    </div>
  );
};

export default AIRecommendation;
