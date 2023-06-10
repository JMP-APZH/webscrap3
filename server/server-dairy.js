const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const cors = require("cors");

const port = process.env.PORT || 3010;

const app = express();

app.use(cors());
app.options('*', cors())

app.get('/scrape-dairy', (req, res) => {
  
  const url = 'https://martinique.123-click.com/store/frais';
  
  // axios.get(url)
  axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  })
    .then(response => {
        const $ = cheerio.load(response.data);
  
        const articles = []
  
        $('div.productInList', response.data).each(function() {
        const nom = $(this).find('a').attr('title')
        const url = $(this).find('a').attr('href')
        const prix = $(this).find('p.price-full').text()
        const prixspecial = $(this).find('p.price-special').text()
        const img = $(this).find('img.owl-lazy').attr('data-src')
        const quantite = $(this).find('div.desc-small-text').text()
        // const quantite2 = $(this).find('div.poids-suffixe-holder').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
        const quantite2 = $(this).find('div.poids-suffixe-holder').text().replace(/\n|\t| /g, '');
        // const prixunite = $(this).find('div.unity-price').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
        const prixunite = $(this).find('div.unity-price').text().replace(/\n|\t| /g, '');
        const nutriscore = $(this).find('div.picto-item').find('img').attr('src')
        const web = 'https://martinique.123-click.com'
        const nutrifull = web.concat(nutriscore)
        articles.push({
            nom,
            prix,
            prixspecial,
            quantite,
            quantite2,
            prixunite,
            img,
            nutrifull,
            nutriscore,
            url,
        })
      })
      console.log('articles from server:', articles)
      // res.header('Access-Control-Allow-Origin', '*');
      res.send(articles);
      // res.send('Hello, world!');
   }).catch(error => {
      console.log(error);
      res.send(error);
    });
  });
  
  // app.listen(3010, () => console.log('Server Dairy running on port 3010'));
  // const listener = app.listen(process.env.PORT || 3010, () => {console.log('Server Dairy running on port ' + listener.address().port);
  app.listen(port, () => {
    console.log(`Server Dairy listening on port ${port}`);
});
  