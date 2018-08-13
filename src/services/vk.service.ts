import * as fs from "fs";
import * as rp from "request-promise";
import * as FormData from "form-data";
import * as path from "path";
import * as fetch from 'node-fetch';

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
      scope: "+524288"
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
    let form = new FormData();
    form.append(
      "video_file",
      fs.readFileSync(path.join(__dirname, `../../tmp_video/karto.mp4`))
    );

    console.log("it is form");
    console.log(this.vkApi.options.accessToken);
    let data = await rp.post({
      url: `https://api.vk.com/api.php?oauth=1&method=video.save&app_id=6398838&scope=+524288&access_token=${
        this.vkApi.options.accessToken
      }&name=${"new cool filik"}&group_id=${groupId}`
    });
    
    data = JSON.parse(data);
    console.log("upload url");
    console.log(data.response.upload_url);
    try {
      data = await rp.post({
        url: data.response.upload_url,
        formData: {
            video_file: fs.readFileSync(path.join(__dirname, `../../tmp_video/stejk.mp4`))
        }
      });
      console.log(data);
    } catch (err) {
      console.log("ebu4ii error");
      console.log(err.message);
    }

    // form.submit(data.response.upload_url, (err: any, res:any) => {
    //     // console.log('IT IS OK');
    //     // console.log(err);
    //     // console.log(res)
    //     if (err) {
    //         console.log('ERROR NAHUI')
    //     } else {
    //         console.log('all ok');
    //     }
    // })
    // console.log('response');
    // console.log(data);
    // https://api.vk.com/api.php?oauth=1&method=users.get&app_id=6398838&scope=+524288&access_token=9b86b1c192a7b56a4022d6058c87003b8b5f2014c42f3ac380ec38a0ec703bd3bc3c1e83c60d3b0903661
    // let data = await this.vkApi.call('video.save', fs.createReadStream(pathToVideo), {
    //     name: 'cool vieo sososkik',
    //     group_id: groupId,
    // });

    // let res = await this.vkApi.upload('video', fs.createReadStream(pathToVideo));
    // console.log('Was saved');
    // console.log(res);
    // console.log(data);

    // data = await this.vkApi.call('video.add', {
    //     target_id: -Number(groupId),
    //     video_id: data.video_id,
    //     owner_id: -Number(groupId)
    // });

    // console.log('Was added');
    // console.log(data)
  }
}

export default VkService;
