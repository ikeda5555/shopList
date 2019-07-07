const puppeteer = require('puppeteer');
var fs = require('fs');
createFile("name.txt");
createFile("add.txt");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/tokyo.html');

  const names = await page.$$(".name");
  for(const name of names) {
    const elem = await name.getProperty('innerText');
    const text = await elem.jsonValue("_remoteObject");
    await appendFile("name.txt", await text + "\n");
  }

  const adds = await page.$$(".add");
  for(const add of adds) {
    const elem = await add.getProperty('innerText');
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