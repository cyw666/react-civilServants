# 前言

> 干部教育网络学员

干部网络教育培训既具有打破时空限制、方便快捷、互动性强的鲜明特点，又具有学习资源丰富、培训形式多样、投入较少、培训资源优化整合和培训对象广覆盖的独特优势。干部网络教育培训意义重大、影响深远。未来，省干部教育培训网络学院将进一步深入学习贯彻习近平总书记系列重要讲话精神，紧紧围绕“四个全面”战略布局，认真贯彻落实五大发展理念，在省委组织部的领导下，坚持服务科学发展、服务干部成长、服务学习型党组织建设，不断创新方式，强化管理，打造品牌，提高实效，推进干部网络培训工作再上新台阶，为建设富饶美丽幸福作出新的更大贡献。

## 技术栈

react + redux + ant-design + dva + roadhog + ES6/7 + axios + less + Mock

## 特性

-   基于[react](https://github.com/facebook/react)，[ant-design](https://github.com/ant-design/ant-design)，[dva](https://github.com/dvajs/dva)，[Mock](https://github.com/nuysoft/Mock)
-   基于Antd UI 设计语言，提供丰富的UI组件。
-   基于[dva](https://github.com/dvajs/dva)动态加载 Model 和路由，按需加载。
-   使用[roadhog](https://github.com/sorrycc/roadhog)本地调试和构建，其中Mock功能实现脱离后端独立开发。
-   浅度响应式设计。

### 快速开始

克隆项目文件:

```bash
git clone https://github.com/cyw666/react-civilServants.git
```

进入目录安装依赖:

```bash
#开始前请确保没有安装roadhog、webpack到NPM全局目录
npm i 或者 yarn install
```

开发：

```bash
npm run start
```

构建：

```bash
npm run build

将会生成dist目录
```

代码检测：

```bash
npm run lint
```

### 目录结构

```
.
├── /dist/           # 项目输出目录
├── /mock/           # 数据mock
├── /public/         # 公共文件，编译时copy至dist目录
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ ├── /routes/       # 路由组件
│ │ └── Main.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置 api接口
│ │ ├── request.js   # axios异步请求函数
│ │ └── utils.js     # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.ejs     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .roadhogrc.js    # roadhog配置
└── ..roadhogrc.mock.js    # 使用 mockjs 等三方库
.
```

# 部分截图

### 首页
<img src="https://github.com/cyw666/react-civilServants/tree/master/src/assets/home.png"/>