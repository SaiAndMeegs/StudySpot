const puppeteer = require('puppeteer');
const fs = require("node:fs/promises");

async function start() {

  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    args: [
      '--enable-features=NetworkService',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--shm-size=3gb', // this solves the issue
    ]

  });

  const [page] = await browser.pages()

  await page.goto("https://www.spire.umass.edu/psp/heproda/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&cmd=login&errorCode=105&languageCd=ENG#", { waitUntil: 'load' })

  //picky selector can be tricky
  //almost all puppeteer lines will have await
  await page.click('#content > div > div.help.col-md-4.order-3 > p:nth-child(2) > a');
  const iframe = await page.waitForSelector('#ptifrmtgtframe');
  const frame = await iframe.contentFrame();
  await page.waitForTimeout(3000); //hacky solution that can be improve by a better predicate that waits for whatever we need to wait for (content frame is loading asynchronously) - wait for it to load

  const selectTerm = await frame.waitForSelector('#UM_DERIVED_SA_UM_TERM_DESCR');
  const selectDayOfWeek = await frame.waitForSelector('#CLASS_SRCH_WRK2_INCLUDE_CLASS_DAYS');
  const inputOpenClasses = await frame.waitForSelector('#CLASS_SRCH_WRK2_SSR_OPEN_ONLY');
  const selectSubject = await frame.waitForSelector('[id="CLASS_SRCH_WRK2_SUBJECT$108$"]');

  await page.waitForTimeout(2000); //hacky solution that can be improve by a better predicate that waits for whatever we need to wait for (content frame is loading asynchronously) - wait for it to load

  //await everything - put a reminder
  //grab all the options
  const subjectsMapping = await selectSubject.$$eval('option', elements => Object.fromEntries(elements.map(elem => [elem.value, elem.textContent.trim()])));
  const subjects = Object.keys(subjectsMapping);
  subjects.shift();
  console.log(subjects);

  for (const subject of subjects) {
    await page.goto("https://www.spire.umass.edu/psp/heproda/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&cmd=login&errorCode=105&languageCd=ENG#", { waitUntil: 'load' })

    await page.click('#content > div > div.help.col-md-4.order-3 > p:nth-child(2) > a');
    const iframe = await page.waitForSelector('#ptifrmtgtframe');
    const frame = await iframe.contentFrame();
    await page.waitForTimeout(3000);

    const selectTerm = await frame.waitForSelector('#UM_DERIVED_SA_UM_TERM_DESCR');
    const selectDayOfWeek = await frame.waitForSelector('#CLASS_SRCH_WRK2_INCLUDE_CLASS_DAYS');
    const inputOpenClasses = await frame.waitForSelector('#CLASS_SRCH_WRK2_SSR_OPEN_ONLY');
    const selectSubject = await frame.waitForSelector('[id="CLASS_SRCH_WRK2_SUBJECT$108$"]');

    await page.waitForTimeout(3000);

    //handle the case of no search results being outputted
    console.log('starting: ', subject)

    await selectTerm.select('1233');
    await selectSubject.select(subject);
    await frame.$$eval('[id$="ICField158"] .PSCHECKBOX', elements => { elements.forEach(el => el.click()) })
    await selectDayOfWeek.select('J');
    await frame.$eval('#CLASS_SRCH_WRK2_SSR_OPEN_ONLY', el => el.click());

    await page.waitForTimeout(2_000);
    //once again some kind of async loading
    //could do a spam click loop


    await frame.$eval('#CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH', el => el.click());
    const iframe_courses = await page.waitForSelector('#ptifrmtgtframe');
    const frame_courses = await iframe_courses.contentFrame();
    await page.waitForTimeout(2000); //hacky solution that can be improve by a better predicate that waits for whatever we need to wait for (content frame is loading asynchronously) - wait for it to load

    try {
      await frame_courses.waitForSelector('[id="ACE_$ICField102$0"] > tbody > tr', { timeout: 10000 });
    }
    catch (error) {
      console.log('no courses for this subject:', subject)
      console.error(error);
      continue;
    }

    const headers = await frame_courses.$$eval('[id^="DERIVED_CLSRCH_DESCR200"]', els => els.map(e => e.textContent.trim()));
    if(headers.length === 0)
      throw Error('Headers length 0');

    ////////////////////////////
    const result = await frame_courses.$$eval(".PSLEVEL1SCROLLAREABODY", (els, headers, subject) => {
      const result = [];

      /// for browser:
      const sections = els;

      if (sections.length !== headers.length)
        throw Error('Sections length was not the same as headers length');

      sections.forEach((section, i) => {
        const sectionRows = section.querySelectorAll(":scope > tbody > tr");
        const header = headers[i];

        const initializeSectionData = () => ({
          // add all fields here set to null
          course_title: header,
          course_subject: subject,
          course_spire_id: null,
          instructor_name: null,
          days: null,
          start_time: null,
          end_time: null,
          building_room_name: null,
        });
        let sectionData = initializeSectionData();

        for (let j = 0; j < sectionRows.length; j++) {
          const currentRow = sectionRows[j];

          const spire_id = currentRow.querySelector('[id^="DERIVED_CLSRCH_SSR_CLASSNAME_LONG"]');
          const section_daytime = currentRow.querySelector('[id^="MTG_DAYTIME"]');

          if (spire_id) {
            sectionData.course_spire_id = spire_id.textContent.trim();
          }
          else if (section_daytime) {
            sectionData.instructor_name = currentRow.querySelector('[id^="win0divUM_DERIVED_SR_UM_HTML1"]').textContent.trim();

            //handle days, start_time, and end_time
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            temp_days_short = section_daytime.textContent.trim().substring(0, section_daytime.textContent.trim().indexOf(' '));
            temp_days = [];
            temp_days_short.includes('Mo') ? temp_days.push(daysOfWeek[0]) : null;
            temp_days_short.includes('Tu') ? temp_days.push(daysOfWeek[1]) : null;
            temp_days_short.includes('We') ? temp_days.push(daysOfWeek[2]) : null;
            temp_days_short.includes('Th') ? temp_days.push(daysOfWeek[3]) : null;
            temp_days_short.includes('Fr') ? temp_days.push(daysOfWeek[4]) : null;
            temp_days_short.includes('Sa') ? temp_days.push(daysOfWeek[5]) : null;
            temp_days_short.includes('Su') ? temp_days.push(daysOfWeek[6]) : null;

            temp_time = section_daytime.textContent.trim().substring(section_daytime.textContent.trim().indexOf(' ') + 1);
            temp_start_time = temp_time.substring(0, temp_time.indexOf(" "));
            temp_end_time = temp_time.substring(temp_time.lastIndexOf(" ") + 1, temp_time.length);

            function convertTo24Hour(time) {
              time = time.toUpperCase();
              var hours = parseInt(time.substr(0, 2));
              if(time.indexOf('AM') != -1 && hours == 12) {
                  time = time.replace('12', '0');
              }
              if(time.indexOf('PM')  != -1 && hours < 12) {
                  time = time.replace(hours, (hours + 12));
              }
              return time.replace(/(AM|PM)/, '');
          }

            sectionData.days = temp_days;
            sectionData.start_time = convertTo24Hour(temp_start_time);
            sectionData.end_time = convertTo24Hour(temp_end_time);
            sectionData.building_room_name = currentRow.querySelector('[id^="MTG_ROOM"]').textContent.trim();

            result.push(sectionData);
            sectionData = initializeSectionData();
          }
        }
      });

      return result
    }, headers, subjectsMapping[subject]);

    console.log(result);
    // assume result = something
    const fname = `result.json`;
    const fileContent = await fs.readFile(fname, {encoding: "utf-8"});

    try {
      const existingResults = JSON.parse(fileContent);
      existingResults.push(...result);
      await fs.writeFile(fname, JSON.stringify(existingResults, null, 2));
    }
    catch (err) {
      await fs.writeFile(fname, JSON.stringify(result, null, 2));
    }
  }
}
start()