const createTestCafe = require('testcafe');
require('./prepareReporter')

let testCafeInstance = null;

createTestCafe('localhost', 1337, 1338)
  .then(testcafe => {
    testCafeInstance = testcafe;
    const runner = testcafe.createRunner();
    console.log(process.argv);

    return runner
      .src('./specs/*.spec.ts')
      .browsers(['chrome'])
      .reporter('reportportal-plugin')
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
