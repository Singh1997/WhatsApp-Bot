const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');
var lastmsg;

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 });
  const page1 = await browser.newPage();
  await page1.goto('https://www.truecaller.com/', { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 });
  await timeout(10000);




   await page.exposeFunction('passObject', (obj) => {
    for (var x in obj) {
      if (obj[x].name == "Aman") {
        global.checkLastMsg(x)
        this.lastmsg=obj[x].msgs.slice(-1)[0].body;
        if(this.lastmsg=='7753889705'){
          global.findNumber(this.lastmsg);
         // global.sendMessage(x, 'Mil gaya No');

        }
       
      }

    }
  });

  global.findNumber = async (number) => {
    await page1.waitFor('input[type=tel]');
    await page1.type('input[type=tel]', number);
    await page1.click('#app > div.page > div.home-search > div > div.searchbar > div.searchbar__inputs > button.searchbar__submit');
    await page1.evaluate(() => {
      var json=JSON.parse(window.localStorage.tcstorage);
      global.sendMessage(json.search.history[0].name);
    })
   }

  global.sendMessage = async (index, msg) => {
    console.log('2');
    await page.evaluate((i, m) => {
      setInterval(() => {
        if (Store.Chat.models[i].__x_name == "Aman") {
          Store.Chat.models[i].sendMessage(m);
        }
      }, 10000);
    }, index, msg);

  }
  global.checkLastMsg = async (index) => {
    await page.evaluate((i) => {
      
        if (Store.Chat.models[i].__x_name == "Aman") {
        this.lastmsg=Store.Chat.models[i].__x_previewMessage.__x_body
        console.log('1'+this.lastmsg);
        }
    },index);
  }
   
  
  global.page = page;
  setInterval(() => {

    global.page.evaluate(() => {
      console.log(window.Store.Chat.models[0]);
      window.passObject(Store.Chat.models)
    });
  }, 10000);

  await timeout(10000);
})();

