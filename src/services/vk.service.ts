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
        let data = await this.vkApi.call('messages.getConversations', {
            owner_id: groupId,
            message: 'first one',
            attachments: {
                type: 'video'
            }
        });
        return data;
    } 

}

export default VkService;