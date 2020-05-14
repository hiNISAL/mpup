"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingOption = void 0;

const MissingOption = (option, mark = '') => {
  throw new Error(`缺少配置项目 ${option} 。 ${mark}`.red);
};

exports.MissingOption = MissingOption;