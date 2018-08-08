import VkService from './services/vk.service';
import ParseGifPovarService from './services/parse.gif-povar.sevice'

const vk = new VkService('LOGIN', 'PWD');

vk.autheticate().then(res => {
    console.log('succes auth');
    console.log(vk.getAuthtoken());
}).catch(err => {
    console.log('Failed auth');
    console.log(err);
});

const gifParser = new ParseGifPovarService();


gifParser.setProxyServer('http://localhost:5555');

gifParser.getPageHtml().then((res:any) => {
    console.log('result');
    console.log(res);
});