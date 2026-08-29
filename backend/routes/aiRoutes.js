const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to communicate with the Python FastAPI Line Balancing Engine
router.post('/optimize-line', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8000/api/balance-line', req.body);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ 
            error: 'AI Engine communication failed', 
            details: err.message 
        });
    }
});

// Simulated AI Tech Pack & Cost Optimization Parser (Your existing route)
router.post('/parse-techpack', async (req, res) => {
  try {
    const { techPackText } = req.body;
    
    // Here we simulate AI parsing and optimization
    const parsedData = {
      styleName: "Slim Fit Denim V3",
      suggestedFabricConsumption: "1.42 yds", // Optimized by AI
      estimatedCostPerPcs: "$4.85",
      riskFactors: ["Zimmer zipper lead time is tight", "Fabric shade variance expected"],
      aiRecommendations: [
        "Switch to local supplier for trims to save 2 days lead time.",
        "Adjust marker spacing to reduce fabric waste by 2.4%."
      ]
    };

    res.status(200).json({
      success: true,
      message: "Tech Pack successfully parsed and optimized by AI.",
      data: parsedData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;