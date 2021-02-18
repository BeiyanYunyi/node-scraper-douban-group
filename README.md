# 豆瓣小组爬虫

用 node.js 编写的豆瓣小组爬虫，将小组页面前25帖及其图片存档进`./archive/日期`下。

## 从零开始安装

先安装 [node.js](https://nodejs.org/zh-cn/download/) 和 [git](https://git-scm.com/downloads)  
然后在命令提示符/PowerShell/Windows Terminal/其它终端模拟器里，通过`cd`命令切换到工作目录，再输入如下命令（一行一句）：

```bash
git clone https://github.com/lixiang810/node-scraper-douban-group
cd node-scraper-douban-group
npm i
```

这以后，你需要用你熟悉的编辑器打开`node-scraper-douban-group`目录里的`index.js`，并修改里面的如下两行：

```js
const group = "";
const cookie = ''
```

这两项分别对应着什么，在`index.js`里有更详细的说明，值得注意的是获取cookie的方法。

## 获取cookie

下面有几张图片，国内绝大多数区域无法正常加载，请翻墙后刷新页面查看。

## 启动爬虫

终于到启动爬虫的时刻了。这时，你需要切换到`node-scraper-douban-group`目录下，然后输入如下命令：

```bash
npm start
```

这以后你需要静待5分钟左右，直到终端模拟器里出现一堆输出结果为止。至此，你就可以在`node-scraper-douban-group/archive/日期`下看到结果了。

## 如何查看存档

用你喜欢的浏览器打开`node-scraper-douban-group/archive/日期/group/小组id/index.html`，这个页面已经被保存到本地，在`index.html`里进行一次点击操作能进入的页面也已被一并保存，也就是说，整个小组的第一页（也就是当时的前25帖）已经被保存下来。
