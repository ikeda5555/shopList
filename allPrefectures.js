const puppeteer = require('puppeteer');
const fs = require('fs');
createFiles();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/');

  var classAreas = await page.$$(".shopLink");
  for(var areaCount = await 0; areaCount < await classAreas.length; await areaCount++) {
  
    var liPrefectures = await getLiPrefectures(classAreas[areaCount]);
    for(var prefectureCount = await 0; prefectureCount < await liPrefectures.length; await prefectureCount++) {
      await page.goto(await getLinkToPrefecture(await liPrefectures[prefectureCount]));
    
      await writePrefecturesData("name", await page.$$(".name"));
      await writePrefecturesData("add", await page.$$(".add"));

      await page.goto('https://prichan.jp/shop/');
      classAreas = await page.$$(".shopLink");
      liPrefectures = await getLiPrefectures(classAreas[areaCount]);
    }
  }

  await browser.close();
})();

function createFiles() {
  createFile("name.txt");
  createFile("add.txt");
}

async function getLiPrefectures(classArea) {
  const ddArea = await classArea.$('dd');
  return await ddArea.$$('li');
}

async function getLinkToPrefecture(prefecture) {
  const a = await prefecture.$('a');
  const link = await a.getProperty('href');
  return await link.jsonValue("_remoteObject");
}

async function writePrefecturesData(filename, dataClasses) {
  for(const data of dataClasses) {
    const elem =  await data.getProperty('innerText');
    const text = await elem.jsonValue("_remoteObject");  
    await appendFile(await filename + ".txt", await text + "\n");  
  }  
}

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