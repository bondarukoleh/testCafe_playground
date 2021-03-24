function cld(argumentNames) {
  return function(parentClass, name, descriptor) {
    const originalF = descriptor.value;

    descriptor.value = function (...args) {
      console.log(`Function name: "${name}"`);
      console.log(`Should have arguments: "${argumentNames.toString()}"`);
      args.forEach((arg) => {
        console.log(`Got the argument `, arg);
      })
      return originalF(...args);
    }

    return descriptor;
  }
}


export function customReporter () {
  // return new Reporter();
  return {
    async reportTaskStart (startTime, userAgents, testCount) {
      console.log('reportTaskStart method');
      ['startTime', 'userAgents', 'testCount'].forEach((key, i) => {
        console.log(`key "${key}" has value ${arguments[i]}`);
      })
    },

    async reportFixtureStart (name, path, meta) {
      console.log('reportFixtureStart method');
      ['name', 'path', 'meta'].forEach((key, i) => {
        console.log(`key "${key}" has value ${arguments[i]}`);
      })
    },

    async reportTestStart (name, meta) {
      console.log('reportTestStart method');
      ['name', 'meta'].forEach((key, i) => {
        console.log(`key "${key}" has value ${arguments[i]}`);
      })
    },

    async reportTestDone (name, testRunInfo, meta) {
      console.log('reportTestDone method');
      ['name', 'testRunInfo', 'meta'].forEach((key, i) => {
        console.log(`key "${key}" has value ${arguments[i]}`);
      })
    },

    async reportTaskDone (endTime, passed, warnings, result) {
      console.log('reportTaskDone method');
      ['endTime', 'passed', 'warnings', 'result'].forEach((key, i) => {
        console.log(`key "${key}" has value ${arguments[i]}`);
      })
    },
  }
}
