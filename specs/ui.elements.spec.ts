import {Selector} from "testcafe";
import {testCafeExampleURL} from "../data";

const nameInput = Selector('#developer-name');
const osOption = Selector('#macos');
const submit = Selector('#submit-button');

fixture`UI elements fixture`.page`${testCafeExampleURL}`

test.skip(`Navigate to some page`, async t => {
  await t
    .navigateTo('https://www.google.com')
})

test.skip(`Iframe switch`, async t => {
  const iframe = Selector('#iframe');
  const textArea = Selector('#textArea');
  const textToEnter = 'Inserted text';

  await t
    .switchToIframe(iframe)
    .click(textArea)
    .pressKey('ctrl+a delete')
    .typeText(textArea, textToEnter)
    .expect(textArea.innerText).contains(textToEnter)
    .switchToMainWindow();
})

test.skip('Select', async t => {
  const interfaceSelect = Selector('select#prefered-interface');
  const interfaceOptions = interfaceSelect.find('option');

  await t
    .click(interfaceSelect)
    .click(interfaceOptions.withText('Both'));
})

test.skip('Upload', async t => {
  const fileUpload = Selector('input#file-upload');
  const uploadFileButton = Selector('input#file-submit.button');

  await t
    .setFilesToUpload(fileUpload, '../data/index.*') // automatically wait for file upload
    .clearUpload(fileUpload) // you can easily clear the path
    .setFilesToUpload(fileUpload, '../data/index.*')
    .click(uploadFileButton);
})

test.skip('Reduce test speed, wait for page to load speed', async t => {
  await t
    .setTestSpeed(0.5) // from 1 (fastest) to 0.01 (slowest)
    .setPageLoadTimeout(10000) // from 0 (no wait) to any time you want to wait for page loading
    .navigateTo('https://www.google.com')
})

test.skip('Drag and drop', async t => {
  const checkBox = Selector('label').withText("I have tried TestCafe");
  const elementDragged = Selector('#slider');

  await t
    .click(checkBox)
    .drag(elementDragged, 400, 0, {offsetX: 10, offsetY: 10} )
})

test.skip('Hover', async t => {
  const checkBox = Selector('label').withText("I have tried TestCafe");
  await t
    .hover(checkBox)
})