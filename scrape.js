// in a new folder be sure to run "npm init -y" and "npm install puppeteer"
const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
    const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.spire.umass.edu/psp/heproda/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder")

  const course_title = await page.evaluate(() => {
    const titlePods = document.getElementById("[id='win0divDERIVED_CLSRCH_SSR_EXPAND_COLLAP2$0']")
    console.log(titlePods)
  })

  //console.log(course_title)



  //await fs.writeFile("names.txt", names.join("\r\n"))

  await browser.close()

}

start()