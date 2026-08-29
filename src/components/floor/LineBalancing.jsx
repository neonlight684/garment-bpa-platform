import React, { useState } from 'react';
import axios from 'axios';

export default function LineBalancing() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    try {
      // Calling your backend proxy route which connects to Python FastAPI
      const response = await axios.post('/api/optimize-line', {
        workers: 20,
        target_output: 1000,
        smv: 18.5
      });
      setResult(response.data);
    } catch (err) {
      setError('Failed to fetch AI Line Balancing optimization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>AI-Powered Line Balancing Engine</h2>
      <p>Compute optimal worker allocations and output targets for your sewing lines.</p>
      
      <button 
        onClick={handleOptimize} 
        style={{ padding: '10px 20px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Optimizing Line...' : 'Run AI Line Optimization'}
      </button>

      {error && <p style={{ color: '#ef4444', marginTop: '10px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1e1b4b', borderRadius: '8px' }}>
          <h3>Optimization Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}