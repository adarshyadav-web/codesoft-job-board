const express = require('express');
const { testGetController } = require('../controllers/testController');
const router = express.Router();

// Test route to check if the server is running
router.post('/test-post', testGetController);

module.exports = router;