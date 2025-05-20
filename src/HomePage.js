import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // State to track hover for nav buttons (by index)
  const [navHover, setNavHover] = useState(null);
  // State to track hover for main buttons (by index)
  const [mainHover, setMainHover] = useState(null);

  const navButtons = [
    { label: 'About', path: '/about' },
    { label: 'Need a Diagnosis?', path: '/App' },
    { label: 'Compare Diagnosis', path: '/newapp' },
  ];

  const mainButtons = [
    { label: 'Need a Diagnosis?', path: '/App' },
    { label: 'Compare Image and Text Based Diagnosis?', path: '/newapp' },
  ];

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000',
      color: '#f0f0f0',
      boxSizing: 'border-box',
      position: 'relative',
      padding: '20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      {/* Top-right navigation buttons */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        display: 'flex',
        gap: '15px',
      }}>
        {navButtons.map((btn, i) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            onMouseEnter={() => setNavHover(i)}
            onMouseLeave={() => setNavHover(null)}
            style={{
              ...navButtonStyle,
              backgroundColor: navHover === i ? '#fff' : '#222',
              color: navHover === i ? '#000' : '#f0f0f0',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '10px',
        fontWeight: 'bold',
        letterSpacing: '2px',
        borderBottom: '3px solid #555',
        paddingBottom: '10px'
      }}>DermaAI - Skin Health Simplified</h1>

      <p style={{
        fontSize: '1.2rem',
        marginBottom: '30px',
        maxWidth: '800px',
        lineHeight: '1.5'
      }}>Your digital companion for personalized skin analysis and health insights.</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {mainButtons.map((btn, i) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            onMouseEnter={() => setMainHover(i)}
            onMouseLeave={() => setMainHover(null)}
            style={{
              ...mainButtonStyle,
              backgroundColor: mainHover === i ? '#fff' : '#333',
              color: mainHover === i ? '#000' : '#f0f0f0',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const navButtonStyle = {
  padding: '8px 12px',
  fontSize: '0.9rem',
  backgroundColor: '#222',
  color: '#f0f0f0',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const mainButtonStyle = {
  padding: '12px 24px',
  fontSize: '1rem',
  backgroundColor: '#333',
  color: '#f0f0f0',
  border: '2px solid #555',
  borderRadius: '8px',
  cursor: 'pointer',
  minWidth: '180px',
};

export default HomePage;
