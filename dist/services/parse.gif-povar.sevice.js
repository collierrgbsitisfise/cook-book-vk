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
class ParseGifPovarService {
    constructor() {
        this.baseParseUrl = 'https://gif-povar.ru/';
        this.cookTypes = ['vegetarianskie', 'vypechka', 'detskie-blyuda', 'krupy', 'kurica', 'vegetarianskij-salat-s-nutom'];
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
    getPageHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield rp.get({
                    url: `${this.proxyUrl}/?uri=${this.getBaseUrl()}`
                });
                return {
                    data: result,
                    error: null
                };
            }
            catch (err) {
                return {
                    data: null,
                    error: err
                };
            }
        });
    }
}
exports.default = ParseGifPovarService;
//# sourceMappingURL=parse.gif-povar.sevice.js.map