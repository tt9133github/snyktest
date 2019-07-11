# 

> 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
## 项目文件目录结构：
``` bash
├── README.md                       // 项目说明文档
├── node_modules                    // 项目依赖包文件夹
├── build                           // 编译配置文件，一般不用管
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                          // 项目基本设置文件夹
│   ├── dev.env.js              // 开发配置文件
│   ├── index.js                    // 配置主文件
│   └── prod.env.js             // 编译配置文件
├── index.html                      // 项目入口文件
├── package-lock.json           // npm5 新增文件，优化性能
├── package.json                    // 项目依赖包配置文件
├── src                             // 我们的项目的源码编写文件
└── static                          // 资源放置目录
```
### src文件目录结构：
``` bash
├── App.vue                         // APP入口文件
├── api                             // 接口调用工具文件夹
│   └── index.js                    // 接口调用工具
├── components                      // 组件文件夹，目前为空
├── config                          // 项目配置文件夹
│   └── index.js                    // 项目配置文件
├── main.js                         // 项目配置文件
├── page                                // 我们的页面组件文件夹
│   ├── content.vue             // 准备些 cnodejs 的内容页面
│   └── index.vue                   // 准备些 cnodejs 的列表页面
├── router                          // 路由配置文件夹
│   └── index.js                    // 路由配置文件
├── style                           // scss 样式存放目录
│   ├── base                        // 基础样式存放目录
│   └── scss                     // 页面样式文件夹
└── utils                           // 常用工具文件夹
    └── index.js                    // 常用工具文件
```
### static文件目录结构：
 src 目录里面的资源文件，每次都需要打包，会增加我们的打包项目的时间长度对于一些不会去修改的资源文件，也没必要 npm 安装，直接引用就好了。你可以根据自己的情况，对这些可以不进行打包而直接引用的文件提炼出来，放在资源目录里面直接调用，这样会大大的提高我们的项目的打包效率。
``` bash
├── css             // 放一些第三方的样式文件
├── font                // 放字体图标文件
├── image           // 放图片文件，如果是复杂项目，可以在这里面再分门别类
└── js              // 放一些第三方的JS文件，如 jquery```
```