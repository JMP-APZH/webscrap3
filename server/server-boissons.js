const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

app.get('/scrape-boissons', (req, res) => {
  
  const url = 'https://martinique.123-click.com/store/boissons';
  
  axios.get(url)
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
          const quantite2 = $(this).find('div.poids-suffixe-holder').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
          const prixunite = $(this).find('div.unity-price').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
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
      res.header('Access-Control-Allow-Origin', '*');
      res.send(articles);
   }).catch(error => {
      console.log(error);
      res.send(error);
    });
  });
  
  app.listen(3011, () => console.log('Server Boissons running on port 3011'));