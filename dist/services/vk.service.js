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
const vkapi = new (require('node-vkapi'))();
class VkService {
    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    autheticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield vkapi.authorize({
                appId: 6398838,
                login: this.userName,
                password: this.password,
                scope: '+524288'
            });
            const vkApi = new (require('node-vkapi'))({
                accessToken: data.access_token
            });
            this.vkApi = vkApi;
        });
    }
    getvkApi() {
        return this.vkApi;
    }
    postVideoGropu(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.vkApi.call('messages.getConversations', {
                owner_id: groupId,
                message: 'first one',
                attachments: {
                    type: 'video'
                }
            });
            return data;
        });
    }
}
exports.default = VkService;
//# sourceMappingURL=vk.service.js.map