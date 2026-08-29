const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const { handleIoTData } = require('./services/iotService');
const inventoryRoutes = require('./routes/inventoryRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const server = http.createServer(app);

// Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/garment-bpa';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully.'))
.catch((err) => console.error('MongoDB connection error:', err));

// Database connection & Routes mounting
app.use('/api/inventory', inventoryRoutes);
app.use('/api/ai', aiRoutes);

// AI Line Balancing Proxy Route
app.post('/api/optimize-line', async (req, res) => {
  try {
    const aiResponse = await axios.post('http://localhost:8000/optimize-line', req.body);
    res.json(aiResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to communicate with Python AI engine' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Enterprise ERP Server is running...');
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('Client Connected:', socket.id);

  socket.on('floor_data_update', (data) => {
    console.log('Received floor data update from client:', data);
    socket.broadcast.emit('live_floor_broadcast', data);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected:', socket.id);
  });
});

// Initialize IoT MQTT Service Pipeline
handleIoTData(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Enterprise ERP Server is running on port ${PORT}`);
});