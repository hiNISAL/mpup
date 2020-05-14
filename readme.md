# mpup

微信小程序代码上传辅助工具。

利用[小程序开发者工具命令行工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)提供的能力实现。

小程序开发者工具提供的命令行工具所在路径：

```bash
macOS: <安装路径>/Contents/MacOS/cli

Windows: <安装路径>/cli.bat
```

此工具适合小程序代码上传前需要许多前置工作的项目，如需要编译、修改环境配置、跑钩子等。

## 安装

```bash
npm install mpup -D

// 全局安装
npm install mpup -g
```

## 使用

```bash
npx mpup --project=项目路径 --mptool=小程序命令行工具所在路径 --ver=上传代码的版本号
```

## 配置文件

### 生成配置文件

```bash
npx mpup init
```

### 配置详情

```js
module.exports = {
  // 微信开发者工具安装路径
  mpToolPath: '',

  // 项目路径
  projectPath: '',

  // 本次要上传的代码版本号
  ver: '',

  // 本次要上传的代码描述
  desc: '',

  // 执行命令的路径
  execPath: '',

  // 默认输出命令的结果
  stdout: false,

  // 上传中的 loading 文案
  uploadingText: '上传中...',

  // 上传前执行的命令列表
  commands: [
    {
      // 自动输出执行结果
      stdout: false,
      // 命令执行前做的事情
      async before() {},
      // 命令执行后做的事情
      async after(stdout) {},
      // 命令
      cmd: '',
      // 执行命令的路径 优先级比上一层的 execPath 高
      execPath: '',
    },
  ],

  // 所有命令执行完前
  async beforeExecAllCmd(config) {},

  // 所有命令执行完后
  async afterExecAllCmd() {},

  // 上传前
  async beforeUpload(cmd, projectPath, mpToolPath) {},

  // 上传完毕
  async done(stdout) {},

  // 自动输出结果
  outResult: true,
};
```

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
