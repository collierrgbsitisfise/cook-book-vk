import VkService from './services/vk.service';
import ParseGifPovarService from './services/parse.gif-povar.service'
import VideoToGif from './services/videoToGif.service';

const vk = new VkService('+37360958742', 'pythonjavajavascript');

// vk.autheticate().then(async (res) => {
//     let data = await vk.postVideoGropu('169958059');
//     console.log(data);
// }).catch(err => {
//     console.log('Failed auth');
//     console.log(err);
// });

(async (): Promise<any> => {
    const gifParser = new ParseGifPovarService();
    gifParser.setProxyServer('http://localhost:5555');
    await gifParser.setPageHtml();
    let mainCooks = gifParser.getMainCookOfDay();
    console.log(mainCooks);
    const videoToGif = new VideoToGif();
    videoToGif.convertMp4toGif('https://gif-povar.ru/wp-content/uploads/2018/05/kartofelnaya-zapekanka-s-farshem.mp4', 'out.gif');
})();