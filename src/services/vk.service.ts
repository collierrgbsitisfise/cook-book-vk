const vkapi = new(require('node-vkapi'))();

class VkService {
    
    private vkApi: any;
    private userName: string;
    private password: string;

    constructor (userName: string, password: string) {
        this.userName = userName;
        this.password = password;    
    }

    public async autheticate(): Promise<any> {
        const data = await vkapi.authorize({
            appId: 6398838,
            login: this.userName,
            password: this.password,
            scope: '+524288'
        });
        
        const vkApi = new(require('node-vkapi'))({
            accessToken: data.access_token
        });

        this.vkApi = vkApi;
    }


    public getvkApi(): any {
        return this.vkApi;
    }

    public async postVideoGropu(groupId: string): Promise<any> {
        // let data = await this.vkApi.call('video.save', {
        //     name: 'first nahui video 2',
        //     group_id: groupId,
        //     link:  'https://gif-povar.ru/wp-content/uploads/2017/07/Картофельная-запеканка.mp4' 
        // });
        
        // console.log('Was saved');
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