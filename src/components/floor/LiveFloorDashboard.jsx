import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function LiveFloorDashboard() {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    socket.on('iot_floor_update', (message) => {
      setLiveData((prev) => [message, ...prev.slice(0, 9)]);
    });

    return () => {
      socket.off('iot_floor_update');
    };
  }, []);

  return (
    <div style={{ padding: '20px', color: '#fff', background: '#090d16', minHeight: '80vh', borderRadius: '12px', border: '1px solid #1e293b' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: '#4ade80' }}>Real-Time Factory Floor IoT Stream</h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Listening for live telemetry data from sewing lines and RFID checkpoints...</p>
      
      <div>
        {liveData.length === 0 ? (
          <p style={{ color: '#64748b', fontStyle: 'italic' }}>Waiting for incoming telemetry events from MQTT broker...</p>
        ) : (
          liveData.map((item, index) => (
            <div key={index} style={{ background: '#1e293b', padding: '15px', marginBottom: '12px', borderRadius: '8px', borderLeft: '4px solid #4ade80' }}>
              <strong>Topic:</strong> <span style={{ color: '#60a5fa' }}>{item.topic}</span> <br />
              <strong>Payload:</strong> {JSON.stringify(item.data)} <br />
              <small style={{ color: '#94a3b8' }}>Timestamp: {new Date(item.timestamp).toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}