const puppeteer = require('puppeteer');

const scrapeData = async (url) => {
    (async () => {
        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null
        });
      
        const page = await browser.newPage();
        await page.goto(url);
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
        await browser.close();
      
      })();
  };
  
  module.exports = scrapeData;


