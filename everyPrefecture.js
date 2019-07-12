const puppeteer = require('puppeteer');
const fs = require('fs');
createDirectories();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://prichan.jp/shop/');

  var prefectureUrls = [];
  var prefectureNum = 0;
  var classAreas = await page.$$(".shopLink");
  for(var areaCount = await 0; areaCount < await classAreas.length; await areaCount++) {
  
    var liPrefectures = await getLiPrefectures(await classAreas[areaCount]);
    for(var prefectureCount = await 0; prefectureCount < await liPrefectures.length; await prefectureCount++) {
        const url = await getLinkToPrefecture(liPrefectures[prefectureCount]);
        prefectureUrls[prefectureNum] = await url;
        const prefectureName = await url.replace("https://prichan.jp/shop/", "").replace(".html", "");
        await createFile("adds/" + prefectureName);
        await createFile("names/" + prefectureName);
        await prefectureNum++;
    }
  }

  for(const area of prefectureUrls) {
      await page.goto(area);
      const prefectureName = await area.replace("https://prichan.jp/shop/", "").replace(".html", "");
      await writePrefecturesData(await "adds/" + prefectureName, await page.$$(".add"));
      await writePrefecturesData(await "names/" + prefectureName, await page.$$(".name"));
  }

  await browser.close();
})();

async function getLiPrefectures(classArea) {
  const ddArea = await classArea.$('dd');
  return await ddArea.$$('li');
}

async function getLinkToPrefecture(prefecture) {
  const a = await prefecture.$('a');
  const link = await a.getProperty('href');
  return await link.jsonValue("_remoteObject");
}

function createDirectories() {
  createDir("names");
  createDir("adds");
}

async function writePrefecturesData(filename, dataClasses) {
  for(const data of dataClasses) {
    const elem =  await data.getProperty('innerText');
    const text = await elem.jsonValue("_remoteObject");  
    await appendFile(await filename, await text + "\n");  
  }  
}

function createDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function createFile(path) {
  fs.writeFileSync(path + ".txt", "", function (err) {
    console.log(err);
  });
}

function appendFile(path, data) {
  fs.appendFileSync(path + ".txt", data, function (err) {
    if (err) {
        throw err;
    }
  });
}