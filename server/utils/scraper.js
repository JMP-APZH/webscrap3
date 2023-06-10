const axios = require('axios');
const cheerio = require('cheerio');

const scrape = async (url) => {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // TODO: Write your web scraping code here

    const articles = []
        
        $('div.productInList', htmlresp).each(function() {
            const nom = $(this).find('a').attr('title')
            const url = $(this).find('a').attr('href')
            const prix = $(this).find('p.price-full').text()
            const img = $(this).find('img.owl-lazy').attr('data-src')
            const quantite = $(this).find('div.desc-small-text').text()
            const quantite2 = $(this).find('div.poids-suffixe-holder').text()
            const prixunite = $(this).find('div.unity-price').text()
            const nutriscore = $(this).find('div.picto-vignette-holder').find('img').attr('src')
            articles.push({
                nom,
                prix,
                quantite,
                quantite2,
                // prixunite,
                img,
                nutriscore,
                url,
            })
        })

    return { message: 'Scraping successful' };
  } catch (error) {
    console.error(error);
    throw new Error('Scraping failed');
  }
};

module.exports = scrape;
