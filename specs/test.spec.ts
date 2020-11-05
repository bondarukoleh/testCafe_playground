import {Selector} from "testcafe";
const testCafeExampleURL = `https://devexpress.github.io/testcafe/example/`

const nameInput = Selector('#developer-name');
const osOption = Selector('#macos');
const submit = Selector('#submit-button');

fixture `First fixture`.page`${testCafeExampleURL}`

test.page(`https://devexpress.github.io/testcafe/example/`)
(`Reach the example page`, async controller => {
  await controller
    .typeText(nameInput, 'Hello Oleh')
    .click(osOption)
    .click(submit);
})