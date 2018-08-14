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
    pathToVideo: string
  ): Promise<any> {
    let data = await this.vkApi.call("video.save", {
      name: "SUOPER ASDASDASD",
      group_id: groupId
    });

    let file = fs.createReadStream(path.join(__dirname, "../../stejk.mp4"));
    data = await rp.post({
      url: data.upload_url,
      formData: {
        video_file: file
      }
    });
    
    console.log('before add');
    data = JSON.parse(data);
    data = await this.vkApi.call("video.add", {
      target_id: -Number(groupId),
      video_id: data.video_id,
      owner_id: -Number(groupId)
    });

    // console.log('Was added');
    // console.log(data)
  }
}

export default VkService;
