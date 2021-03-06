## Main concept
TestCafe stands for that you don't need a driver to run end-to-end tests in the browser. The page can run all the test
scripts that emulate user actions. This would allow for true cross-browser and cross-platform tests that run on any
device that has a modern browser.

Client-server architecture \
TestCafe runs test code written by the user in the Node.js, "server side". *Runner* executes test scripts in a server process. \
Tests that emulate user activity generated by TestCafe run in the browser. This is the "client side".

TestCafe tests combine advantages of the browser scripts (built-in waiting, mobile testing) and standalone server-side
code (access to the app's server and testing environment, better control over test execution).

To provide tests, "client-side code" to the browser, TestCafe runs a **reverse proxy** under the hood. It proxies the
tested page on the server and injects the scripts into its code.

Each test starts with a clean browser state. Cookies and storages are reset, an empty user profile is used, and the
tested page is reloaded. This helps prevent interference between tests without extra boilerplate code.

TestCafe starts proxy, and rewrite all the URLs from test script that user wrote - to proxy, starts the browser, injects
script to page, browser goes to proxy / test_site and starts to run the needed scenario. All resources from test_server
proxied thru proxy to browser, I haven't got the feature of it yet. TestCafe also mocks the browser API
to conceal automation scripts from the rest of the page code. The proxying mechanism ensures that the page appears
to be hosted at the original URL even to the test code.

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
    "concurrency": 3 /* -c in CLI, Specifies the number of browser instances that should run tests concurrently. */
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
## Test Execution
TestCafe can detect browsers on your local machine.
Supports browsers like Chrome (& mobile), IE 11, Edge, Firefox, Safari (& mobile).
```shell
$ testcafe --list-browsers; #firefox chrome ie edge opera edge-legacy
$ testcafe chrome ./specs/ui.elements.spec.ts # to run your spec in chrome
$ testcafe all ./specs/ui.elements.spec.ts # to run your spec in chrome
```

You can run tests in live mode, so when you change them - they will rerun. Watch mode name would be more understandable.
There are several ways to stop the watch mode
'Ctrl+S' - stops the test run; \
'Ctrl+R' - restarts the test run; \
'Ctrl+W' - enables/disables watching files; \
'Ctrl+C' - quits live mode and closes the browsers.
```shell
$ testcafe -L
```

To filter by test or meta - you need to add them
```ts
fixture.meta('type', 'assertions') `Assertion fixture` .page `${testCafeExampleURL}`
test.meta('some_key', 'value')("Test Name", async t => {})
```
```shell
testcafe chrome ./specs/assertions.spec.ts --test-meta type=assertions
testcafe chrome ./specs/assertions.spec.ts --test-meta some_key=value
testcafe chrome ./specs/assertions.spec.ts -t "Test Name 1" # by test name
```

Headless and chromium device emulation
```shell
testcafe chrome:headless ./specs/assertions.spec.ts -t "Test Name 1"
testcafe "chrome:emulation:device=iphone X" ./specs/assertions.spec.ts -t "Test Name 1"
```

TestCafe has build in waiters, you can manage them a little bit. So it waits for nodes in dom, visibility, server to 
respond via redirect, and so on.
```ts
const input = Selector('#developer-name1', {visibilityCheck: true, timeout: 10000});
// or
const inputElem = await input.with({visibilityCheck: true, timeout: 1000})
```

Debug is nice, you can easily control the test, use devtools after you "unlock" the page.
```ts
 await t
  .debug()
  .hover(checkBox)
```
```shell
testcafe chrome ./specs/assertions.spec.ts --debug-mode
```

We can take screenshots (requires .Net) at any time we want, and also an element we want.
```ts
.takeElementScreenshot(inputElem, "path_to_screenShot", {includeMargins: true}) // will save the screenshots in date folder
.takeScreenshot() 
.takeScreenshot({fullPage: true, path: `./screenShots/${secondName}`}) // will save in setted folder with secondName file name 
```
```shell
testcafe chrome ./specs/assertions.spec.ts -s takeOnFails=true
```

Video recording FFmpeg required `@ffmpeg-installer/ffmpeg`.
```shell
testcafe chrome ./specs/assertions.spec.ts --video artifacts/video --video-options failedOnly=true
```

#### Little theory
DDT - Data driven testing, big sets of data thru same actions.
BDD - Behavior driven development. Behavior files explain the test flow. Given - initial state of app, when - action, 
then - expected result.

#### Docker
To run testCafe in docker you can use testcafe image. There will be testcafe executable and firefox with chromium
```shell
docker pull testcafe/testcafe;
# After we have testcafe image
docker run -v ${TEST_FOLDER}:/tests -it testcafe/testcafe ${TESTCAFE_ARGS}  
```

You can also run on the mobile device, just scan the QR with your mobile. Not very useful for the CI. 
```shell
testcafe remote test.spec.ts --qr-code;
```

#### Report Portal
We can run report portal locally
```shell
curl https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml -o docker-compose.yml;
#To start ReportPortal in daemon mode
docker-compose -p reportportal up -d --force-recreate;
```

To use it with testCafe we need:
```shell
npm i testcafe-reporter-reportportal
```
Better add a couple env vars
```shell
# .env file
REPORT_PORTAL_BASE_URL='http://localhost:8080'
REPORT_PORTAL_TOKEN='xxx' #could be fount in report portal
REPORT_PORTAL_PROJECT_NAME='Testing my site'
REPORT_PORTAL_LAUNCH_NAME='Testing the UI' #optional
REPORT_PORTAL_TAGS=UITests, SomeOtherTag #optional
REPORT_PORTAL_DESCRIPTION='' #optional
```