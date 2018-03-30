# issues

用typescript写react项目中遇到的一些问题总结。

## 引用路径问题问题

webpack配置

![webpack配置](issues/path-issue/webpack.jpg)

子组件的导出

![组件的导出](issues/path-issue/export.jpg)

父组件的引用

![父组件引用](issues/path-issue/import.jpg)

打包结果

![打包结果](issues/path-issue/build-result.jpg)

原因：~~暂未发现~~ webpack配置的时候在`reoslve`中的`tsx`中少加了一个点`.`

解决方案：~~暂无~~ `tsx`修正为`.tsx`

![解决方案](issues/path-issue/resolve.png)


