import allureReporter from '@wdio/allure-reporter';
import log from './src/log';
import setCustomWdioCommands from './src/commands/setCustomWdioCommands';
import * as path from 'path';

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.ts'],

  suites: {
    start: ['./test/specs/*equal*.ts', './test/specs/*edit*.ts'],
  },
  maxInstances: 2,

  capabilities: [
    {
      browserName: 'chrome',
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'https://meowle.qa-fintech.ru/',
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  services: [
    'chromedriver',
    [
      'image-comparison',
      {
        baselineFolder: path.join(process.cwd(), 'screens'),
        formatImageName: '{tag}-{logName}-{width}x{height}',
        screenshotPath: path.join(process.cwd(), 'tmp'),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        tabbableOptions: {
          circle: {
            size: 18,
            fontSize: 18,
          },
          line: {
            color: '#ff221a',
            width: 3,
          },
        },
      },
    ],
  ],
  framework: 'mocha',
  reporters: [
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 600_000,
  },

  async before() {
    log.enableAll();
    setCustomWdioCommands();
    await browser.setTimeout({ implicit: 20_000, pageLoad: 20_000 });
  },

  async afterTest(test, scenario, { error }) {
    if (error) {
      const scr = await browser.takeScreenshot();
      const buffer = Buffer.from(scr, 'base64');
      allureReporter.addAttachment('error', buffer, 'image/png');
    }
  },
};
