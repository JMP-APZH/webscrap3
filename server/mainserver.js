const express = require('express')
const cheerio = require('cheerio');
const axios = require('axios');

const cors = require("cors");

const port = process.env.PORT || 5001;

const app = express()

app.use(cors());
app.options('*', cors())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('Main Server here on port 5001')
    res.render('index', { text: "Text from render working great" })
})



const scrapRouter = require('./routes/scrapall')

app.use('/scrapall', scrapRouter)

// app.listen(5001)
app.listen(port, () => {
    console.log(`Mainserver listening on port ${port}`);
});