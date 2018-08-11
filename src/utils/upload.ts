import * as https from "https";
import * as fs from "fs";

const DownloadByLink = async (inputArr: string[], pathToSave: string) => {
  inputArr.forEach(async (item, index) => {
    let fileLink = item;
    let fileName = (item
      .split("/")
      .pop()
      .replace(/\W/g, "")
      .split("")
      .filter((it: any) => isNaN(it))
      .join("")
      .toLowerCase()).slice(0,5) + '.mp4';
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

export default DownloadByLink;
