function step(name: string) {
  return function (parentClass: object, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const originalFunction = propertyDescriptor.value;

    propertyDescriptor.value = async function(...args) {
      console.log(`"${name}" step.`);
      args.forEach((arg) => {
          try {
            JSON.stringify(arg);
            console.log(`Argument for "${name}" step ${JSON.stringify(arg)}`);
          } catch (e) {}
        })
      try {
        const result = await originalFunction.apply(this, args)
        return result;
      } catch (e) {
        console.error(`"${name}" step failed`);
        throw e;
      }
    }
    return propertyDescriptor;
  }
}

async function assertion(name: string, fn: () => any) {
  try {
    await fn()
    console.log(`Assertion: ${name} - passed`);
  } catch (e) {
    console.log(`Assertion: ${name} - failed`);
    throw e
  }
}

export {step, assertion}
