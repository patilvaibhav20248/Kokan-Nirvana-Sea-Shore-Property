import React, { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global Error Caught by Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px 20px', 
          maxWidth: '600px', 
          margin: '60px auto', 
          fontFamily: 'system-ui, -apple-system, sans-serif', 
          textAlign: 'center', 
          backgroundColor: '#ffffff', 
          borderRadius: '24px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e7e5e4'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌊</div>
          <h2 style={{ color: '#451a03', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Kokan Nirvana Sea Shore Property
          </h2>
          <p style={{ color: '#78716c', fontSize: '14px', marginBottom: '20px' }}>
            We encountered a temporary rendering issue. Click below to reload cleanly.
          </p>
          <pre style={{ 
            background: '#fef2f2', 
            color: '#991b1b', 
            padding: '14px', 
            borderRadius: '12px', 
            fontSize: '12px', 
            textAlign: 'left', 
            overflowX: 'auto', 
            marginBottom: '24px',
            border: '1px solid #fecaca'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => {
              localStorage.removeItem('kokan_nirvana_liked_properties');
              window.location.reload();
            }} 
            style={{ 
              backgroundColor: '#451a03', 
              color: '#ffffff', 
              border: 'none', 
              padding: '12px 28px', 
              borderRadius: '12px', 
              cursor: 'pointer', 
              fontWeight: 'bold', 
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(69,26,3,0.2)'
            }}
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error("Root element #root not found in document");
}
