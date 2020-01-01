module.exports = {
  pluginOptions: {
    electronBuilder: {
      // outputDir: 'hello_electron',
      // customFileProtocol: 'cc://./',
      // 打包配置
      builderOptions: {
        win: {
          target: [
            // 打包绿色版（免安装版）
            {target: 'portable'}
          ]
        }
      },
      // 主进程监听（HMR），开发环境中配置需要监听的主进程文件
      mainProcessWatch: ['src/background.js', 'src/WindowManager.js'],
    }
  }
}
