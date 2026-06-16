// src/components/common/Modal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // 'sm', 'md', 'lg'
  footer = null
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeWidths = {
    sm: '400px',
    md: '600px',
    lg: '800px'
  };

  const modalWidth = sizeWidths[size] || sizeWidths.md;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(5, 6, 8, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'modal-fade-in 0.25s ease-out'
    }} onClick={onClose}>
      
      {/* Modal Container */}
      <div 
        style={{
          width: '90%',
          maxWidth: modalWidth,
          background: 'rgba(20, 22, 28, 0.85)',
          backdropFilter: 'var(--backdrop-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--glass-shadow)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
          animation: 'modal-slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px var(--spacing-lg)',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'color var(--transition-fast)'
            }}
            className="modal-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          padding: 'var(--spacing-lg)',
          overflowY: 'auto',
          flex: 1
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px var(--spacing-lg)',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Add standard animation keyframes
if (typeof document !== 'undefined') {
  const styleId = 'modal-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes modal-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes modal-slide-up {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .modal-close-btn:hover {
        color: var(--color-danger) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

export default Modal;
