class YouTubeParse {
    private ytUrl: string;

    constructor(url: string = null) {
        if (url) {
            this.ytUrl = url;
        }
    }

    getUrl(): string {
        return this.ytUrl;
    }

    setUrl(url: string): void {
        this.ytUrl = url;
    }
}

export default YouTubeParse;