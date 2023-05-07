// in a new folder be sure to run "npm init -y" and "npm install puppeteer"
const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
    const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.spire.umass.edu/psp/heproda/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&cmd=login&errorCode=105&languageCd=ENG#")

  //const element = await page.$('#content > div > div.help.col-md-4.order-3 > p:nth-child(2) > a') 
  //await page.evaluate(element => element.click(), element);

  await page.click('#content > div > div.help.col-md-4.order-3 > p:nth-child(2) > a')
  await page.waitForNavigation()

  const title = await page.$eval('.PAPAGETITLE', element => element.textContent)
  
  console.log('title:', title)

  //page.click(selector, clickOptions),

  //await page.click('#win0divCLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH > a')
  //const clickedData = await page.$eval('$data', el => el.textContent)
  //await page.waitForNavigation(); 
  
  /*
  const course_title = await page.evaluate(() => {
    const titlePods = document.querySelector('.PAPAGETITLE')
    return titlePods.textContent
  })

  console.log(course_title)
  */


  //await fs.writeFile("names.txt", names.join("\r\n"))

  await browser.close()

}

start()