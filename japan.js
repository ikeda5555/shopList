const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/tokyo.html');

  await page.goto('https://prichan.jp/shop/');
  var areas = await page.$$(".shopLink");

  await console.log("");  
  await console.log("-------------name---------------");  
  await console.log("");  

  for(var url =0; url<7; url++) {
    var areas2 = await page.$$(".shopLink");
    var dd = await areas2[url].$('dd');

    var lis = await dd.$$('li');
    for(var url2 =0; url2<lis.length; url2++) {
      const a = await lis[url2].$('a');
      const link = await a.getProperty('href');
      await page.goto(await link.jsonValue("_remoteObject"));
    
      const names = await page.$$(".name");
      for(const name of names) {
        const elem = await name.getProperty('innerText');
        await console.log(await elem.jsonValue("_remoteObject"));  
      }  
      await page.goto('https://prichan.jp/shop/');
      areas2 = await page.$$(".shopLink");
      dd = await areas2[url].$('dd');
  
      lis = await dd.$$('li');
      }
  }

  await console.log("");  
  await console.log("-------------add---------------");  
  await console.log("");  

  for(var url =0; url<7; url++) {
    var areas2 = await page.$$(".shopLink");
    var dd = await areas2[url].$('dd');

    var lis = await dd.$$('li');
    for(var url2 =0; url2<lis.length; url2++) {
      const a = await lis[url2].$('a');
      const link = await a.getProperty('href');
      await page.goto(await link.jsonValue("_remoteObject"));
    
      const names = await page.$$(".add");
      for(const name of names) {
        const elem = await name.getProperty('innerText');
        await console.log(await elem.jsonValue("_remoteObject"));  
      }  
      await page.goto('https://prichan.jp/shop/');
      areas2 = await page.$$(".shopLink");
      dd = await areas2[url].$('dd');
  
      lis = await dd.$$('li');
      }
  }

  await browser.close();
})();