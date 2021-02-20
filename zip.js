import fs from "fs";
import archiver from "archiver";

const zip = async (timenow) => {
  console.log(`正在打包${timenow}.zip`);
  const output = fs.createWriteStream(`./archive/${timenow}.zip`);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // 0-9，0为不压缩，9为最高压缩率
  });

  output.on("close", () => {
    console.log(archive.pointer() + " total bytes");
    console.log("打包完成。");
  });

  output.on("end", () => {
    console.log("Data has been drained");
  });

  archive.pipe(output);
  // 错误警告
  archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.directory(`./archive/${timenow}/`, `${timenow}`);
  await archive.finalize(); // 等待压缩完成
  fs.rmdir(`./archive/${timenow}/`, { recursive: true }, (err) => { // 删除原目录
    if (err) {
      return console.error(err);
    }
  });
};

export default zip;

