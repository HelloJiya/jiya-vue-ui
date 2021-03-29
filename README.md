# 介绍
该项目是基于vue的UI组件库模板，其中已经集成element-ui ,可基于element组件的二次开发。文档采用vuepress，文档配置具体参考vuepress。

# 开始
## 目录结构
### 构建相关
```bash
├── build                                # 构建
|   ├── config.js                        # 定义一些打包配置
|   ├── webpack.common.js                # webpack公共打包配置
|   ├── webpack.component.js             # 组件构建配置(commonjs2)
|   ├── webpack.config.js                # src/index.js 构建（umd）
|   └── webpack.test.js                  # 测试构建
├── script                               # 脚本
|   ├── build-entry.js                   # 组件注册 组件开发完自动注册到src/index.js
|   ├── gen-cssfile.js                   # css打包
|   └── new.js                           # 新增组件 在docs、packages、tests内生成相应的文件
├── Makefile                             # make命令
```

### 开发目录
```bash
├── docs                              # 说明文档
|   ├── .vuepress                     # vuepress相关配置
|   ├── components                    # 说明文档目录
|   ├── .gitignore                    
|   └── README.md  
├── packages                          # 组件目录
|   ├── theme-chalk                   # 组件样式定义目录
|   ├── [component]                   # 
|   |    ├── src                      # 组件主要开发文件
|   |    ├── index.js                 # 组件导出
├── types                             # ts定义
|   ├── ics-ui.d.ts                   # 集合
├── components.json                   # 组件json文件（供脚本、构建使用）


```


### 单元测试
```bash
├── tests                           # 
|   ├── unit                        # 
|   |   ├── coverage                # 测试率统计
|   |   ├── specs                   # 存放组件单元测试文件
|   |   ├── karma.config.js         # karma配置
|   |   ├── until.js                # 公共工具
|   |   └── index.js                # 测试入口         

```


## 起步
```bash
#安装依赖
npm run bootstrap

```

## 组件开发

```bash
make new <组件名>（采用连字符形式：a-comp） <中文名>

```

> 脚本会直接生成组件文件、样式文件、测试文件、说明文档。
### css开发
在组件开发时，组件的样式我们单独拎出，放在`theme-chalk`下，文件名为与组件名相同的scss文件，其中选择器采用`BEM`方式命名(模块名 + 元素名 + 修饰器)[参考](https://www.bemcss.com/)。为提高开发效率，我们在`mixins/mixin.css`内定义了`BEM`相关的`mixin`。在开发时，根据不同的类型的选择器使用相应的`mixin`。
- b: 块元素      e.g: b(table)\b(search)\b(form)  **注：不需要添加ics前缀**
- e: 元素选择器  e.g: e(body)\e(text)\(image)
- m: 修饰选择器  e.g: m(center)\m(small)

### 单元测试
karma+mocha+chai

执行`npm run test` ，`tests/unit/coverage`下会生成代码各模块的测试率


## 组件注册
>组件开发完注册到src/index
```bash
npm run build:file
```

## 打包
```
npm run dist
```
> 打包时会重新注册组件、打包样式文件、打包组件

## 其他
```bash
# 测试
npm run test
# 生成测试分析结果 tests/unit/coverage/
```
