/* TODO: Not working properly, report portal isn't closing run */
type TestType = (testName: string, fn: (t: TestController) => Promise<any>) => any;
const {ReportingApi} = require('testcafe-reporter-agent-js-testcafe/build/reportingApi');

interface ITestDecorator {
  only: TestType;
  skip: TestType;

  (itName: string, fn: (t: TestController) => Promise<any>): any;
}

const testTyped = (function (itName, fn) {
  test(itName, testCallbackDecorator(itName, fn));
}) as ITestDecorator;

testTyped.only = function (itName: string, fn: (t) => any) {
  test.only(itName, testCallbackDecorator(itName, fn));
};

testTyped.skip = function (itName: string, fn: (t) => any) {
  test.skip(itName, testCallbackDecorator(itName, fn));
};

function testCallbackDecorator(itName, fn: Function) {
  return async (t) => {
    ReportingApi.addAttributes([
      {
        key: `Browser:`,
        value: t.browser.alias,
      }
    ]);

    try {
      await fn(t);
    } catch (e) {
      throw e;
    }
  };
}

export {testTyped as test};
