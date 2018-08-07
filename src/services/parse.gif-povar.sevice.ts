import * as rp from "request-promise";

class ParseGifPovarService {
    
    private baseParseUrl: string = 'https://gif-povar.ru/';
    private cookTypes: string[] = ['vegetarianskie', 'vypechka', 'detskie-blyuda', 'krupy', 'kurica', 'vegetarianskij-salat-s-nutom'];
    
    public proxyUrl: string;

    constructor() {}
        
    public getallTypes(): string[] {
        return this.cookTypes;
    }

    public getBaseUrl(): string {
        return this.baseParseUrl;
    }
    
    public setProxyServer(proxyServer: string): void {
        this.proxyUrl = proxyServer;
    }
    
    public async getPageHtml(): Promise<any> {
        try {
            const result = await rp.get({
                url: `${this.proxyUrl}/?uri=${this.getBaseUrl()}`
            });

            return {
                data: result,
                error: null
            }
        } catch (err) {
            return {
                data: null,
                error: err
            }
        }
    } 
}

export default ParseGifPovarService;