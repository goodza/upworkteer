
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
const validUrl = require('valid-url');
const urlToScreenshot = 'https://www.upwork.com/ab/jobs/search/t/1/?ontology_skill_uid=1031626755474440192&sort=recency'
const fs = require('fs').promises;

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
    headless: false
};

const viewPort = { width: 1024, height: 768 };

let SaveCookies = async (page) =>{
	const cookies = await page.cookies();
	await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
}

let LoadCookies = async (page) =>{
	const cookiesString = await fs.readFile('./cookies.json');
	const cookies = JSON.parse(cookiesString);
	await page.setCookie(...cookies);
}

(async () => {
    
    browser = await puppeteer.launch(Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox']},
	{executablePath: 'google-chrome-stable',
	slowMo:10},
        process.env.HEADLESS === 'false' ? nonHeadFlag : void null));

    page = await browser.newPage();
    await page.setViewport(viewPort);
    await LoadCookies(page);
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

      //  await browser.close();
    })();
    // res.send(urlToScreenshot)

});


app.get('/', function(req, res) {

   res.send('HEYY')

});


app.listen(port, function() {
    console.log('App listening on port ' + port)
})
