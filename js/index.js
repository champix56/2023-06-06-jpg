import { MessageBox,ConfirmBox } from "./modal.js";
import {Memes} from './meme.js'
//const msgBox=new MessageBox();
const listeMemes = new Memes();
document.addEventListener('DOMContentLoaded',()=>{
    listeMemes.load().then(x=>console.log(x));
})