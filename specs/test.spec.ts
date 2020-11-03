import {Selector} from "testcafe";
const testCafeExampleURL = `https://devexpress.github.io/testcafe/example/`

fixture `First fixture`.page`${testCafeExampleURL}`

test(`Reach the example page`, async controller => {
  const nameInput = await Selector('#developer-name');

  await controller.typeText(nameInput, 'Hello Oleh');
  await controller.wait(5000);
})