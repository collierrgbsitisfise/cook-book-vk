"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
const cheerio = require("cheerio");
class ParseGifPovarService {
    constructor() {
        this.baseParseUrl = "https://gif-povar.ru/";
        this.cookTypes = [
            "vegetarianskie",
            "vypechka",
            "detskie-blyuda",
            "krupy",
            "kurica",
            "vegetarianskij-salat-s-nutom"
        ];
    }
    getallTypes() {
        return this.cookTypes;
    }
    getBaseUrl() {
        return this.baseParseUrl;
    }
    setProxyServer(proxyServer) {
        this.proxyUrl = proxyServer;
    }
    setPageHtml(uri = this.getBaseUrl()) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield rp.get({
                    url: `${this.proxyUrl}/?uri=${uri}`
                });
                //@TODO  WTF - HOW PROXY NAHUI WORKS ???????
                this.htmlContent = JSON.parse(result).data.data;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getMainCookOfDay() {
        let result = [];
        const $ = cheerio.load(this.htmlContent);
        console.log($("#post-items").length);
        $("#post-items")
            .children()
            .each(function (i, arcticle) {
            const postThumbnail = $(arcticle)
                .children()
                .eq(1);
            const videoWrapper = $(postThumbnail)
                .children()
                .eq(1);
            const videoTag = $(videoWrapper)
                .children()
                .eq(0);
            const sourceVideo = $(videoTag)
                .children()
                .eq(0)
                .attr("src");
            const sourceImg = $(videoTag)
                .children()
                .eq(1)
                .attr("src");
            result.push({
                sourceVideo,
                sourceImg
            });
        });
        return result;
    }
    getPageHtml() {
        return this.htmlContent;
    }
}
exports.default = ParseGifPovarService;
//# sourceMappingURL=parse.gif-povar.service.js.map