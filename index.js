/*----------
group的双引号里输入小组链接
cookie的单引号里输入cookie
------------
Examples:
const group = "https://www.douban.com/group/114514"
const cookie = 'll="114514"; bid=fx-abcdef; ......'
----------*/

// 用户配置区

const group = "";
const cookie = '';
//用户配置区结束

// 以下部分非专业人士勿动
import scrape from "website-scraper";

const time = new Date();
const timenow = time
  .toISOString()
  .replace(":", "-")
  .replace(":", "-")
  .replace("T", "-")
  .replace("Z", "");

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
  urls: [`${group}/discussion`],
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
  recursive: true,
  maxRecursiveDepth: 1,
  filenameGenerator: "bySiteStructure",
  directory: `./archive/${timenow}`,
  request: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
      Referer: "https://www.douban.com/group/",
      Cookie: cookie,
    },
  },
  plugins: [new MyPlugin()],
};
const result = await scrape(options);
console.log(result);
