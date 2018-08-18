import * as rp from 'request-promise';

const getRandomCook = async () => {
    const data = await rp.get('http://209.97.137.33:5000/api/v1/gif-povar');
    
    //left receipts with video source only;
    const onlyWithVideo = JSON.parse(data).filter((cookR:any) => cookR.sourceVideo);
    const lengthOfArr = onlyWithVideo.length;
    
    //get random element from array
    return onlyWithVideo[Math.floor(Math.random()*lengthOfArr)];
}

export default {
    getRandomCook
}