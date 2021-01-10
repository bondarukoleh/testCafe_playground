import {Selector} from "testcafe";
import {demoURL} from '../../data';

fixture `Basic flows` .page `${demoURL}`
const input = Selector('#developer-name');

test("Checkout", async t => {
  await t
    .setTestSpeed(0.5)
    .typeText(input, 'sometext')
})
