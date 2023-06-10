const express = require('express');
const scrapeController = require('../controllers/scrapeController');

const router = express.Router();

router.get('/api/scrape', scrapeController.scrape);

module.exports = router;
