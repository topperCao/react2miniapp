<h1 align="center">Welcome to react2miniapp 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
</p>

> react transform to miniprogram

## Install

```sh
npm install
```

## 构思

```
react转小程序核心思想：
  利用react的自定义render adapter(react-reconciler)，将react的运行时引入小程序，监听虚拟dom的update和commit的阶段回调，在这些阶段里取执行小程序的setData方法。
  前置工作：
    1.将reactcomponet的render里的jsx转成小程序的静态template
    2.将react的class类转成createClass （便于生成小程序的config对象
    3.react的componet 对标小程序里的组件，这里会借鉴nanachi的实现方式
```

## 工程上

```
1、使用webpack构建小程序项目
2、支持wx.request Promise化
3、引入generator-runtime支持async await
```

## 小程序功能

查询垃圾分类（输入+拍照识别

<img src="./screenshot/WechatIMG4.jpeg" width="100" />


## Author

👤 **YufJ**


## Show your support

Give a ⭐️ if this project helped you!
