# 安装

## npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
> 注意：需要切换公司内部npm库 http://192.168.4.43:6001/repository/zd_npm_public/

```shell
npm i ics-ui -S --registry=http://192.168.4.43:6001/repository/zd_npm_public/
```

## 使用
```js
//  main.js
import Vue from 'vue';
import IcsUI from 'ics-ui';
import 'ics-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(IcsUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```



