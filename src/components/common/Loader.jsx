// src/components/common/Loader.jsx
import React from 'react';
import { Leaf } from 'lucide-react';

export const Loader = ({
  size = 'md', // 'sm', 'md', 'lg'
  text = 'Evaluating ecological factors...',
  fullPage = false
}) => {
  const sizeMap = {
    sm: { circle: '30px', icon: 16 },
    md: { circle: '50px', icon: 24 },
    lg: { circle: '80px', icon: 40 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const loaderContent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '24px'
    }}>
      <div style={{
        position: 'relative',
        width: currentSize.circle,
        height: currentSize.circle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Glowing Spinner Ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid rgba(34, 197, 94, 0.1)',
          borderTop: '3px solid var(--primary-light)',
          borderRadius: '50%',
          animation: 'spin 1.2s linear infinite'
        }} />
        
        {/* Leaf Logo inside spinner */}
        <Leaf size={currentSize.icon} style={{ color: 'var(--primary-light)', animation: 'loader-pulse 1.5s ease-in-out infinite' }} />
      </div>
      
      {text && (
        <span style={{
          fontSize: size === 'sm' ? '0.85rem' : '0.95rem',
          color: 'var(--text-secondary)',
          fontWeight: '500',
          letterSpacing: '0.02em'
        }}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

// Inject animations in DOM
if (typeof document !== 'undefined') {
  const styleId = 'loader-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes loader-pulse {
        0%, 100% { transform: scale(0.9); opacity: 0.7; }
        50% { transform: scale(1.1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
}

export default Loader;
