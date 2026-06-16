// src/components/common/Button.jsx
import React from 'react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'glass'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
    outline: 'none',
    opacity: disabled ? 0.6 : 1
  };

  // Variants styling
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: 'var(--text-primary)',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
      border: '1px solid var(--primary-light)'
    },
    secondary: {
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--glass-border)'
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: 'var(--text-primary)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
    },
    glass: {
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--backdrop-blur)',
      border: '1px solid var(--glass-border)',
      color: 'var(--text-primary)'
    }
  };

  // Sizes styling
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.85rem' },
    md: { padding: '10px 20px', fontSize: '0.95rem' },
    lg: { padding: '14px 28px', fontSize: '1.05rem', borderRadius: 'var(--radius-lg)' }
  };

  const currentVariantStyle = variantStyles[variant] || variantStyles.primary;
  const currentSizeStyle = sizeStyles[size] || sizeStyles.md;

  // Hover styles (only applied if not disabled)
  const hoverClass = disabled ? '' : `btn-hover-${variant}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...currentVariantStyle, ...currentSizeStyle }}
      className={`custom-btn ${hoverClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
    </button>
  );
};

// Add standard hover animations using inline style override hacks or classes
// We'll inject style block rules for hover effects since we're using vanilla CSS
if (typeof document !== 'undefined') {
  const styleId = 'custom-btn-hover-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .custom-btn:not(:disabled):hover {
        transform: translateY(-1px);
        filter: brightness(1.1);
      }
      .custom-btn:not(:disabled):active {
        transform: translateY(1px);
      }
      .btn-hover-primary:hover {
        box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
      }
      .btn-hover-glass:hover {
        border-color: var(--glass-border-focus);
        box-shadow: var(--glass-glow);
      }
    `;
    document.head.appendChild(style);
  }
}

export default Button;
