
const {login} = require('../passwords.js')

const log = console.log
const MESSAGE = 'Hello! Is it possible to order 1100 items (infrared laser pyrometers)?'

const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
//const device = require('puppeteer/DeviceDescriptors')['iPad Pro']
const port = process.env.PORT || 8080;
//const urlToScreenshot = 'https://www.upwork.com/ab/jobs/search/t/1/?ontology_skill_uid=1031626755474440192&sort=recency'

const fs = require('fs').promises;

console.log('HEADLESS MODE = '+process.env.HEADLESS)

let browser,page;


const viewPort = { width: 1000, height: 841 };

let SaveCookies = async (page,f) =>{
	const cookies = await page.cookies();
	await fs.writeFile(f, JSON.stringify(cookies, null, 2));
}

let LoadCookies = async (page,f) =>{
	const cookiesString = await fs.readFile(f);
	const cookies = JSON.parse(cookiesString);
	await page.setCookie(...cookies);
}


let LOGIN = async (page) =>{
    await page.goto('https://passport.alibaba.com/icbu_login.htm?origin=login.alibaba.com&flag=1&return_url=https%3A%2F%2Fmessage.alibaba.com%2Fmessage%2Fdefault.htm');
    await page.type('#fm-login-id',login.mail);
    await page.type('#fm-login-password',login.pass);
    await page.keyboard.press('Enter');

    await page.waitForNavigation()
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


let ChatNow = async () => {
    
    browser = await puppeteer.launch(Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']},
	{slowMo:10,ignoreDefaultArgs: ['--enable-automation']},
        process.env.HEADLESS === 'false' ? {headless:false} : {headless:true}));
    
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.alibaba.com', ['notifications']);

    page = await browser.newPage();
    //await page.emulate(device)
    await page.setViewport(viewPort);
    await LoadCookies(page);
    //await LOGIN(page);
    //await SaveCookies(page);
    
    const BlackList = ['Brook Fan','William Wang','vikki Jiang','josie wu','Frank Zhou','Sherry Shi',
'eveline he','Michelle Wang','kim zhang','Tracy Ling','Gina Yao','Nina shi','David Zhou','Vivian Jiang','Justin CAI','Jason Li',
'Kate Sun','Wanli Ye','Scarlett He','Mina Gan','Hassan Liu','Angela Lee','Lydia Zou','James Zhang','Mike Lin',
'Joan Chen','Jelly Chen','lily lee','Daisy Gainexpress','Melanie Huang','Caroline Tang','Luke Guo',
'Kelly Yan','Iris Xue','Summer He','Eric Hao']

    for (let pageIndex = 3; pageIndex <= 18; pageIndex++) {
        
        log('---Page '+pageIndex+'---')
        await page.goto('https://www.alibaba.com/products/Pyrometer_Infrared.html?IndexArea=product_en&page='+pageIndex)
        // await page.goto('https://www.alibaba.com/trade/search?IndexArea=product_en&CatId=&fsb=y&viewtype=&tab=&SearchText=Pyrometer+Infrared');
        await autoScroll(page);
        

        let Pieces = await page.$$('.organic-list-offer-outter.J-offer-wrapper')

        // let Chats = await page.$$('.organic-list-offer-outter .atm-online')
        // log('Found '+Chats.length+' items')
        
        for (let i = 0; i < Pieces.length; i++) {
            try {
                
                await page.waitFor(2000);
                let Chat = await Pieces[i].$('.organic-list-offer-outter .atm-online')
                if (Chat){
                    const Price = await Pieces[i].$eval('.gallery-offer-price span', e => e.innerText);
                    await Chat.click();
                    const frame = page.frames().find(frame => frame.name() === "#weblite-iframe");
                    await page.waitFor(2000);
                    const Name = await frame.$eval('.message-box .contact-name', e => e.innerText);
                    log(Price)
                    if ((BlackList.indexOf(Name) == -1) && (+Price.slice(Price.indexOf('$')+1,Price.indexOf('.')) < 51)){
                        await (await frame.$('textarea')).focus()
                        await (await frame.$('textarea')).click()
                        await page.keyboard.type(MESSAGE)
                        await (await frame.$('.send-toolbar button')).click()
                        BlackList.push(Name)
                        log('Textarea#'+i+' '+Name)
                     } else log('Textarea#'+i+' '+Name+' (skip)');
                    await (await frame.$('.message-header .next-icon-close')).click()
                    await (await frame.$('.contacts-wrapper .fold-down')).click()
                } else log('x x x x x:'+Chat+' '+i)
    
            } catch(err) { 
                            log(err); 
            }
        }

    }
  
};

let Launch = async (browser,context,page) => {

}

let GetSuppliers = async () => {
    
    browser = await puppeteer.launch(Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']},
	{slowMo:10,ignoreDefaultArgs: ['--enable-automation']},
        process.env.HEADLESS === 'false' ? {headless:false} : {headless:true}));
    
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.alibaba.com', ['notifications']);

    page = await browser.newPage();
    //await page.emulate(device)
    await page.setViewport(viewPort);
    await LoadCookies(page,'./cookies-messenger.json');
    //await LOGIN(page);
    
    let BlackList = [];
    await page.goto('https://message.alibaba.com/message/messenger.htm')
    await SaveCookies(page,'./cookies-messenger.json');
    await page.waitFor(4000);
    let Supliers = await page.$$eval('span.name',e=>e.map((i)=>i.innerText))
    await fs.writeFile('./suppliers.txt', JSON.stringify(Supliers, null, 2));
    log(Supliers)

  
  };

( async () => {
    
    browser = await puppeteer.launch(Object.assign({
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']},
	{slowMo:10,ignoreDefaultArgs: ['--enable-automation']},
        process.env.HEADLESS === 'false' ? {headless:false} : {headless:true}));
    
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.alibaba.com', ['notifications']);

    page = await browser.newPage();
    //await page.emulate(device)
    await page.setViewport(viewPort);
    await LoadCookies(page,'./cookies.json');
    //await LOGIN(page);
    
    await page.goto('https://www.alibaba.com/products/Pyrometer_Infrared.html?IndexArea=product_en&page=1')
    let BlackList = JSON.parse(await fs.readFile('./suppliers.txt'))
    log(BlackList.length)

    for (let pageIndex = 1; pageIndex <= 2; pageIndex++) {
        
        log('---Page '+pageIndex+'---')
        await page.goto('https://www.alibaba.com/products/Pyrometer_Infrared.html?IndexArea=product_en&page='+pageIndex)
        await autoScroll(page);
        

        let Pieces = await page.$$('.organic-list-offer-outter.J-offer-wrapper')

        // let Chats = await page.$$('.organic-list-offer-outter .atm-online')
        // log('Found '+Chats.length+' items')
        
        for (let i = 0; i < Pieces.length; i++) {
            try {
                
                await page.waitFor(2000);
                let Chat = await Pieces[i].$('.alitalk-normal .atm-grey')
                if (Chat){
                    const Price = await Pieces[i].$eval('.gallery-offer-price span', e => e.innerText);
                    await Chat.click();
                    const frame = page.frames().find(frame => frame.name() === "#weblite-iframe");
                    await page.waitFor(2000);
                    const Name = await frame.$eval('.message-box .contact-name', e => e.innerText);
                    log(Price)
                    if ((BlackList.indexOf(Name) == -1) && (+Price.slice(Price.indexOf('$')+1,Price.indexOf('.')) < 51)){
                        await (await frame.$('textarea')).focus()
                        await (await frame.$('textarea')).click()
                        await page.keyboard.type(MESSAGE)
                        //await (await frame.$('.send-toolbar button')).click()
                        BlackList.push(Name)
                        log('Textarea#'+i+' '+Name)
                     } else log('Textarea#'+i+' '+Name+' (skip)');
                    await (await frame.$('.message-header .next-icon-close')).click()
                    await (await frame.$('.contacts-wrapper .fold-down')).click()
                } else log('x x x x x:'+Chat+' '+i)
    
            } catch(err) { 
                            log(err); 
            }
        }

    }
    
  
  })();


















app.get('/ya', function(req, res) {

    log('Screenshotting: ' + urlToScreenshot);
    
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
