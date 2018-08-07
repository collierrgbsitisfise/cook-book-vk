class ParseGifPovarService {
    private baseParseUrl: string = 'https://gif-povar.ru/';
    private cookTypes: string[] = ['vegetarianskie', 'vypechka', 'detskie-blyuda', 'krupy', 'kurica', 'vegetarianskij-salat-s-nutom'];
    
    constructor() {}
    
    public getallTypes(): string[] {
        return this.cookTypes;
    }

    public getBaseUrl(): string {
        return this.baseParseUrl;
    }
}