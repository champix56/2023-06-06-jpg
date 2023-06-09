import { RouterDOM } from "./coreLib/router.js";
import { listeImgs, listeMemes } from "./coreLib/dataInstance.js";
import router from './coreLib/router.js'

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
                router.removeActiveNavbarLink()
                evt.target.parentNode.classList.add('active')
                router.currentRoute='/'
            })
        })
        document.querySelectorAll('.navbar-thumbnail').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                evt.preventDefault();
                router.removeActiveNavbarLink()
                evt.target.parentNode.classList.add('active')
                router.currentRoute='/thumbnail'
            })
        })
        document.querySelectorAll('.navbar-meme').forEach(link=>{
            link.addEventListener('click',(evt)=>{
                router.removeActiveNavbarLink()
                evt.target.parentNode.classList.add('active')
                evt.preventDefault();
                router.currentRoute='/meme'
            })
        })
    }
}
const memeDOM=new MemesDOM();


