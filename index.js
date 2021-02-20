/*----------
group的双引号里输入小组链接
cookie的单引号里输入cookie
compress：是否以压缩文件而非文件夹的形式保存，是为true，否为false，默认true
------------
Examples:
const group = "https://www.douban.com/group/114514";
const cookie = 'll="114514"; bid=fx-abcdef; ......';
const compress = true;
----------*/

// 用户配置区

const group = "";
const cookie = '';
const compress = true;

//用户配置区结束

// 以下部分非专业人士勿动
import scrape from "website-scraper";
import zip from "./zip.js";

// 获取当前时间并转换格式
const time = new Date();
const timenow = time
  .toISOString()
  .replace(":", "-")
  .replace(":", "-")
  .replace("T", "-")
  .replace("Z", "");

// 爬取每个页面前随机等待 0-10 秒，避免速度过快出验证码
class MyPlugin {
  apply(registerAction) {
    registerAction("beforeRequest", async ({ resource, requestOptions }) => {
      const time = Math.round(Math.random() * 10000);
      await new Promise((resolve) => setTimeout(resolve, time));
      return { requestOptions };
    });
  }
}

const options = {
  urls: [`${group}/discussion`], // 链接，模板字符串
  // 类似链接白名单
  urlFilter: (url) => {
    if (url.startsWith(group)) {
      return url;
    }
    if (url.startsWith("https://img1.doubanio.com")) {
      return url;
    }
    if (url.startsWith("https://img2.doubanio.com")) {
      return url;
    }
    if (url.startsWith("https://img3.doubanio.com")) {
      return url;
    }
    if (url.match(`${group}/new_topic`)) {
      return null;
    }
    if (url.startsWith("https://www.douban.com/group/topic/")) {
      return url;
    }
  },
  recursive: true, // 递归爬取
  maxRecursiveDepth: 1, // 爬一层
  filenameGenerator: "bySiteStructure",
  directory: `./archive/${timenow}`,
  request: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0", // UA标识，装作浏览器
      Referer: "https://www.douban.com/group/",
      Cookie: cookie,
    },
  },
  plugins: [new MyPlugin()], // 调用等待 0-10 秒插件
};
const result = await scrape(options);
console.log(result);

if (compress) {
  zip(timenow);
}