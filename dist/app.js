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
const vk_service_1 = require("./services/vk.service");
const parse_gif_povar_service_1 = require("./services/parse.gif-povar.service");
const vk = new vk_service_1.default('+37360958742', 'pythonjavajavascript');
// vk.autheticate().then(async (res) => {
//     let data = await vk.postVideoGropu('169958059');
//     console.log(data);
// }).catch(err => {
//     console.log('Failed auth');
//     console.log(err);
// });
(() => __awaiter(this, void 0, void 0, function* () {
    const gifParser = new parse_gif_povar_service_1.default();
    gifParser.setProxyServer('http://localhost:5555');
    yield gifParser.setPageHtml();
    let mainCooks = gifParser.getMainCookOfDay();
    console.log(mainCooks);
}))();
//# sourceMappingURL=app.js.map