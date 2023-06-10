const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3001;

app.get('/scrape', async (req, res) => {
  const url = 'https://martinique.123-click.com/store/viandes-poissons';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const titles = [];
  $('.title a').each((index, element) => {
    titles.push({
      title: $(element).text(),
      link: $(element).attr('href'),
    });
  });

  res.send(titles);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
