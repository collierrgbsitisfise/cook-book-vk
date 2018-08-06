"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vk_service_1 = require("./services/vk.service");
const vk = new vk_service_1.default('LOGIN', 'PWD');
vk.autheticate().then(res => {
    console.log('succes auth');
    console.log(vk.getAuthtoken());
}).catch(err => {
    console.log('Failed auth');
    console.log(err);
});
//# sourceMappingURL=app.js.map