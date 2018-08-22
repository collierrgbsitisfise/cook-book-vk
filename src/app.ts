import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import upload from "./utils/upload";
import cookBookRcipets from "./utils/get-random-cook";
import * as nodeCron from 'node-cron';
import dbMongoConnector from "./mongo.db.connector";

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
  
  const db = new dbMongoConnector(
    "ds247330.mlab.com",
    "easy-links-db",
    "admin",
    "vadim1"
  );
  await db.connect();
  
};

main();
// nodeCron.schedule(`*/${60 * 2} * * * *`, async function cronStart() {
//   console.log('cron works : ', new Date());
//   await main();
// });
