const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, index: true },
  warehouseName: { type: String, required: true },
  sku: { type: String, required: true },
  itemName: { type: String, required: true }, // e.g., Cotton Fabric, Zippers, Buttons
  category: { type: String, required: true }, // Raw Material, Finished Goods, Accessories
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true }, // pcs, meters, kg
  minStockLevel: { type: Number, default: 100 }, // For alert
  tenantId: { type: String, required: true } // For SaaS User Licensing/Company isolation
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);