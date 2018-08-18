import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import upload from "./utils/upload";

const main = async () => {

  //utils
  const {
    DownloadByLink,
    getAllFilesFromDir
  } = upload;
  
  //login VK
  const vk = new VkService('+', '');
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
  
  //Download all videos(main cooks)
  // DownloadByLink(
  //   mainCooks.map(({ sourceVideo }) => sourceVideo),
  //   path.join(__dirname, `../tmp_video/`)
  // );

  //Get all videos from tmp_video
  // let filesToConvert = await getAllFilesFromDir(
  //   path.join(__dirname, `../tmp_video/`)
  // );
  
  // await vk.postVideoGropu('169958059', path.join(__dirname, `../tmp_vidseo/${filesToConvert[0]}`));
};

main();
