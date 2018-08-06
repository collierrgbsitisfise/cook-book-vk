import VkService from './services/vk.service';


const vk = new VkService('LOGIN', 'PWD');

vk.autheticate().then(res => {
    console.log('succes auth');
    console.log(vk.getAuthtoken());
}).catch(err => {
    console.log('Failed auth');
    console.log(err);
});