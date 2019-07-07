const puppeteer = require('puppeteer');
var fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/tokyo.html');

  await console.log("");  
  await console.log("-------------name---------------");  
  await console.log("");  
  const names = await page.$$(".name");
  await createFile("name.txt");

  for(const name of names) {
    const elem = await name.getProperty('innerText');
    await console.log(await elem.jsonValue("_remoteObject"));
    const text = await elem.jsonValue("_remoteObject");
    await appendFile("name.txt", await text + "\n");
  }

  await console.log("");  
  await console.log("-------------add---------------");  
  await console.log("");  
  const adds = await page.$$(".add");
  await createFile("add.txt");

  for(const add of adds) {
    const elem = await add.getProperty('innerText');
    await console.log(await elem.jsonValue("_remoteObject"));  
    const text = await elem.jsonValue("_remoteObject");
    await appendFile("add.txt", await text + "\n");
  }

  await browser.close();
})();

function createFile(path) {
  fs.writeFileSync(path, "", function (err) {
    console.log(err);
  });
}

function appendFile(path, data) {
  fs.appendFileSync(path, data, function (err) {
    if (err) {
        throw err;
    }
  });
}