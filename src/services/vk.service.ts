import * as fs from "fs";
import * as rp from "request-promise";
import * as FormData from "form-data";
import * as path from "path";
import * as fetch from "node-fetch";

const vkapi = new (require("node-vkapi"))();

class VkService {
  private vkApi: any;
  private userName: string;
  private password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

  public async autheticate(): Promise<any> {
    const data = await vkapi.authorize({
      appId: 6398838,
      login: this.userName,
      password: this.password,
      scope: "+262144"
    });

    const vkApi = new (require("node-vkapi"))({
      accessToken: data.access_token
    });

    this.vkApi = vkApi;
  }

  public getvkApi(): any {
    return this.vkApi;
  }

  public async postVideoGropu(
    groupId: string,
    fileName: string,
    videoName: string = `test${+(new Date())}`
  ): Promise<boolean> {
    
    let saveData = await this.vkApi.call("video.save", {
      name: videoName,
      group_id: groupId
    });
    
    console.log('video was saved');
    console.log(saveData);
    
    //streaming video
    let file = fs.createReadStream(path.join(__dirname, `../../tmp_video/${fileName}`));
    
    let uploadData = await rp.post({
      url: saveData.upload_url,
      formData: {
        video_file: file
      }
    });
    
    console.log('File was uploaded');
    console.log(uploadData);

    uploadData = JSON.parse(uploadData);
     
    try {
      await this.vkApi.call("video.add", {
        target_id: -Number(groupId),
        video_id: uploadData.video_id,
        owner_id: -Number(groupId)
      });
      console.log('video was added');
    } catch (err) {
      console.log('video already added');
    }
   
    await this.vkApi.call('wall.post', {
      owner_id: uploadData.owner_id,
      message: videoName,
      from_group: 1,
      attachments: `video${uploadData.owner_id}_${uploadData.video_id}`
    });

    return true;
  }
}

export default VkService;
