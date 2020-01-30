
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
const validUrl = require('valid-url');
const urlToScreenshot = 'https://yandex.ru'

console.log('HEADLESS MODE = '+process.env.HEADLESS)

var parseUrl = function(url) {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }

    return url;
};

let browser,page;


const nonHeadFlag = {
    executablePath: 'google-chrome-stable',
    headless: false,
};

(async () => {
    
    browser = await puppeteer.launch(Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox']},
        process.env.HEADLESS === 'false' ? nonHeadFlag : void null));

    page = await browser.newPage();
    await page.goto(urlToScreenshot);
    
  })();


app.get('/ya', function(req, res) {

    console.log('Screenshotting: ' + urlToScreenshot);
    
    (async() => {

        await page.screenshot().then(function(buffer) {
            res.setHeader('Content-Disposition', 'attachment;filename="' + urlToScreenshot + '.png"');
            res.setHeader('Content-Type', 'image/png');
            res.send(buffer)
        });

        // await browser.close();
    })();
    // res.send(urlToScreenshot)

});


app.get('/', function(req, res) {

   res.send('HEYY')

});


app.listen(port, function() {
    console.log('App listening on port ' + port)
})
