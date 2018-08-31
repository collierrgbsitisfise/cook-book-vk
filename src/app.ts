import VkService from "./services/vk.service";
import upload from "./utils/upload";
import cookBookRcipets from "./utils/get-random-cook";
import * as nodeCron from "node-cron";
import dbMongoConnector from "./mongo.db.connector";
import povarenok from "./models/povarenom";
import YouTubeParse from "./services/parse-youtube.service";

const main = async () => {
  //login VK
  const vk = new VkService("", "");
  await vk.autheticate();

  // await povarenok.update({}, {posted: false}, {multi: true});
  // get all pasred cooks not posted yet
  const allNotPostedCooks = await povarenok
    .find({
      posted: false
    })
    .exec();

  if (allNotPostedCooks.length === 0) {
    console.log("ERROR NO MORE DOCUMENTS");
    return;
  }

  //get first one
  const cookNote: any = allNotPostedCooks[0];

  if (!cookNote["sourceVideo"]) {
    await povarenok.updateOne(
      { _id: cookNote["_id"] },
      { posted: true },
      { upsert: true }
    );
    return;    
  }

  const YouTube = new YouTubeParse(cookNote["sourceVideo"]);

  YouTube.setProxyServer("http://209.97.137.33:5555");

  const directUrl = YouTube.fromtEmbedToDirectUrl();

  await YouTube.setPageHtml(String(directUrl));

  const videoTitle = await YouTube.getVideoTitle();

  await vk.postVideoFromYouTube("169958059", videoTitle, String(directUrl));

  await povarenok.updateOne(
    { _id: cookNote["_id"] },
    { posted: true },
    { upsert: true }
  );

  console.log('hinish');
};


(async function start() {
  const db = new dbMongoConnector(
    "ds247330.mlab.com",
    "easy-links-db",
    "admin",
    "vadim1"
  );

  //connect db
  await db.connect();
  nodeCron.schedule(`*/${60 * 5} * * * *`, async function cronStart() {
    await main();
  });
})();
