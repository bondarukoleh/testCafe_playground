import {Selector} from "testcafe";
import {testCafeExampleURL} from "../data";

const nameInput = Selector('#developer-name');
const osOption = Selector('#macos');
const submit = Selector('#submit-button');

fixture `First fixture` .page `${testCafeExampleURL}`

// we can run specific tests with meta data in command: testcafe --test-meta device=mobile,env=prod
// to add metadata in test use fixture.meta or test.meta
test.skip.page(`https://devexpress.github.io/testcafe/example/`)
  .meta('testID', 'test 1')
(`Reach the example page`, async controller => {
  await controller
    .typeText(nameInput, 'Hello Oleh')
    .click(osOption)
    .click(submit);
})

test.skip.meta({author: 'John'})
  (`Reach the example page 2`, async controller => {
    await controller
      .typeText(nameInput, 'Hello Oleh')
      .click(osOption)
      .click(submit);
  })