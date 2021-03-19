import {demoURL} from '../data';
import {pages} from "../lib/page.objects/pages";
import {assertion} from "../lib/helpers/reportDecorators";

const {homePage} = pages;

fixture `Basic page Suite` .page `${demoURL}`

test("Click something TEST", async t => {
  await homePage.clickOn({header: {prising: {}}})
  const d = await homePage.getSomething();
  await assertion(`Check something`, async () => t.expect(true).eql(true))
})
