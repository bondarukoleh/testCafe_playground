import {Selector} from "testcafe";
import {testCafeExampleURL} from "../../data";

const firstName = "Test Waiter 1"
const secondName = "Test Waiter 2"

fixture `Waiters` .page `${testCafeExampleURL}`
const input = Selector('#developer-name');

test(firstName, async t => {
  const inputElem = await input.with({visibilityCheck: true, timeout: 500})

  await t
    // .setTestSpeed(0.5)
    .takeElementScreenshot(inputElem, "path_to_screenShot", {includeMargins: true})
    .takeScreenshot({fullPage: true, path: `./screenShots/${firstName}`})
    .typeText(inputElem, 'sometext')
})

test.skip(secondName, async t => {
  const inputElem = await input.with({visibilityCheck: true, timeout: 500})

  await t
    // .setTestSpeed(0.5)
    .takeElementScreenshot(inputElem)
    .takeScreenshot({fullPage: true, path: `./screenShots/${secondName}`})
    .typeText(inputElem, 'sometext')
})