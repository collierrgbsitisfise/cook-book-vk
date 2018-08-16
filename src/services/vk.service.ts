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
    pathToVideo: string,
    videoName: string = `test${+(new Date())}`
  ): Promise<void> {
    
    let saveData = await this.vkApi.call("video.save", {
      name: videoName,
      group_id: groupId
    });
    
    //streaming video
    let file = fs.createReadStream(pathToVideo);
    
    let uploadData = await rp.post({
      url: saveData.upload_url,
      formData: {
        video_file: file
      }
    });
    
    uploadData = JSON.parse(uploadData);
    
    await this.vkApi.call("video.add", {
      target_id: -Number(groupId),
      video_id: uploadData.video_id,
      owner_id: -Number(groupId)
    });

  }
}

export default VkService;
