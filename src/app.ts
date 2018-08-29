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
  
  //login VK
  const vk = new VkService('', '');
  await vk.autheticate(); 
  
  const db = new dbMongoConnector(
    "ds247330.mlab.com",
    "easy-links-db",
    "admin",
    "vadim1"
  );
   
  //connect db
  await db.connect();
 
  // await povarenok.update({}, {posted: false}, {multi: true});
  // get all pasred cooks not posted yet
  const allNotPostedCooks = await  povarenok.find({
    'posted': false
  }).exec();
  
  if (allNotPostedCooks.length === 0) {
    console.log('ERROR NO MORE DOCUMENTS');
    return;
  }
   
  //get first one
  const cookNote: any = allNotPostedCooks[0];
  
  const YouTube = new YouTubeParse(cookNote['sourceVideo']);
  
  YouTube.setProxyServer("http://209.97.137.33:5555");
  
  const directUrl = YouTube.fromtEmbedToDirectUrl();
  
  await YouTube.setPageHtml(String(directUrl));
  
  const videoTitle = await YouTube.getVideoTitle();
  
  await vk.postVideoFromYouTube('169958059', videoTitle, String(directUrl));

  await db.closeConnection();

  await povarenok.updateOne({_id: cookNote['_id']}, {posted: true}, {upsert: true});
  
  try {
    await db.closeConnection();
  } catch (err) {
    console.log('some error');
    console.log(err);
  }
  
  console.log('thats all');
}

nodeCron.schedule(`*/${60 * 3} * * * *`, async function cronStart() {
  console.log('cron works : ', new Date());
  await main();
});
