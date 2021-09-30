const createTestCafe = require('testcafe');
require('dotenv').config()
// require('./prepareReporter')
// const customReporter = require('./lib/helpers/custom.reporter')
const { createReporter } = require('testcafe-reporter-agent-js-testcafe/build/createReporter');
const rpConfig = require('./reportPortalConfig')
let testCafeInstance = null;

createTestCafe('localhost', 1337, 1338)
  .then(testcafe => {
    testCafeInstance = testcafe;
    const runner = testcafe.createRunner();

    return runner
      .src(['specs/*.spec.ts'])
      .browsers(['chrome', 'firefox'])
      // .reporter(customReporter)
      // .reporter('reportportal')
      // .reporter(createReporter(rpConfig))
      .reporter(['spec', createReporter(rpConfig)])
      // .filter((testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
      //   const {testMetaInfo} = fixtureMeta;
      //   return !!testMetaInfo;
      // })
      .run();
  })
  .catch(err => {
    console.log('WENT WRONG with runner');
    console.log(err);
  })
  .finally(() => {
    if (testCafeInstance) {
      return testCafeInstance.close();
    }
  });
