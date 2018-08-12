import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import ParseGifPovarService from "./services/parse.gif-povar.service";
import VideoToGif from "./services/videoToGif.service";
import upload from "./utils/upload";

const main = async () => {
  //login VK
  const vk = new VkService(process.env.VK_LOGIN, process.env.VK_PWD);
  await vk.autheticate();

  //remove all folders[tmp__]
  fsx.removeSync(path.join(__dirname, `../tmp_video`));
  fsx.removeSync(path.join(__dirname, `../tmp_gif`));
  fsx.removeSync(path.join(__dirname, `../tmp_video_norm`));

  fsx.mkdirSync(path.join(__dirname, `../tmp_video`));
  fsx.mkdirSync(path.join(__dirname, `../tmp_gif`));
  fsx.mkdirSync(path.join(__dirname, `../tmp_video_norm`));

  //Get links for main cooks
  const gifParser = new ParseGifPovarService();
  gifParser.setProxyServer("http://localhost:5555");
  await gifParser.setPageHtml();
  let mainCooks = gifParser.getMainCookOfDay();

  //Download all videos(main cooks)
  upload.DownloadByLink(
    mainCooks.map(({ sourceVideo }) => sourceVideo),
    path.join(__dirname, `../tmp_video/`)
  );

  //Get all videos from tmp_video
  let filesToConvert = await upload.getAllFilesFromDir(
    path.join(__dirname, `../tmp_video/`)
  );

  console.log('files in tmp video');
  console.log(filesToConvert);
};

main();
