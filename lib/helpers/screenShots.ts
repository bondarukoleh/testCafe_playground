import {t} from 'testcafe'
import * as path from 'path';
import * as fs from 'fs';

const {ReportingApi} = require('testcafe-reporter-agent-js-testcafe/build/reportingApi');

function makeHash(length: number = 10, justNumbers = false): string {
  let text = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return text
}


export async function getScreenshotObject(): Promise<{name: string, type: string, content: string}> {
  const {browser: {name, os, platform}} = t;
  const date = new Date()
    .toLocaleDateString(undefined,
      {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long",
        hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})
    .replace(/\/|:|,|\s/g, '_');
  const screenshotName = makeHash()
  const screenshotPath = `${name}_${os.name}_${platform}/${date}/${screenshotName}.png`

  console.log(screenshotPath);
  await t.takeScreenshot(screenshotPath);

  let fileContent = Buffer.from(`Couldn't read the screenshot`).toString('base64')
  try {
    fileContent = fs.readFileSync(path.join(process.cwd(), 'artifacts/screenshots', screenshotPath)).toString
    ('base64')
    console.log(path.join(process.cwd(), 'artifacts/screenshots', screenshotPath));
  } catch (e) {
    ReportingApi.warn(`Couldn't read the screenshot path.`)
  }

  return {
    name: screenshotName,
    type: 'image/png',
    content: fileContent
  };
}
