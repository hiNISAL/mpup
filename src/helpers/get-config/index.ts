import args from '../../args/index';
import DefaultConfig from '../../config/default.config';
import { resolvePath } from '../../helpers/utils';
import { iConfig } from '../../common.d';

const {
  config,
  ver,
  desc,
  mptool,
  project,
} = args;
let customConfig: iConfig = {};

if (config) {
  try {
    const path = resolvePath(process.cwd(), config || '');

    customConfig = require(path);
  } catch (e) {
    customConfig = {};
  }
}

if (ver) {
  customConfig.ver = ver;
}

if (desc) {
  customConfig.desc = desc;
}

if (mptool) {
  customConfig.mpToolPath = mptool;
}

if (project) {
  customConfig.projectPath = project;
}

const defaultConfig = new DefaultConfig();

const { login } = customConfig;
const { login: defaultLoginConfig } = defaultConfig;

const exportConfig: iConfig = Object.assign(defaultConfig, customConfig);

exportConfig.login = Object.assign(defaultLoginConfig, login);

export default exportConfig;
