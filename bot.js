const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');
var lastmsg;
var json;
var name;
var index;
var interval;
const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 });
  const page1 = await browser.newPage();
  await page1.goto('https://www.truecaller.com/', { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 });
  //await page1.waitFor('#app > div.page > div.home-search > div > div.searchbar > div.searchbar__inputs > input');
  await timeout(10000);


 function validatePhoneNo(mobile_no){
    var phoneno = /^\d{10}$/;
    return phoneno.test(mobile_no);
  }

   await page.exposeFunction('passObject', (obj) => {
    for (var x in obj) {
      if (obj[x].name == "Aman") {
        this.index=x;
        global.checkLastMsg(x)
        this.lastmsg=obj[x].msgs.slice(-1)[0].body;
        if(validatePhoneNo(this.lastmsg)){
        global.findNumber(this.lastmsg);
       //   this.json=window.localStorage.tcstorage;
         // console.log(this.json);
        /*  var a= page1.evaluate(() => {
            this.json=JSON.parse(window.localStorage.tcstorage);
            this.name=this.json.search.history[0].name;
            console.log(this.name);
          })*/
          console.log(this.name);
       

        }
      /*  else{
          global.sendMessage(x,'Send a valid mobile no.');
        }*/
       
      }

    }
  });

  await page1.exposeFunction('getDetails',(obj)=>{
    console.log(obj);
   this.name= obj.search.history[0].name;
   global.sendMessage(this.index,this.name);
//   clearInterval(this.interval);
  });

  global.findNumber = async (number) => {
    await page1.goto(`https://www.truecaller.com/search/in/${number}`, { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 })
    //await page1.click('#app > div.page > div.home-search > div > div.searchbar > div.searchbar__inputs > button.searchbar__submit');
    await page1.evaluate(() => {
      window.getDetails(JSON.parse(window.localStorage.tcstorage));
    })
   }

  global.sendMessage = async (index, msg) => {
    console.log('2');
    await page.evaluate((i, m) => {
        if (Store.Chat.models[i].__x_name == "Aman") {
          console.log(Store.Chat.models[i].__x_name);
          Store.Chat.models[i].sendMessage(m);
        }
    }, index, msg);

  }
  global.checkLastMsg = async (index) => {
    await page.evaluate((i) => {
        if (Store.Chat.models[i].__x_name == "Aman") {
        this.lastmsg=Store.Chat.models[i].__x_previewMessage.__x_body
        }
    },index);
  }
   
  
  global.page = page;
  this.interval= setInterval(() => {

    global.page.evaluate(() => {
      window.passObject(Store.Chat.models)
    });
  }, 10000);

  await timeout(10000);
})();

