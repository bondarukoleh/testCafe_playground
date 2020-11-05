import {Selector} from "testcafe";
import {testCafeExampleURL} from "../data";

fixture `First fixture` .page `${testCafeExampleURL}`
  .before(async () => {
    console.log('FIXTURE: Before all tests')
  })
  .beforeEach(async (t) => {
    // await t.maximizeWindow();
    console.log('FIXTURE: Before each test');
  })
  .afterEach(async (t) => {
    console.log('FIXTURE: After each test')
  })
  .after(async () => console.log('FIXTURE: After all test'))

test
  .before(async (t) => {
    console.log('TEST: Before particular test');
    // console.log(t.browser);
  })
  .after(async (t) => {
    console.log('TEST: After particular test');
    // console.log(t.browser);
  })
(`Test 1`, async controller => {
  console.log('TEST: In test 1');
})

test(`Test 2`, async controller => {
  console.log('TEST:  In test 2');
})

/* OUTPUT:
First fixture
FIXTURE: Before all tests
TEST: Before particular test // test before/after each rewrite fixtures before/after each
TEST: In test 1
TEST: After particular test
 √ Test 1
FIXTURE: Before each test
TEST:  In test 2
FIXTURE: After each test
FIXTURE: After all test
* */