const puppeteer = require('puppeteer');

const scrapeData = async (url) => {
    (async () => {
        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null
        });
      
        const page = await browser.newPage();
        //await page.goto('https://brightdata.com/blog');
        await page.goto('https://stackoverflow.com/questions/51458854/getting-a-dynamic-element-by-selector');
       // const [customizeButton] = await page.waitForXPath();
        const xpathExpression = "//button[contains(text(), 'Customize')]";
        const customizeButton = await page.waitForSelector(`xpath/${xpathExpression}`);
        if (customizeButton) {
          console.log('Customize button found');
          await customizeButton.click();
          await new Promise(r => setTimeout(r, 50000));
          await page.waitForSelector('[class*="modal"]', { timeout: 5000 });
      
      // Extract the information from the popup
      const popupContent = await page.evaluate(() => {
          const keywords = ["Privacy", "Cookie", "Preference"];
      
      const content = Array.from(document.querySelectorAll('[class*="modal, dialog"]'))
        .map(el => el.textContent)
        .find(text => keywords.some(keyword => text.includes(keyword)));
      
      console.log(content);
      
        
      
        return {
          content,
        };
      });
      
      console.log(popupContent);
      
        } else {
          console.log('Customize button not found');
        }
        
        
      
      //   const data = await page.evaluate(async () => {
      
      //     // let data = [];
      //     // const titles = document.querySelectorAll('.brd_post_entry');
      
      //     // for (const title of titles) {
      //     //   const titleText = title.querySelector('.brd_post_title').textContent;
      //     //   const titleLink = title.href;
      
      //     //   const article = { title: titleText, link: titleLink };
      //     //   data.push(article);
      //     // }
      
      //     // return data;
         
        
      //         const link = Array.from(document.querySelectorAll('a'))
      //             .find(a => a.textContent.toLowerCase().includes('privacy'));
              
      //             console.log('link is:',link);
      //         return link ? { text: link.innerText, href: link.href } : null;
      
      //   })
      
       
      
        await browser.close();
      
      })();
  };
  
  module.exports = scrapeData;


