// src/pages/NotFound.jsx
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <ShieldAlert size={48} style={{ color: 'var(--color-danger)' }} />
        <h2>Page Not Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          The requested dashboard coordinates are outside the active virtual eco-system.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
