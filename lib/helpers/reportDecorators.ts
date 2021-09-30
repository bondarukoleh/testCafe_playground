const {ReportingApi} = require('testcafe-reporter-agent-js-testcafe/build/reportingApi');
import {getScreenshotObject} from './screenShots'

function step(name: string) {
  return function (parentClass: object, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const originalFunction = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args) {
      ReportingApi.info(`"${name}" step.`);

      args.forEach((arg) => {
        try {
          ReportingApi.info(`Argument for "${name}" step ${JSON.stringify(arg)}`);
        } catch (e) {
        }
      })
      try {
        const result = await originalFunction.apply(this, args)
        return result;
      } catch (e) {
        ReportingApi.error(`Error. "${name}" step - failed`, await getScreenshotObject());
        ReportingApi.setStatusInterrupted();
        throw e;
      }
    }
    return propertyDescriptor;
  }
}

async function assertion(name: string, fn: () => any) {
  try {
    await fn()
  } catch (e) {
    ReportingApi.error(`Assertion error. Assertion: "${name}" - failed`, await getScreenshotObject());
    ReportingApi.setStatusFailed()
    throw e
  }
}

export function setBrowserName(t: TestController){
  ReportingApi.addAttributes([
    {
      key: `Browser:`,
      value: t.browser.alias,
    }
  ]);
}

export {step, assertion}
