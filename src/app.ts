import * as https from "https";
import * as fs from "fs";
import * as fsx from 'fs-extra';
import * as path from "path";
import VkService from "./services/vk.service";
import ParseGifPovarService from "./services/parse.gif-povar.service";
import VideoToGif from "./services/videoToGif.service";
import DownloadByLink from "./utils/upload";

const vk = new VkService('', '');

// vk.autheticate().then(async (res) => {
//     let data = await vk.postVideoGropu('169958059');
//     console.log(data);
// }).catch(err => {
//     console.log('Failed auth');
//     console.log(err);
// });

const getAllFilesFromDir = (path: string): Promise<any> => {
  return new Promise((res, rej) => {
    fs.readdir(path, function(err, files) {
      res(files);
    });
  });
};

(async (): Promise<any> => {
  
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
  DownloadByLink(
    mainCooks.map(({ sourceVideo }) => sourceVideo),
    path.join(__dirname, `../tmp_video/`)
  );
  
  //Get all videos from tmp_video
  let filesToConvert = await getAllFilesFromDir(
    path.join(__dirname, `../tmp_video/`)
  );
  
  console.log("it is files from dir");
  console.log(filesToConvert);

  //convertor mp4 -> gif
  // const videoToGif = new VideoToGif();
  // for (let i = 0; i < filesToConvert.length; i++) {
  //   let mp4File = filesToConvert[i];
  //   await videoToGif.addAditionalHeadersToMp4(mp4File);
  // }
  
  // for (let i = 0; i < 1; i++) {
  //   let mp4File = filesToConvert[i];
  //   let gifFile = mp4File.replace("mp4", "gif"); 
  //   await videoToGif.convertMp4toGif(mp4File, gifFile);
  // }
})();
