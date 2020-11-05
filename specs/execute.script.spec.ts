import {Selector, ClientFunction} from "testcafe";
import {testCafeExampleURL} from "../data";

fixture `Execute script fixture` .page `${testCafeExampleURL}`

test(`Test 1`, async t => {
  const getLocation = ClientFunction(() => window.location.href.toString());

  await t
    .expect(getLocation()).contains('http')
})
