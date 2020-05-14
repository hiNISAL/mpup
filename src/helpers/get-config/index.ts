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

const exportConfig: iConfig = Object.assign(new DefaultConfig(), customConfig);

export default exportConfig;
