import { Upload } from './Upload';
import { Init } from './Init';
import argv from '../args';

type APPS = 'UPLOAD'|'INIT';

const MAP: any = {
  UPLOAD: Upload,
  INIT: Init,
};

const getApp = (app: APPS) => {
  return MAP[app] || MAP['UPLOAD'];
};

export const dispatchApp = () => {
  const appFlag = (argv._[0] || '').toLocaleUpperCase();

  const app = getApp(appFlag);

  app();
};
