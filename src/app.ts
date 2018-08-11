import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import VkService from "./services/vk.service";
import ParseGifPovarService from "./services/parse.gif-povar.service";
import VideoToGif from "./services/videoToGif.service";
import DownloadByLink from "./utils/upload";

const vk = new VkService("+37360958742", "pythonjavajavascript");

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
  const gifParser = new ParseGifPovarService();
  gifParser.setProxyServer("http://localhost:5555");
  await gifParser.setPageHtml();
  let mainCooks = gifParser.getMainCookOfDay();
  console.log(mainCooks);
  console.log("download files");
  DownloadByLink(
    mainCooks.map(({ sourceVideo }) => sourceVideo),
    path.join(__dirname, `../tmp_video/`)
  );
  console.log("all files was downloaded");
  let filesToConvert = await getAllFilesFromDir(
    path.join(__dirname, `../tmp_video/`)
  );
  console.log("it is files from dir");
  console.log(filesToConvert);

  //convertor mp4 -> gif
  const videoToGif = new VideoToGif();

  for (let i = 0; i < 1; i++) {
    console.log(
      filesToConvert[i] + " : " + filesToConvert[i].replace("mp4", "gif")
    );
    let mp4File = filesToConvert[i];
    let gifFile = mp4File.replace("mp4", "gif"); 
    await videoToGif.convertMp4toGif(mp4File, gifFile);
  }
//   await videoToGif.convertMp4toGif(filesToConvert[0], filesToConvert[0].replace('mp4', 'gif'));
  //   filesToConvert.forEach(async (mp4: string) => {
  //       console.log('I am in foreach');
  //       console.log(mp4 + " : " + mp4.replace("mp4", "gif"));
  //     // await videoToGif.convertMp4toGif(mp4, mp4.replace("mp4", "gif"));
  //   });
})();

// DownloadByLink(['https://gif-povar.ru/wp-content/uploads/2018/05/kartofelnaya-zapekanka-s-farshem.mp4'], path.join(__dirname, `../tmp_video/`)).then(res => {
//     console.log('file was updloaded succesgtasd')
// }).catch(err => {
//     console.log(err);
// });
