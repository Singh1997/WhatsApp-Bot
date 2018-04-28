const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};



(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com', {waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 0 });
  await timeout(10000);

  global.sendMessage=async(index,msg)=>{
    console.log('2');  
    setInterval(()=>{
    global.page.evaluate((i,m)=>{
      Store.Chat.models[i].sendMessage(m);
     },index,msg);
    },6000);
  }
  await page.exposeFunction('passObject', (obj) => {
  for(var x in obj){
    console.log(obj[x].name);
    if(obj[x].name=="Nitin Kiet"){
      global.sendMessage(x,'?');
     
          }
         
  }
  
});

  global.page = page;
  setInterval(()=>{
    console.log('1');  
    global.page.evaluate(() => { 
     window.passObject(Store.Chat.models) 
   });
  },7000);

  await timeout(10000);
 })();