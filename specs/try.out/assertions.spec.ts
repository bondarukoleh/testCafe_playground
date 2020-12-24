import {Selector} from "testcafe";
import {testCafeExampleURL} from "../../data";

fixture.meta('type', 'assertions') `Assertion fixture` .page `${testCafeExampleURL}`
const input = Selector('#developer-name');

test.meta('kkey', 'vvvalue').page(`${testCafeExampleURL}`)("Test Name 1", async t => {
  await t
    .setTestSpeed(0.5)
    .typeText(input, 'sometext')
})

test.meta('aa', 'bb').page(`${testCafeExampleURL}/example`)("Test Name 2", async t => {
  await t
    .setTestSpeed(0.5)
    .typeText(input, 'AAAAAAAAAAAAAAA')
})


test.skip(`Test 1`, async t => {
  await t
    .setTestSpeed(0.5)
    .typeText(input, "Some text")
    .expect(Selector('#something').innerText).eql('sometext')
    .expect({a: 1}).ok({timeout: 1000}) // truthy
    .expect(Selector('#something').value).eql('')
})
