const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/tokyo.html');

  await console.log("");  
  await console.log("-------------name---------------");  
  await console.log("");  
  const names = await page.$$(".name");
  for(const name of names) {
    const elem = await name.getProperty('innerText');
    await console.log(await elem.jsonValue("_remoteObject"));  
  }

  await console.log("");  
  await console.log("-------------add---------------");  
  await console.log("");  
  const adds = await page.$$(".add");
  for(const add of adds) {
    const elem = await add.getProperty('innerText');
    await console.log(await elem.jsonValue("_remoteObject"));  
  }
//  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();