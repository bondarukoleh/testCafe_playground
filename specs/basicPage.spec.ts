import {demoURL} from '../data';
import {pages} from "../lib/page.objects/pages";
import {assertion, setBrowserName} from "../lib/helpers/reportDecorators";

const {ReportingApi} = require('testcafe-reporter-agent-js-testcafe/build/reportingApi');

const {homePage} = pages;

fixture.meta({
  description: 'Basic page Suite meta description',
  attributes: [{
    key: 'Basic page Suite meta attr',
    value: 'Basic page Suite meta attr'
  }, {value: 'Just suite meta value'}],
})`Basic page Suite`.page`${demoURL}`.meta({'testMetaInfo': true})

.beforeEach(async (t) => setBrowserName(t))

test("Click something TEST", async t => {
  ReportingApi.setTestCaseId('AddedTestID_TO_TEST');
  ReportingApi.log('INFO', 'Added extra info to test attachment');

  // await t.debug()
  await homePage.clickOn({header: {signIn: {}}})
  const d = await homePage.getSomething();
  await assertion(`Check something`, async () => t.expect(d.someData).eql('data'))
})

test.only("Some Other test", async t => {
  const d = await homePage.getSomethingElse();
})

test("Assertion error test", async t => {
  await t.navigateTo('www.google.com');
  await assertion(`Check something else`, async () => t.expect(true).eql(false))
})
