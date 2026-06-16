// src/App.jsx
import React from 'react';
import { UserProvider } from './context/UserContext';
import { EcoVerseProvider } from './context/EcoVerseContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import './styles/dashboard.css';

function App() {
  return (
    <UserProvider>
      <EcoVerseProvider>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
        </div>
      </EcoVerseProvider>
    </UserProvider>
  );
}

export default App;
