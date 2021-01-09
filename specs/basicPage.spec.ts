import {Selector} from "testcafe";
import {demoURL} from '../data';
import {pages} from "../lib/page.objects/pages";


const {homePage} = pages;

fixture `Basic page` .page `${demoURL}`

test("Click something", async t => {
  await homePage.clickOn({header: {prising: null}})
})
