const express = require('express');
const router = express.Router();

const { analyzeMessage } = require('../controllers/moderationController');


router.post('/analyze', analyzeMessage);

router.post('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;