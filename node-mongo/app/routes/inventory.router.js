module.exports = function(app) {
  var inventories = require('../controllers/inventory.controller.js');

  app.post('/api/inventories', inventories.createInventory);
  app.get('/api/inventories/:inventoryId', inventories.getInventory);
  app.get('/api/inventories', inventories.inventories);
  app.put('/api/inventory', inventories.updateInventory);
  app.delete('/api/inventory', inventories.deleteInventory);
};