# mpup

微信小程序代码上传辅助工具，可处理前置操作，实现自动化上传工作流，理论支持任何微信小程序项目。

<center><img src="https://raw.githubusercontent.com/hiNISAL/mpup/master/doc-assets/images/cover.gif" style="max-width: 600px"></center>

利用[小程序开发者工具命令行工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)提供的能力实现。

此工具适合小程序代码上传前需要许多前置工作的项目，如需要编译、修改环境配置、跑钩子等。

**只能用于上传代码！提审与发布得在微信小程序后台操作！**

## 安装

```bash
npm install mpup -D

// 全局安装
npm install mpup -g
```

## 使用

> 命令行工具目录
>
> ```bash
> macOS: <安装路径>/Contents/MacOS/cli
> Windows: <安装路径>/cli.bat
> ```
>
> 通常 macOS 下命令行工具的默认目录是 `/Applications/wechatwebdevtools.app/Contents/MacOS`。
>
> windows 下命令行工具的默认目录是 `C:\\Program Files (x86)\\Tencent\\微信web开发者工具`。

```bash
npx mpup --project=项目路径 --mptool=小程序命令行工具所在路径 --ver=上传代码的版本号
```

## 必要的前置工作

1. 打开小程序的服务端口，(小程序开发者工具 => 设置 => 安全设置 => 开启服务端口)
2. 使用较新稳定版的开发者工具，测试中发现老的稳定版本、 RC 版本和 Nightly Build 版本的命令行工具可能无法运行
3. 登入开发者工具，且登入的账户拥有项目的上传代码权限

## 配置文件

### 生成配置文件

```bash
npx mpup init
```

### 登入开发者工具

```bash
npx mpup login --config=./mpup.config.js

npx mpup login --mptool=小程序命令行工具所在路径
```

如果不再配置文件中提供配置项，默认就是将二维码和登入结果输出。

提供 `login` 配置项：

```js
module.exports = {
  // ...

  login: {
    before({
      /** 登入的命令 */
      cmd,
      /** 中断方法 */
      abort,
      /** 配置文件 */
      config,
    }) {},
    qrGot({
      /** 可以直接在控制台输出的二维码 */
      terminal,
      /** 二维码图片的base64 */
      base64,
      /** 二维码内容，可以自己接工具生成二维码 */
      qrContent,
    }) {
      console.log(terminal);
    },
    after({
      /** 中断方法 */
      abort,
      /** 配置文件 */
      config,
      /** 子进程输出 */
      stdout,
    }) {
      console.log(stdout);
    },
    error({
      /** 中断方法 */
      abort,
      /** 配置文件 */
      config,
      /** 错误内容 */
      err,
    }) {
      console.log(err);
    },
  },

  // ...
};
```

### 配置详情

windows 在提供路径相关配置的时候，需要对 \ 做一次转义。

如 `C:\\Program Files (x86)\\Tencent\\微信web开发者工具`。

```js
module.exports = {
  /** 微信开发者工具安装路径 */
  mpToolPath: '',

  /** 项目路径 */
  projectPath: '',

  /** 本次要上传的代码版本号 */
  ver: '',

  /** 本次要上传的代码描述 */
  desc: '',

  /** 每次上传前询问版本和描述 */
  ask: true,

  /** 每次询问版本号的提示文案 */
  askVersionText: '版本号',

  /** 每次询问版本描述的提示文案 */
  askDescText: '版本描述',

  /** 执行命令的路径 */
  execPath: '',

  /** 默认输出命令的结果 */
  stdout: false,

  /** 上传中的 loading 文案 */
  uploadingText: '',

  /** 上传前执行的命令列表 */
  commands: [
    {
      /** 出错做的事 */
      async error({e, command, abort}) {},
      /** 命令执行前做的事情 */
      async before({config, command, abort}) {},
      /** 命令执行后做的事情 */
      async after({ abort, command, stdout }) {},
      /** 命令 */
      cmd: '',
      /** 执行命令的路径 优先级比上一层的 execPath 高 */
      execPath: '',
    },
  ],

  /** 所有命令执行完前 */
  async beforeExecAllCmd({ config, abort }) {},

  /** 所有命令执行完后 */
  async afterExecAllCmd({ config, abort }) {},

  /** 上传前 */
  async beforeUpload({ uploadCmd, config, abort }) {},

  /** 上传完毕 */
  async done({ stdout, config, abort }) {},

  /** 出错时做的事情 如果时在执行命令列表中的命令过程中出错 会提供 errorTarget 和 command */
  async error({ e, abort, errorTarget, command }) {},

  /** 自动输出结果 */
  outResult: true,

  /** 登入相关配置 */
  login: {
    /** 执行登入前 */
    before({ cmd, config, abort }) {},
    /** 获取到登入二维码后 */
    qrGot({ terminal, base64, qrContent, abort, config }) {},
    /** 开始登入 */
    after({ abort, config, stdout }) {},
    /** 出错了 */
    error({ abort, config, err }) {},
  },
};
```

### abort

钩子中的 abort 方法用于中断当前进程。

## 结合小程序框架使用

利用 `commands` 配置项，可以做一些自动化的流程。

小程序框架通常需要编译作为前置步骤。

```js
module.exports = {
  // ...
  commands: [
    {
      // 命令
      cmd: 'npm run build',
      // 执行命令的路径 优先级比上一层的 execPath 高
      execPath: '项目所在地址',
    },
  ],
  // ...
}
```

## 多个小程序上传代码

暂时不支持，可以写脚本批量调用工具。

命令行工具支持 `project` 参数，其他配置可以共用一个配置文件。

```js
// 示例代码
const { execSync } = require('child_process');

const projects = [
  '项目1',
  '项目2',
  '项目3',
];

projects.forEach((project) => {
  execSync(`mpup --config=配置路径 --project=${project}`);
});
```

## gitignore

每个开发者的项目路径、工具路径可能不一样，所以团队协作可能会发生配置冲突的问题。

可以再独立一个配置文件，专门用来放不同的配置项。

```js
// ./mpup.path.config.js.bak
module.exports = {
  mpToolPath: '小程序工具路径',
  projectPath: '项目路径',
};
```

这个文件放在仓库中，同时 ignore `mpup.path.config.js`，在使用的时候将 `./mpup.path.config.js.bak` 复制一份，然后将文件的 `.bak` 后缀去除。

随后给 `mpup.config.js` 使用。

```js
// ./mpup.config.js
const { mpToolPath, projectPath } = require('./mpup.path.config.js');

module.exports = {
 /** 微信开发者工具安装路径 */
  mpToolPath,

  /** 项目路径 */
  projectPath,

  // ...
  // 其他配置
};
```

## TODO

- [x] 命令行中显示登入二维码
- [ ] 生成预览二维码
- [ ] 启动开发者工具
- [ ] 关闭开发者工具
