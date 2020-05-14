export const MissingOption = (option: string, mark = '') => {
  throw new Error(`缺少配置项目 ${option} 。 ${mark}`.red);
};
