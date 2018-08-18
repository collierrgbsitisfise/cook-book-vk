import * as https from "https";
import * as fs from "fs";

const DownloadByLink = async (inputArr: string[], pathToSave: string) => {
  inputArr.forEach(async (item, index) => {
    let fileLink = item;
    let fileName = item.split('/').pop();
    let file = fs.createWriteStream(`${pathToSave}/${fileName}`);
    let response: any = await (async () => {
      return new Promise((res, rej) => {
        https.get(fileLink, function(response) {
          res(response);
        });
      });
    })();
    response.pipe(file);
  });
};

const getAllFilesFromDir = (path: string): Promise<any> => {
  return new Promise((res, rej) => {
    fs.readdir(path, function(err, files) {
      res(files);
    });
  });
};

export default {
  getAllFilesFromDir,
  DownloadByLink
}
