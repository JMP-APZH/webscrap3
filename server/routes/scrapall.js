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
    // let uniqueArticles = [];
    // articles.forEach((element) => {
    //     if (!uniqueArticles.includes(element)) {
    //         uniqueArticles.push(element);
    //     }
    // });

    console.log('articles from server:', uniqueDairy)
    // res.header('Access-Control-Allow-Origin', '*');
    res.send(uniqueDairy);
    // res.send('Hello, world!');
}).catch(error => {
    console.log(error);
    res.send(error);
});
});


// router.get('/scrapedairy2', (req, res) => {

//   const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {

//     let items = [];
    
//     while (itemTargetCount > items.length) {
//       items = await page.evaluate(() => {
//         // const elements = Array.from(document.querySelectorAll('.desc a'));
//         const elements = Array.from(document.querySelectorAll('.owl-lazy'));
//         // const items = Array.from(document.querySelectorAll("div"));
//         // const items = Array.from(document.querySelector("div > .product-left"));
//         // console.log('Data InnerText from server 1:', elements.map(element => element.innerText))
//         return elements.map(element => element.innerText.replace(/\n|\t| /g, ''));
//         // return items.map((item) => ({
//         //   name: item.querySelector('a').innerText,
//         // }))
//       })
//         // console.log(items.length)
//         // console.log(items)

//       previousHeight = await page.evaluate("document.body.scrollHeight");
//       await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
//       await page.waitForFunction(
//         `document.body.scrollHeight > ${previousHeight}`
//         );
//       await new Promise((resolve) => setTimeout(resolve, 5000));  
      
//       }
//       let uniqueItems = [...new Set(items)]
//       return uniqueItems
//     }
    
//   // }
  
//   (async () => {
//     const browser = await puppeteer.launch({
//       // headless: false,
//       args: [
//         "--disable-setuid-sandbox",
//         "--no-sandbox",
//         "--single-process",
//         "--no-zygote",
//       ],
//       // executablePath:
//       // process.env.NODE_ENV === "production"
//       //   ? process.env.PUPPETEER_EXECUTABLE_PATH
//       //   : puppeteer.executablePath(),
//     });

//     try {
//       const page = await browser.newPage();
//       await page.goto('https://martinique.123-click.com/store/frais');
    
//       const items = await scrapeInfiniteScrollItems(page, 100);
      
//       res.json(items);
//       console.log('JSON Data from server 2:', JSON.stringify(items))
//       console.log('Number of items in Dairy array: ', items.length)
//       fs.writeFileSync('items.json', JSON.stringify(items));
//       await browser.close();
      
//       // res.JSON.stringify(items)

//       // const items = Array.from(document.querySelectorAll("div"));
//       //   console.log(items.map((item) => item.innerText))
//       //   return items.map((item) => item.innerText);
      
//     } catch (e) {
//       console.error(e);
//       res.status(500).send(`Something went wrong while running Puppeteer: ${e}`)
//     } finally {
//       await browser.close();
//     }

    

//   })();

// });

// For infinite scroll scrap:

// const url = 'https://martinique.123-click.com/store/frais';


// axios.get(url, {
// headers: {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
// },
// })
// .then(response => {

  // const scrapeInfiniteScrollItems = async (page, itemTargetCount) => {

  //   let items = [];
    
  //   while (itemTargetCount > items.length) {
  //     items = await page.evaluate(() => {
  //       const items = Array.from(document.querySelectorAll("#desc > div"));
  //       return items.map((item) => item.innerText);
  //       // return items.map((item) => ({
  //       //   name: item.querySelector('a').innerText,
  //       // }))
  //     })
  //       console.log(items.length)
  //       console.log(items)

  //       return items
  
      
  //     previousHeight = await page.evaluate("document.body.scrollHeight");
  //     await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  //     await page.waitForFunction(
  //       `document.body.scrollHeight > ${previousHeight}`
  //       );
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }
  //   }
    
  // // }
  
  // (async () => {
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //   });

  //   const page = await browser.newPage();
  //   await page.goto('https://martinique.123-click.com/store/frais');
  
  //   const items = await scrapeInfiniteScrollItems(page, 100);
  //     fs.writeFileSync('items.json', JSON.stringify(items));

  // })();

// }

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

      // Scraping product names
    // const productNames = $('.title a')
    // const productNames = $(this).find('a').attr('title')
    // .map((_, element) => $(element).text())
    // .get();

    const dairy0 = []
    $('div.product-list-affichage-mobile', response.data).each(function() {
              const nom = $(this).find('a').attr('title')
              const prix = $(this).find('p.price-full').text()
              
              dairy0.push({
                          nom,
                          prix,
                          
                      })

                    })
      let uniqueDairy0 = [...new Set(dairy0)]
      const productNames = uniqueDairy0

    console.log('from ProductNames fetch: ', productNames)

    // Scraping product prices
    // const productPrices = $('p.price-full')
    // .map((_, element) => $(element).text())
    // .get();

    // Adding scraped data to the final array
    addDataToFinalArray(productNames, productPrices);

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
function addDataToFinalArray(names, prices) {
  for (let i = 0; i < names.length; i++) {
    scrapedData.push({
      name: names[i],
      price: prices[i]
    });
  }
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
    
 






// axios.get(initialUrl, {
//   // headers: {
//   //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
//   // },
//   })
//   .then(response => {
//     if (response.status === 200) {
//       // const html = response.data;
//       // const $ = cheerio.load(html);

//       // Scraping product names
//       // const productNames = $('a.title')
//       //   .map((_, element) => $(element).text())
//       //   .get();

//       const $ = cheerio.load(response.data);

//       const dairy3 = []

//       $('div.product-list-affichage-mobile', response.data).each(function() {
//         const nom = $(this).find('a').attr('title')
//         const prix = $(this).find('p.price-full').text() 

//         dairy3.push({
//           nom,
//           prix,
          
//       })

//       // printProducts(dairy3);
//       // console.log('from PrintProducts: ', dairy3)
//       // const print1 = printProducts(dairy3);
//       // console.log('1st set of products: ', print1)

//       })
//       const print1 = printProducts(dairy3);
//       let uniqueDairy3 = [...new Set(dairy3)]
//       // console.log('1st set of products: ', uniqueDairy3)
//       allDairy.push(...uniqueDairy3)

//       // Checking if there are more items to load
//       const nextPageUrl = getNextPageUrl($);
//       if (nextPageUrl) {
//         console.log('from NextPageURL:', nextPageUrl)
//         // Fetching additional pages
//         fetchAdditionalPages(nextPageUrl);
//       }
//     }
//   })
//   .catch(error => {
//     console.log('An error occurred:', error);
//   });

// // Function to fetch additional pages
// async function fetchAdditionalPages(url) {
//   try {
//     const response = await axios.get(url, {
//       // headers: {
//       //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
//       // },
//       });
//     if (response.status === 200) {
//     //   const html = response.data;
//     //   const $ = cheerio.load(html);

//     //   // Scraping product names
//     //   const productNames = $('a.title')
//     //     .map((_, element) => $(element).text())
//     //     .get();

//     //   // Scraping product prices
//     //   const productPrices = $('p.price-full')
//     //     .map((_, element) => $(element).text())
//     //     .get();

//         const $ = cheerio.load(response.data);

//         const dairy4 = []
  
//         $('div.product-list-affichage-mobile', response.data).each(function() {
//           const nom = $(this).find('a').attr('title')
//           const prix = $(this).find('p.price-full').text() 
//           dairy4.push({
//             nom,
//             prix,
            
//         })

//         // const print2 = printProducts(dairy4);
//         // console.log('2nd set of products: ', print2)
  
//         })

//         // const print2 = printProducts(dairy4);
//         let uniqueDairy4 = [...new Set(dairy4)]
//         // console.log('2nd set of products: ', print2)
//         // console.log('2nd set of products: ', uniqueDairy4)
//         allDairy.push(...uniqueDairy4)
//         // console.log('From all Dairy:', allDairy)

//         // res.send(dairy4);
//         // console.log('From Dairy 4:', dairy4)

//       // Outputting the scraped data
//       // printProducts(productNames, productPrices);
//       // console.log('Check Product Name:', productNames);

//       // Checking if there are more items to load
//       const nextPageUrl = getNextPageUrl($);
//       if (nextPageUrl) {
//         // Fetching additional pages recursively
//         console.log('from NextPageURL 2:', nextPageUrl)
//         fetchAdditionalPages(nextPageUrl);

//       }
//     }
    
//   } catch (error) {
//     console.log('An error occurred:', error);
//   }
// }


// // Function to print product details
// function printProducts(products) {
//   const dairy5 = []
//   dairy5.push(...allDairy)
//   // res.send(allDairy)
//   res.send(dairy5)
//   // for (let i = 0; i < products.length; i++) {
//   //   // console.log('Product Name:', nom[i]);
//   //   // console.log('Price:', prix[i]);
//   //   // console.log('----------------------');
//   // //   const nom = names[i]
//   // //   const prix = prices[i]
//   //   dairy5.push({
//   //     products
//   // })
//   // // console.log('2nd set of products: ', dairy5)
//   // // console.log('items from dairy 5:', dairy5)
//   // }
//   // console.log('Number of items:', names.length);
//   // res.send(dairy3);
// }

// function getNextPageUrl($) {
//   const nextPageLink = $('.pagination')
//     .find('.next_page')
//     .attr('href');

//   if (nextPageLink) {
//     return `${baseUrl}${nextPageLink}`;
//   }

//   return null;
// }

// function addDairiesToFinalArray(names, prices) {
//   axios.get('http://localhost:5001/scrapedairy3', {
//     params: {
//       names,
//       prices
//     }
// })
// .then(response => {
//   console.log('Data to be sent to client: ', response.data)
// })
// .catch(error => {
//   console.log('Error sending data to the server', error)
// })


// // Function to extract the URL of the next page


// }





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