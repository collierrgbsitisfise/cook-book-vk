"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_gif_povar_sevice_1 = require("./services/parse.gif-povar.sevice");
// const vk = new VkService('LOGIN', 'PWD');
// vk.autheticate().then(res => {
//     console.log('succes auth');
//     console.log(vk.getAuthtoken());
// }).catch(err => {
//     console.log('Failed auth');
//     console.log(err);
// });
const gifParser = new parse_gif_povar_sevice_1.default();
gifParser.setProxyServer('http://localhost:5555');
gifParser.getPageHtml().then((res) => {
    console.log('result');
    console.log(res);
});
//# sourceMappingURL=app.js.map