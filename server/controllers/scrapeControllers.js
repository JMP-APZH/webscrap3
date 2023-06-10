const scraper = require('../utils/scraper');

exports.scrape = async (req, res) => {
  const url = req.query.url;

  try {
    const data = await scraper(url);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error scraping website'
