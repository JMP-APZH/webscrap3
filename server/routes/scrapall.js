const express = require("express")
const router = express.Router()
require('dotenv').config();

const cheerio = require('cheerio');
const axios = require('axios');
// const puppeteer = require('puppeteer')
const fs = require('fs')

const cors = require("cors");

router.use(cors());
router.options('*', cors())

router.get('/', (req, res) => {

    res.send('All Scraps Overview working')
})

router.get('/scrapecategories', (req, res) => {


  const url = 'https://martinique.123-click.com/store/frais';

  // axios.get(url)
  axios.get(url, {
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  },
  })
  .then(response => {
      const $ = cheerio.load(response.data);

      const categories = []

      $('a.category-item', response.data).each(function() {
      const nomcat = $(this).find('div.category-infos').find('p.subtitle-item').text()
      const img = $(this).find('div.category-image').find('img').attr('src')
      categories.push({
        nomcat,
        img,
      })
      })
      console.log('categories from server:', categories)
      // res.header('Access-Control-Allow-Origin', '*');
      res.send(categories);
      // res.send('Hello, world!');
  }).catch(error => {
      console.log(error);
      res.send(error);
  });
  });

router.get('/scrapeboissons', (req, res) => {


    const url = 'https://martinique.123-click.com/store/boissons';

  // axios.get(url)
  axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  })
    .then(response => {
        const $ = cheerio.load(response.data);

        const boissons = []

        $('div.product-list-affichage-mobile', response.data).each(function() {
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
        boissons.push({
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
      let uniqueBoissons = [...new Set(boissons)]
      console.log('boissons from server:', uniqueBoissons)
      // res.header('Access-Control-Allow-Origin', '*');
      res.send(uniqueBoissons);
      // res.send('Hello, world!');
   }).catch(error => {
      console.log(error);
      res.send(error);
    });
  });



router.get('/scrapedairy', (req, res) => {


const url = 'https://martinique.123-click.com/store/frais';

// axios.get(url)
axios.get(url, {
headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
},
})
.then(response => {
    const $ = cheerio.load(response.data);

    const dairy = []

    $('div.product-list-affichage-mobile', response.data).each(function() {
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
    dairy.push({
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
    let uniqueDairy = [...new Set(dairy)]

    console.log('articles from server:', uniqueDairy)
    // res.header('Access-Control-Allow-Origin', '*');
    res.send(uniqueDairy);
    // res.send('Hello, world!');
}).catch(error => {
    console.log(error);
    res.send(error);
});
});

// Route to scrape and send the data to the client
router.get('/scrapedairy3', async (req, res) => {
  try {
    const scrapedData = await scrapeData();
    res.json(scrapedData);
  } catch (error) {
    console.log('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while scraping the data.' });
  }
});

// Function to scrape the data
async function scrapeData() {
  const baseUrl = 'https://martinique.123-click.com';
  const initialUrl = `${baseUrl}/store/frais`;
  const scrapedData = []


// Function to fetch additional pages
async function fetchAdditionalPages(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

    const dairy0 = []
    $('div.product-list-affichage-mobile', response.data).each(function() {
              const nom = $(this).find('a').attr('title')
              const prix = $(this).find('p.price-full').text()

              const url = $(this).find('a').attr('href')
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
              
              dairy0.push({
                          nom,
                          prix,
                          url,
                          prixspecial,
                          img,
                          quantite,
                          quantite2,
                          prixunite,
                          nutriscore,
                          nutrifull

                          
                      })

                    })
      let uniqueDairy0 = [...new Set(dairy0)]
      const productNames = uniqueDairy0

    console.log('from ProductNames fetch: ', productNames)

    // Adding scraped data to the final array
    addDataToFinalArray(productNames)

     // Checking if there are more items to load
     const nextPageUrl = getNextPageUrl($);
     if (nextPageUrl) {
       // Fetching additional pages recursively
       await fetchAdditionalPages(nextPageUrl);
     }
    }
    } catch (error) {
      throw error;
    }
}

// Function to add scraped data to the final array
// function addDataToFinalArray(names, prices) {
  function addDataToFinalArray(dairy) {
  for (let i = 0; i < dairy.length; i++) {
    scrapedData.push({
      dairy: dairy[i],
      // price: prices[i]
    });
  }
  // console.log(names.length)
}
     
// Function to extract the URL of the next page
function getNextPageUrl($) {
  const nextPageLink = $('.pagination')
    .find('.next_page')
    .attr('href');

  if (nextPageLink) {
    return `${baseUrl}${nextPageLink}`;
  }

  return null;
}

// Start scraping by fetching the initial page
await fetchAdditionalPages(initialUrl);

return scrapedData;
console.log('from the first scrap: ', scrapedData)
}
    


router.get('/scrapeentretien', (req, res) => {


  const url = 'https://martinique.123-click.com/store//entretien-nettoyage';

// axios.get(url)
axios.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  },
})
  .then(response => {
      const $ = cheerio.load(response.data);

      const entretien = []

      $('div.product-list-affichage-mobile', response.data).each(function() {
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
      entretien.push({
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
    let uniqueEntretien = [...new Set(entretien)]
    console.log('entretien from server:', uniqueEntretien)
    // res.header('Access-Control-Allow-Origin', '*');
    res.send(uniqueEntretien);
    // res.send('Hello, world!');
 }).catch(error => {
    console.log(error);
    res.send(error);
  });
});

router.get('/scrapefruitslegumes', (req, res) => {


  const url = 'https://martinique.123-click.com/store/fruits-legumes';

  // axios.get(url)
  axios.get(url, {
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  },
  })
  .then(response => {
      const $ = cheerio.load(response.data);

      const fruitslegumes = []

      $('div.product-list-affichage-mobile', response.data).each(function() {
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
      fruitslegumes.push({
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
      let uniqueFruitslegumes = [...new Set(fruitslegumes)]
      console.log('articles from server:', uniqueFruitslegumes)
      // res.header('Access-Control-Allow-Origin', '*');
      res.send(uniqueFruitslegumes);
      // res.send('Hello, world!');
  }).catch(error => {
      console.log(error);
      res.send(error);
  });
  });

  router.get('/scrapesurgeles', (req, res) => {


    const url = 'https://martinique.123-click.com/store/surgeles';

    // axios.get(url)
    axios.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
    })
    .then(response => {
        const $ = cheerio.load(response.data);

        const surgeles = []

        $('div.product-list-affichage-mobile', response.data).each(function() {
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
        surgeles.push({
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
        let uniqueSurgeles = [...new Set(surgeles)]
        console.log('articles from server:', uniqueSurgeles)
        // res.header('Access-Control-Allow-Origin', '*');
        res.send(uniqueSurgeles);
        // res.send('Hello, world!');
    }).catch(error => {
        console.log(error);
        res.send(error);
    });
    });

    router.get('/scrapeviandespoissons', (req, res) => {


      const url = 'https://martinique.123-click.com/store/viandes-poissons';

      // axios.get(url)
      axios.get(url, {
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
      })
      .then(response => {
          const $ = cheerio.load(response.data);

          const viandespoissons = []

          $('div.product-list-affichage-mobile', response.data).each(function() {
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
          viandespoissons.push({
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
          let uniqueViandespoissons = [...new Set(viandespoissons)]
          console.log('articles from server:', uniqueViandespoissons)
          // res.header('Access-Control-Allow-Origin', '*');
          res.send(uniqueViandespoissons);
          // res.send('Hello, world!');
      }).catch(error => {
          console.log(error);
          res.send(error);
      });
      });


module.exports = router