const {REPORT_PORTAL_TOKEN, REPORT_PORTAL_PROJECT_NAME, REPORT_PORTAL_DOMAIN, REPORT_PORTAL_MODE} = process.env;

module.exports = {
  "token": REPORT_PORTAL_TOKEN,
  "endpoint": `${REPORT_PORTAL_DOMAIN}/api/v1`,
  "project": REPORT_PORTAL_PROJECT_NAME,
  "launch": "YourLauncherName",
  "attributes": [
  {
    "key": "KeyFromAttr",
    "value": "ValueFromAttr"
  },
  {
    "value": "JustValue"
  }
],
  "description": "Your launch description",
  // "rerun": true,
  // "rerunOf": "launchUuid of already existed launch",
  "mode": REPORT_PORTAL_MODE,
  "skippedIssue": true,
  "debug": false
}
