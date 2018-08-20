import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import upload from "./utils/upload";
import cookBookRcipets from "./utils/get-random-cook";
import * as nodeCron from 'node-cron';

const main = async () => {

  //utils
  const {
    DownloadByLink,
    getAllFilesFromDir
  } = upload;
  
  const {
    getRandomCook
  } = cookBookRcipets;
  //login VK
  const vk = new VkService('', '');
  await vk.autheticate(); 
  try {
    fsx.mkdirSync(path.join(__dirname, `../tmp_video`));
  } catch(e) {}

  const randomCook = await getRandomCook();
  
  //Download all videos(main cooks)
  DownloadByLink(
    [randomCook].map(({ sourceVideo }) => sourceVideo),
    path.join(__dirname, `../tmp_video/`)
  );

  //Get all videos from tmp_video
  let videoFiles = await getAllFilesFromDir(
    path.join(__dirname, `../tmp_video/`)
  );
  
  let result = await vk.postVideoGropu('169958059', videoFiles[0], randomCook.cookName);
  
  setTimeout(() => {
    fsx.removeSync(path.join(__dirname, `../tmp_video`));
  }, 60000);
};

main();
// nodeCron.schedule(`*/${60 * 2} * * * *`, async function cronStart() {
//   console.log('cron works : ', new Date());
//   await main();
// });
