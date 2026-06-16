// src/components/common/Input.jsx
import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = '',
  suffix = '',
  min,
  max,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginBottom: '1rem' }} className={className}>
      {label && (
        <label htmlFor={id} style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          style={{
            width: '100%',
            padding: '10px 14px',
            paddingRight: suffix ? '50px' : '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${error ? 'var(--color-danger)' : 'var(--glass-border)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            transition: 'all var(--transition-fast)'
          }}
          className="custom-input"
          {...props}
        />
        
        {suffix && (
          <span style={{
            position: 'absolute',
            right: '14px',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: '500',
            pointerEvents: 'none'
          }}>
            {suffix}
          </span>
        )}
      </div>
      
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--color-danger)', marginTop: '2px' }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Add active/focus styles
if (typeof document !== 'undefined') {
  const styleId = 'custom-input-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .custom-input:focus {
        border-color: var(--primary-light) !important;
        background-color: rgba(255, 255, 255, 0.06) !important;
        box-shadow: 0 0 10px var(--primary-glow) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

export default Input;
