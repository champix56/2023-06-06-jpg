import { MessageBox, ConfirmBox } from "./composantsWeb/modal.js";
import { Memes } from './coreLib/meme.js'
import { Images } from "./coreLib/images.js";
//const msgBox=new MessageBox();


class MemesDOM {
    listeMemes = new Memes();
    listeImgs = new Images();
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            //sync des chargements
            Promise.all([this.listeImgs.load(),this.listeMemes.load()])
            .then(promisesValues=>{

                return promisesValues
            })
        })
    }
}
const memeDOM=new MemesDOM();


