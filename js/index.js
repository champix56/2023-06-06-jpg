import { MessageBox, ConfirmBox } from "./composantsWeb/modal.js";
import { Memes } from './coreLib/meme.js'
import { Images } from "./coreLib/images.js";
import { RouterDOM } from "./router.js";
import { listeImgs, listeMemes } from "./coreLib/dataInstance.js";
const router=new RouterDOM();

class MemesDOM {
    listeMemes = listeMemes
    listeImgs = listeImgs;
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initNavbarLinks();
            //sync des chargements
            Promise.all([this.listeImgs.load(),this.listeMemes.load()])
            .then(promisesValues=>{
                router.manageRoute();
                console.log(promisesValues);
                return promisesValues
            })
           
        })
    }
    initNavbarLinks=()=>{
        document.querySelectorAll('.navbar-home').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/'
            })
        })
        document.querySelectorAll('.navbar-thumbnail').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/thumbnail'
            })
        })
        document.querySelectorAll('.navbar-meme').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.currentRoute='/meme'
            })
        })
    }
}
const memeDOM=new MemesDOM();


