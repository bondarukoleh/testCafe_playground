import {Selector} from "testcafe";
import {testCafeExampleURL} from "../data";

fixture `Assertion fixture` .page `${testCafeExampleURL}`

test(`Test 1`, async t => {
  await t
    .setTestSpeed(0.5)
    .expect(Selector('#something').innerText).eql('sometext')
    .expect({a: 1}).ok({timeout: 1000}) // truthy
    .expect(Selector('#something').value).eql('')
})
