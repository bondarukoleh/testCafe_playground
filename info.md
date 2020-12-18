## Main concept
TestCafe stands for that you don't need an driver to run end-to-end tests in the browser. The page can run all the test
scripts that emulate user actions. This would allow for true cross-browser and cross-platform tests that run on any
device that has a modern browser.

Client-server architecture \
TestCafe runs test code written by the user in the Node.js, "server side". \
Tests that emulate user activity run in the browser on the same or on a different device. This is the "client side".

TestCafe tests combine advantages of the browser scripts (built-in waiting, mobile testing) and standalone server-side
code (access to the app's server and testing environment, better control over test execution).

To provide tests, "client-side code" to the browser, TestCafe runs a **reverse proxy** under the hood. It proxies the
tested page on the server and injects the scripts into its code.

Script injection enables TestCafe key features like mobile testing, automatic waiting, or user roles for smart authentication out of the box.

Isolated tests
Each test starts with a clean browser state. Cookies and storages are reset, an empty user profile is used, and the tested page is reloaded. This helps prevent interference between tests without extra boilerplate code.

## Test Execution
TestCafe can detect browsers on your local machine.
Supports browsers like Chrome (& mobile), IE 11, Edge, Firefox, Safari (& mobile).
```shell
$ testcafe --list-browsers; #firefox chrome ie edge opera edge-legacy
$ testcafe chrome ./specs/ui.elements.spec.ts # to run your spec in chrome
$ testcafe all ./specs/ui.elements.spec.ts # to run your spec in chrome
```

### Config
`.testcaferc.json` file in root dir.
Command line settings override values from the configuration file in case they differ
```js
{
  "browsers": ["chrome"], /* you can ser the  objects with settings for browsers */
  "src": ["./specs/ui.elements.spec.ts"], /* we can add patterns and so on */
  "reporter": "spec", /*list, minimal, xUnit, JSON. It's pretty configurable */
  "screenshots": {
      path: 'reports/screenshots/',
      takeOnFails: true,
      pathPattern: '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png'
    },
  "videoPath": "reports/screen-captures",
  "videoOptions": {
    "singleFile": true,
    "failedOnly": true,
    "pathPattern": "${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4"
  },
  "quarantineMode": true /* Retrier, from the box, with the 3 times retry and marks tests as non-deterministic (flaky) and unstable */
  "debugMode": true /* ability to control the test in browser */
  "filter": { 
    "test": "Click a label", /* a bunch of methods to filter the tests */
    "testGrep": "Click.*"
    "fixture": "Sample fixture"
    "fixtureGrep": "Page.*"
    "testMeta": {
      "device": "mobile",
        "env": "production"
    }
    "fixtureMeta": {
      "device": "mobile",
        "env": "production"
    }
    "appCommand": "node server.js" /* before tests */
    "appInitDelay": 3000 /* wait for application to launched with the appCommand option to initiali */
    "concurrency": 3 /* Specifies the number of browser instances that should run tests concurrently. */
    "selectorTimeout": 3000 /* implicit timeout before get the locator */
    "assertionTimeout": 1000 /* implicit timeout before fail the assertion */
    "pageLoadTimeout": 1000 /* implicit timeout */
    "speed": 0.1 /* test speed */
    "clientScripts": [ /* Injects scripts into pages during the tests. Use this for client-side mock functions or helper scripts. */
      {
        "module": "lodash"
      },
      {
        "path": "scripts/react-helpers.js",
        "page": "https://myapp.com/page/"
      }
    ]
    "port1": 12345, /* set the port testcafe runs */
    "proxy": "proxy.corp.mycompany.com" /* Specifies the proxy server used in your local network to access the Internet. */
    "disablePageCaching": true /* Prevents the browser from caching page content. */
  }
}

```



