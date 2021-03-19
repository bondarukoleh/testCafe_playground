require('dotenv').config();
const {
  REPORT_PORTAL_DOMAIN,
  REPORT_PORTAL_TOKEN,
  REPORT_PORTAL_PROJECT_NAME,
  REPORT_PORTAL_LAUNCH_NAME,
  REPORT_PORTAL_PROTOCOL
} = process.env;

const argsForReportPlugin = [
  `--rdomain=${REPORT_PORTAL_DOMAIN}`,
  `--rtoken=${REPORT_PORTAL_TOKEN}`,
  `--rlaunch=${REPORT_PORTAL_LAUNCH_NAME}`,
  `--rproject=${REPORT_PORTAL_PROJECT_NAME}`,
  `--rprotocol=${REPORT_PORTAL_PROTOCOL}`,
];

process.argv.push(...argsForReportPlugin);
