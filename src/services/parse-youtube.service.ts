import * as rp from "request-promise";
import * as cheerio from "cheerio";
class YouTubeParse {
  private ytUrl: string;
  private proxyUrl: string;
  private htmlContent: string;

  constructor(url: string = null) {
    if (url) {
      this.ytUrl = url;
    }
  }

  public getUrl(): string {
    return this.ytUrl;
  }

  public setUrl(url: string): void {
    this.ytUrl = url;
  }

  public setProxyServer(proxyServer: string): void {
    this.proxyUrl = proxyServer;
  }

  public async setPageHtml(uri: string): Promise<any> {
    try {
      const result = await rp.get({
        url: `${this.proxyUrl}/?uri=${uri}`,
        encoding: "utf-8"
      });

      //@TODO  WTF - HOW PROXY NAHUI WORKS ???????
      // fs.writeFileSync('huilo.html', JSON.parse(result).data.data);
      this.htmlContent = JSON.parse(result).data.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  public getHtmlContent() {
    return this.htmlContent;
  }
  
  public getVideoTitle():string {
    const $ = cheerio.load(this.htmlContent);
    const title = $("title").text();
    const trimedFromYouTubeLabel = title.split(' - YouTube')[0];
    return trimedFromYouTubeLabel;
  }

  public fromtEmbedToDirectUrl(): string | number {
    if (!this.ytUrl) {
      return -1;
    }

    //try getting video id
    try {
      const YTVideoId = this.ytUrl
        .split("/")
        .pop()
        .split("?")[0];
      const originalYouTubeUrl = `https://www.youtube.com/watch?v=${YTVideoId}`;
      return originalYouTubeUrl;
    } catch (err) {
      return -1;
    }
  }
}

export default YouTubeParse;
