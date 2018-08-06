const vkapi = new(require('node-vkapi'))();

class VkService {
    
    private authToken: string;
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

        this.authToken = vkApi;
    }

    public getAuthtoken(): any {
        return this.authToken;
    }

}

export default VkService;