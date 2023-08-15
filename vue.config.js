module.exports = {
    // 這樣可以讓部屬出來的檔案指向絕對路徑
    publicPath: './',
    transpileDependencies: [
        'vuetify'
    ],
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'cas sso'
                return args
            })
    },
    configureWebpack: {
        output: {
            filename: `js/[name].[chunkhash].${Date.now()}.js`
        }
    }
}
