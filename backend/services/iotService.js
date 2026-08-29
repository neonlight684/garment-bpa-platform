const mqtt = require('mqtt');

// Connect to MQTT broker (e.g., HiveMQ, Mosquitto, or local broker)
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('Connected to IoT MQTT Broker successfully.');
  // Subscribe to factory floor sensor topics
  client.subscribe('garment/factory/floor/+/sensors', (err) => {
    if (!err) {
      console.log('Subscribed to factory floor sensor topics.');
    }
  });
});

const handleIoTData = (io) => {
  client.on('message', (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      console.log(`Received IoT data from [${topic}]:`, payload);

      // Broadcast live data to all connected frontend clients via Socket.io
      io.emit('iot_floor_update', {
        topic,
        data: payload,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Failed to parse MQTT message:', error);
    }
  });
};

module.exports = { client, handleIoTData };