// src/components/common/Select.jsx
import React from 'react';

export const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  required = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginBottom: '1rem' }} className={className}>
      {label && (
        <label htmlFor={id} style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}
      
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: 'var(--bg-secondary)',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--glass-border)'}`,
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
        className="custom-select"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            {opt.label}
          </option>
        ))}
      </select>
      
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
  const styleId = 'custom-select-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .custom-select:focus {
        border-color: var(--primary-light) !important;
        box-shadow: 0 0 10px var(--primary-glow) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

export default Select;
