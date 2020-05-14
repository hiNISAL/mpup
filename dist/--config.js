/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./autoup.config.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./autoup.config.js":
/*!**************************!*\
  !*** ./autoup.config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  // 微信开发者工具安装路径\n  mpToolPath: '2',\n  // 项目路径\n  projectPath: '3',\n\n  // 执行命令的路径\n  execPath: '',\n\n  // 上传前执行的命令列表\n  commands: [\n    {\n      // 命令执行前做的事情\n      async before() {\n\n      },\n      // 命令执行后做的事情\n      async after() {\n\n      },\n      // 命令\n      cmd: '',\n      // 执行命令的路径\n      execPath: '',\n    },\n  ],\n\n  // 所有命令执行完前\n  async beforeExecAllCmd() {\n\n  },\n\n  // 所有命令执行完后\n  async afterExecAllCmd() {\n\n  },\n\n  // 上传前\n  async beforeUpload() {\n\n  },\n\n  // 上传完毕\n  async done() {\n\n  },\n\n  /** 服务端上传相关 */\n\n  // 和远端校验的 token\n  token: '',\n\n  // 远端地址\n  remote: '',\n\n  // 是否启用服务端上传\n  useServerUpload: false,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hdXRvdXAuY29uZmlnLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXV0b3VwLmNvbmZpZy5qcz8xZTUxIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyDlvq7kv6HlvIDlj5HogIXlt6Xlhbflronoo4Xot6/lvoRcbiAgbXBUb29sUGF0aDogJzInLFxuICAvLyDpobnnm67ot6/lvoRcbiAgcHJvamVjdFBhdGg6ICczJyxcblxuICAvLyDmiafooYzlkb3ku6TnmoTot6/lvoRcbiAgZXhlY1BhdGg6ICcnLFxuXG4gIC8vIOS4iuS8oOWJjeaJp+ihjOeahOWRveS7pOWIl+ihqFxuICBjb21tYW5kczogW1xuICAgIHtcbiAgICAgIC8vIOWRveS7pOaJp+ihjOWJjeWBmueahOS6i+aDhVxuICAgICAgYXN5bmMgYmVmb3JlKCkge1xuXG4gICAgICB9LFxuICAgICAgLy8g5ZG95Luk5omn6KGM5ZCO5YGa55qE5LqL5oOFXG4gICAgICBhc3luYyBhZnRlcigpIHtcblxuICAgICAgfSxcbiAgICAgIC8vIOWRveS7pFxuICAgICAgY21kOiAnJyxcbiAgICAgIC8vIOaJp+ihjOWRveS7pOeahOi3r+W+hFxuICAgICAgZXhlY1BhdGg6ICcnLFxuICAgIH0sXG4gIF0sXG5cbiAgLy8g5omA5pyJ5ZG95Luk5omn6KGM5a6M5YmNXG4gIGFzeW5jIGJlZm9yZUV4ZWNBbGxDbWQoKSB7XG5cbiAgfSxcblxuICAvLyDmiYDmnInlkb3ku6TmiafooYzlrozlkI5cbiAgYXN5bmMgYWZ0ZXJFeGVjQWxsQ21kKCkge1xuXG4gIH0sXG5cbiAgLy8g5LiK5Lyg5YmNXG4gIGFzeW5jIGJlZm9yZVVwbG9hZCgpIHtcblxuICB9LFxuXG4gIC8vIOS4iuS8oOWujOavlVxuICBhc3luYyBkb25lKCkge1xuXG4gIH0sXG5cbiAgLyoqIOacjeWKoeerr+S4iuS8oOebuOWFsyAqL1xuXG4gIC8vIOWSjOi/nOerr+agoemqjOeahCB0b2tlblxuICB0b2tlbjogJycsXG5cbiAgLy8g6L+c56uv5Zyw5Z2AXG4gIHJlbW90ZTogJycsXG5cbiAgLy8g5piv5ZCm5ZCv55So5pyN5Yqh56uv5LiK5LygXG4gIHVzZVNlcnZlclVwbG9hZDogZmFsc2UsXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./autoup.config.js\n");

/***/ })

/******/ });