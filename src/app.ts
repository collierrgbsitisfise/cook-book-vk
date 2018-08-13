import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import ParseGifPovarService from "./services/parse.gif-povar.service";
import VideoToGif from "./services/videoToGif.service";
import upload from "./utils/upload";

const main = async () => {

  //utils
  const {
    DownloadByLink,
    getAllFilesFromDir
  } = upload;
  
  console.log('login : ', process.env.VK_LOGIN);
  console.log('pwd : ', process.env.VK_PWD);

  //login VK
  const vk = new VkService('+37360958742', 'pythonjavajavascript');
  await vk.autheticate();

  //remove all folders[tmp__*]
  fsx.removeSync(path.join(__dirname, `../tmp_video`));
  fsx.removeSync(path.join(__dirname, `../tmp_gif`));
  fsx.removeSync(path.join(__dirname, `../tmp_video_norm`));
  
  //create all folders[tmp__*]
  fsx.mkdirSync(path.join(__dirname, `../tmp_video`));
  fsx.mkdirSync(path.join(__dirname, `../tmp_gif`));
  fsx.mkdirSync(path.join(__dirname, `../tmp_video_norm`));

  //Get links for main cooks
  const gifParser = new ParseGifPovarService();
  gifParser.setProxyServer("http://localhost:5555");
  await gifParser.setPageHtml();
  let mainCooks = gifParser.getMainCookOfDay();
  
  console.log(mainCooks.map(({ sourceVideo }) => sourceVideo));
  //Download all videos(main cooks)
  DownloadByLink(
    mainCooks.map(({ sourceVideo }) => sourceVideo),
    path.join(__dirname, `../tmp_video/`)
  );

  //Get all videos from tmp_video
  let filesToConvert = await getAllFilesFromDir(
    path.join(__dirname, `../tmp_video/`)
  );

  console.log('files in tmp video');
  console.log(path.join(__dirname, `../tmp_video/${filesToConvert[0]}`));
  await vk.postVideoGropu('169958059', path.join(__dirname, `../tmp_vidseo/${filesToConvert[0]}`));
};

main();
