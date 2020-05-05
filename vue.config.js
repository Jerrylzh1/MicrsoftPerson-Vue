//全局代理 取消跨域操作
let proxObj={};

proxObj['/']= {
         ws: false,
         target: 'http://localhost:8081',
         changeOrigin: true,
         pathRewrite: {
         '^/': ''
     }
 }

module.exports={
   devServer:{
       host:'localhost',
       port:8080,
       proxy:proxObj,
       // proxy: {
       //     '/api': {
       //         ws: false,
       //         target: 'http://localhost:8081',
       //         changeOrigin: true,
       //         pathRewrite: {
       //             '^/api': ''
       //         }
       //     }
       // }
   }
}


// const path = require('path')
// const resolve = (dir) => path.join(__dirname, dir)
// module.exports = {
//   publicPath: './',   // (打包上线时必须配置)
//
//   chainWebpack: (config) => {
//       config.resolve.alias
//       .set('@', resolve('src'))
//       .set('_c', resolve('src/components'))
//   },
//   // 打包时不生产.map文件
//   productionSourceMap: false,
//   // 跨域请求
//   devServer: {
//     // 自定义本地的网络地址
//     // host: '',
//     // 自定义本地端口
//     port: '8080',
//     // 目标服务器的地址
//     proxy: 'http://localhost:8081/'
//   },
//
//   // 设置了可以在本地项目启动时 查看到 css 的具体文件位置
//   css: {
//     requireModuleExtension: true, // 按需导入必须设置为 true
//     extract: false,
//     sourceMap: true
//   }
// }
