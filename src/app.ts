import * as https from "https";
import * as fs from "fs";
import * as fsx from "fs-extra";
import * as path from "path";
import VkService from "./services/vk.service";
import upload from "./utils/upload";
import cookBookRcipets from "./utils/get-random-cook";
import * as nodeCron from 'node-cron';
import dbMongoConnector from "./mongo.db.connector";
import povarenok from './models/povarenom';
import YouTubeParse from './services/parse-youtube.service';
import { SchemaType } from "mongoose";

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
  const vk = new VkService('+37360958742', 'pythonjavajavascript');
  await vk.autheticate(); 
  
  const db = new dbMongoConnector(
    "ds247330.mlab.com",
    "easy-links-db",
    "admin",
    "vadim1"
  );
  await db.connect();
  // await povarenok.update({}, {posted: false}, {multi: true});
  const allNotPostedCooks = await  povarenok.find({
    'posted': false
  }).exec();
  
  if (allNotPostedCooks.length === 0) {
    console.log('ERROR NO MORE DOCUMENTS');
    return;
  }
  
  const cookNote: any = allNotPostedCooks[0];
  const YouTube = new YouTubeParse(cookNote['sourceVideo']);
  YouTube.setProxyServer("http://209.97.137.33:5555");
  const directUrl = YouTube.fromtEmbedToDirectUrl();
  await YouTube.setPageHtml(String(directUrl));
  await db.closeConnection();
}
main();
// nodeCron.schedule(`*/${60 * 2} * * * *`, async function cronStart() {
//   console.log('cron works : ', new Date());
//   await main();
// });
