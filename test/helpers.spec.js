const path = require('path');

var getAppConfig,
  mergeAppConfig;

beforeEach(inject(() => {
  getAppConfig = require('../etc/helpers').getAppConfig;
  mergeAppConfig = require('../etc/helpers').getAppConfig;

}));
describe('getAppConfig', () => {

  it('should read appConfig', () => {
    var appConfig = getAppConfig();
    expect(appConfig).toBeDefined();
  });

});

describe('mergeAppConfig', () => {

  it('should read default to appConfig', () => {
    var appConfig = mergeAppConfig();
    expect(appConfig).toBeDefined();
  });

  it('should work with empty config', () => {
    var appConfig = mergeAppConfig({});
    expect(appConfig.srcSASS).toBeDefined();
  });

  it('should work with overwritten config', () => {
    var appConfig = mergeAppConfig({srcPath: 'src', testPath: 'tests'});
    expect(appConfig.src).toBe(path.resolve(__dirname, '..', 'src'));
    expect(appConfig.srcSASS).toBe(path.resolve(__dirname, '..', 'src', 'scss'));
    expect(appConfig.srcI18N).toBe(path.resolve(__dirname, '..', 'src', 'app', 'i18n'));
    expect(appConfig.srcIMG).toBe(path.resolve(__dirname, '..', 'src', 'img'));
    expect(appConfig.test).toBe(path.resolve(__dirname, '..', 'tests'));
  });

});
