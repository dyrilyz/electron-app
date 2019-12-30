module.exports = {
    pluginOptions: {
        electronBuilder: {
            // outputDir: 'hello_electron',
            // customFileProtocol: 'cc://./',
            builderOptions: {},
            mainProcessWatch: ['src/background.js', 'src/WindowManager.js'],
        }
    }
}
