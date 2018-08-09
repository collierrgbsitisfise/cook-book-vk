import VkService from './services/vk.service';
import ParseGifPovarService from './services/parse.gif-povar.service'

const vk = new VkService('LOGIN', 'PWD');

// vk.autheticate().then(res => {
//     console.log('succes auth');
//     console.log(vk.getAuthtoken());
// }).catch(err => {
//     console.log('Failed auth');
//     console.log(err);
// });

(async (): Promise<any> => {
    const gifParser = new ParseGifPovarService();
    gifParser.setProxyServer('http://localhost:5555');
    await gifParser.setPageHtml();
    // let res = gifParser.getPageHtml();
    let mainCooks = gifParser.getMainCookOfDay();
    console.log(mainCooks);
})();