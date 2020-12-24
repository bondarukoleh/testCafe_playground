import {Selector} from "testcafe";
import {testCafeExampleURL} from "../../data";

fixture `Waiters` .page `${testCafeExampleURL}`
const input = Selector('#developer-name1');

test("Test Waiter 1", async t => {
  const inputElem = await input.with({visibilityCheck: true, timeout: 500})

  await t
    .setTestSpeed(0.5)
    .typeText(inputElem, 'sometext')
})